export default defineEventHandler(async (event) => {
  const body = await readBody<{ url: string }>(event)
  if (!body?.url) throw createError({ statusCode: 400, statusMessage: 'Missing url' })

  const html = await $fetch<string>(body.url).catch(() => '')
  const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || '').slice(0, 120)
  const desc = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1]
    || html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i)?.[1]
  const palette = Array.from(new Set(html.match(/#[0-9a-fA-F]{6}\b/g) || [])).slice(0, 5)
  const favicon = body.url.replace(/\/$/, '') + '/favicon.ico'

  return { title, description: desc || '', palette, favicon }
})

