import React from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import GiftCard from '../GiftCard/GiftCard';

const DailyRewards = () => {
  return (
    <CardWrapper
      style={{
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-evenly',
        overflow: 'hidden',
      }}>
      <GiftCard />
      <GiftCard />
      <GiftCard />
    </CardWrapper>
  );
};

export default DailyRewards;
