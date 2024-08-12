export const prependAssetsImagePath = (path?: string) => {
  if (!path) return ''

  return `/assets/images/${path}`
}
