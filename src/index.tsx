import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { TopPage } from './components/TopPage'
import { scheduled } from './update-spotify-data'

type Bindings = {
	SPOTIFY_DATA: KVNamespace
	SPOTIFY_CLIENT_ID: string
	SPOTIFY_CLIENT_SECRET: string
	SPOTIFY_REFRESH_TOKEN: string
	SHOW_SPOTIFY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/styles/*', serveStatic({ root: './' }))
app.get('/favicon/*', serveStatic({ root: './' }))

app.get(
	'*',
	jsxRenderer(
		({ children }) => {
			return (
				<html lang='en'>
					<head>
						<title>hi6okuni</title>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1'
						/>
						<script src='//unpkg.com/alpinejs' defer />
						<link href='/styles/main.css' rel='stylesheet' />
						<link href='/styles/globals.css' rel='stylesheet' />
						<link rel='icon' href='/favicon/favicon.ico' />
						<link
							rel='apple-touch-icon'
							href='/favicon/apple-touch-icon-180x180.png'
						/>
					</head>
					<body>
						<div>{children}</div>
					</body>
				</html>
			)
		},
		{ docType: true },
	),
)

app.get('/', async (c) => {
	const lastPlayedTrack = JSON.parse(
		(await c.env.SPOTIFY_DATA.get('last_played_track')) || 'null',
	)
	// feature flag
	const showSpotify = c.env.SHOW_SPOTIFY === 'true'
	return c.render(
		<TopPage lastPlayedTrack={showSpotify ? lastPlayedTrack : null} />,
	)
})

export default {
	fetch: app.fetch,
	scheduled,
}
