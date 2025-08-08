export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event)
  // Dummy for now, will connect to OpenAI next step
  const base = body?.brief?.title || 'Your Product'
  const variants = Array.from({ length: body?.variantCount || 3 }).map((_, i) => ({
    id: `v${i+1}`,
    headline: `${base}: Save ${20+i*10}% today!`,
    primaryText: `Discover ${base}. Trusted by thousands. Limited time offer.`,
    cta: 'Shop Now',
    angle: 'Value'
  }))
  return { variants }
})

