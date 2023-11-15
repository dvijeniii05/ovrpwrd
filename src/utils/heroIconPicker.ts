export const heroIconPicker = (heroID: string) => {
  const allHeroIcons = require.context('../assets/heroIcons', true, /.png$/);

  const imageSource = allHeroIcons
    .keys()
    .filter(item => item.includes(heroID))
    .pop();
  return allHeroIcons(imageSource ?? '');
};
