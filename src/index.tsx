import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { TopPage } from './components/TopPage'

const app = new Hono()

app.get('/styles/*', serveStatic({ root: './' }))

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

app.get('/', (c) => c.render(<TopPage />))

export default app
