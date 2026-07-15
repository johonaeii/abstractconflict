const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400',
  },
  body: JSON.stringify(body),
})

export const handler = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    return json(503, { error: 'Instagram feed is not configured.' })
  }

  const params = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
    limit: '9',
    access_token: accessToken,
  })

  try {
    const response = await fetch(`https://graph.instagram.com/me/media?${params}`)
    const payload = await response.json()

    if (!response.ok) {
      console.error('Instagram API error', payload?.error?.type, payload?.error?.code)
      return json(502, { error: 'Instagram feed could not be loaded.' })
    }

    const posts = (payload.data ?? []).map((post) => ({
      id: post.id,
      caption: post.caption?.slice(0, 180) ?? '',
      mediaType: post.media_type,
      mediaUrl: post.media_url,
      permalink: post.permalink,
      thumbnailUrl: post.thumbnail_url ?? '',
      timestamp: post.timestamp,
    }))

    return json(200, { posts })
  } catch (error) {
    console.error('Instagram feed request failed', error?.name)
    return json(502, { error: 'Instagram feed could not be loaded.' })
  }
}
