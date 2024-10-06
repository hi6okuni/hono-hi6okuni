type Env = {
	SPOTIFY_CLIENT_ID: string
	SPOTIFY_CLIENT_SECRET: string
	SPOTIFY_REFRESH_TOKEN: string
	SPOTIFY_DATA: KVNamespace
}

export const scheduled = async (
	event: ScheduledEvent,
	env: Env,
	ctx: ExecutionContext,
) => {
	ctx.waitUntil(schedulesFunction(env))
}

const schedulesFunction = async (env: Env) => {
	const token = await getSpotifyToken(env)
	const lastPlayedTrack = await fetchRecentTrack(token)
	await env.SPOTIFY_DATA.put(
		'last_played_track',
		JSON.stringify(lastPlayedTrack),
	)
}

async function getSpotifyToken(env: Env): Promise<string> {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(
				`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
			)}`,
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: env.SPOTIFY_REFRESH_TOKEN,
		}),
	})

	const data = await response.json()
	if (data.error) {
		throw new Error(`Failed to refresh token: ${data.error}`)
	}

	return data.access_token
}

async function fetchRecentTrack(token: string): Promise<any> {
	const response = await fetch(
		'https://api.spotify.com/v1/me/player/recently-played?limit=1',
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	)

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const data = await response.json()
	return data.items.length > 0 ? data.items[0] : null
}
