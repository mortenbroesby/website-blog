const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  })

  return response.json()
}

const fetchFromEndpoint = async (endpoint: string) => {
  const { access_token } = await getAccessToken()

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getNowPlaying = async () => {
  return fetchFromEndpoint(NOW_PLAYING_ENDPOINT)
}

export const getRecentlyPlayed = async () => {
  return fetchFromEndpoint(`${RECENTLY_PLAYED_ENDPOINT}`)
}

export const getTopTracks = async () => {
  return fetchFromEndpoint(TOP_TRACKS_ENDPOINT)
}

export const getDefaultNowPlaying = () => {
  const defaultProps = {
    isPlaying: false,
    track: {
      title: "Unknown track",
      artist: "Spotify",
      songUrl: "https://open.spotify.com/",
    },
  }

  return defaultProps
}
