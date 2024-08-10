export const getFavoriteIconSource = (isFavorited: boolean) => {
  const variant = isFavorited ? 'filled' : 'empty'
  const favoriteIconSource = `/assets/icons/heart-${variant}.svg`

  return favoriteIconSource
}
