export type TokenResponse = {
	access_token: string
	token_type: string
	expires_in: number
}

type ExternalUrls = {
	spotify: string
}

type Image = {
	url: string
	height: number
	width: number
}

type Restrictions = {
	reason: string
}

type Artist = {
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	type: string
	uri: string
}

type Album = {
	album_type: string
	total_tracks: number
	available_markets: string[]
	external_urls: ExternalUrls
	href: string
	id: string
	images: Image[]
	name: string
	release_date: string
	release_date_precision: string
	restrictions?: Restrictions
	type: string
	uri: string
	artists: Artist[]
}

type ExternalIds = {
	isrc: string
	ean?: string
	upc?: string
}

type Track = {
	album: Album
	artists: Artist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: ExternalIds
	external_urls: ExternalUrls
	href: string
	id: string
	is_playable: boolean
	linked_from?: any // この部分の詳細が不明なため、anyとしています
	restrictions?: Restrictions
	name: string
	popularity: number
	preview_url: string | null
	track_number: number
	type: string
	uri: string
	is_local: boolean
}

type Context = {
	type: string
	href: string
	external_urls: ExternalUrls
	uri: string
}

export type PlayHistoryObject = {
	track: Track
	played_at: string
	context: Context
}

type Cursors = {
	after: string
	before: string
}

export type RecentlyPlayedResponse = {
	href: string
	limit: number
	next: string | null
	cursors: Cursors
	total: number
	items: PlayHistoryObject[]
}
