import { RecentlyPlayedResponse, TokenResponse } from './types/Spotify'

let accessToken: string | null = null
let tokenExpiration = 0

type Env = {
	SPOTIFY_CLIENT_ID: string
	SPOTIFY_CLIENT_SECRET: string
}

export async function getSpotifyToken(env: Env): Promise<string> {
	if (accessToken && Date.now() < tokenExpiration) {
		return accessToken
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(
				`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
			)}`,
		},
		body: 'grant_type=client_credentials',
	})

	const data: TokenResponse = await response.json()
	accessToken = data.access_token
	tokenExpiration = Date.now() + data.expires_in * 1000
	return accessToken
}

export async function getRecentTracks(
	token: string,
): Promise<RecentlyPlayedResponse> {
	const response = await fetch(
		'https://api.spotify.com/v1/me/player/recently-played?limit=10',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	)
	console.log('response:', response)
	return response.json()
}
