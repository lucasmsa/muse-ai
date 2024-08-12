export const prependAssetsAudioPath = (path?: string) => {
  if (!path) return ''

  return `/assets/audio/${path}`
}
