import { randomRewardValues } from '../../constans/randomRewardValues';

export const rewardsAdHelper = () => {
  // 50 to 70 points
  // 50 - 40%
  // 55 - 30%
  // 60 - 20%
  // 65 - 7%
  // 70 - 3%

  // save 3 buttons status separetly in rtk and renew after 24 hours or the next day?

  const randomIndex = Math.floor(Math.random() * 32);

  const randomRewardPerks = randomRewardValues[randomIndex];
  const randomRewardRelics = randomRewardPerks * 0.001;
  return {
    rewardPerks: randomRewardPerks,
    rewardRelics: randomRewardRelics,
  };
};
