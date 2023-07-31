import React from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import GiftCard from '../GiftCard/GiftCard';
import { View } from 'react-native';
import { styles } from './DailyRewards.styles';

const DailyRewards = () => {
  return (
    <CardWrapper headingText="Daily rewards">
      <View style={styles.container}>
        <GiftCard />
        <GiftCard />
        <GiftCard />
      </View>
    </CardWrapper>
  );
};

export default DailyRewards;
