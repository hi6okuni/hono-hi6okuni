import readline from 'node:readline/promises'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const redirectUri = 'http://localhost:8787/callback'

async function getInitailTokens() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	// 1. 認証URLを生成
	const scope = 'user-read-recently-played'
	const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
		scope,
	)}&redirect_uri=${encodeURIComponent(redirectUri)}`

	console.log('Please visit this URL to authorize the application:', authUrl)
	console.log(
		'After authorization, you will be redirected. Please copy the entire redirected URL.',
	)

	const redirectedUrl = await rl.question('Paste the redirected URL here: ')

	rl.close()

	const code = new URL(redirectedUrl).searchParams.get('code')
	if (!code) {
		throw new Error('No code found in the redirected URL')
	}

	// 3. アクセストークンとリフレッシュトークンを取得
	const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
		},
		body: new URLSearchParams({
			code: code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
		}),
	})

	const tokenData = await tokenResponse.json()

	// 4. トークンを安全に保存
	await Bun.write(
		'.env',
		`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}\n`,
		{ append: true },
	)
	console.log('Refresh token has been saved to .env file')
}

getInitailTokens()
