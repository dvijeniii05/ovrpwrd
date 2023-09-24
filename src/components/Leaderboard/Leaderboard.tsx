import React from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { styles } from './Leaderboard.styles';
import FramedImage from '../FramedImage/FramedImage';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import StandardButton from '../Buttons/StandardButton/StandardButton';

const dummyPlayers = [
  {
    name: 'Sosu Pisos',
    perks: '4000',
  },
  {
    name: 'Ebaniy ishak',
    perks: '3000',
  },
  {
    name: 'Mister Clown',
    perks: '2200',
  },
];

const Leaderboard = () => {
  const renderItem = ({
    item,
  }: ListRenderItemInfo<{ name: string; perks: string }>) => (
    <View style={styles.cardContainer}>
      <View style={styles.leftSideContainer}>
        <Text style={[styles.text, { marginRight: 24 }]}>01</Text>
        <FramedImage
          avatar="2"
          frameColor="blue"
          frameSize={{ width: 24, height: 24 }}
        />
        <Text style={[styles.text, { marginLeft: 26 }]}>{item.name}</Text>
      </View>
      <CurrencyWrapper
        forLeagueProgression
        isPerks
        perkWidth={16}
        perkHeight={16}
        value={item.perks}
      />
    </View>
  );
  return (
    <View style={{ width: '100%', marginTop: 40, paddingHorizontal: 16 }}>
      <Text style={[styles.text, { fontSize: 24, marginBottom: 24 }]}>
        Monthly Leaderbord
      </Text>
      <FlatList
        data={dummyPlayers}
        renderItem={renderItem}
        scrollEnabled={false}
        style={styles.parentContainer}
        contentContainerStyle={{ gap: 2 }}
      />
      <StandardButton
        buttonText="See more"
        iconName="round-chevron-right"
        onPress={() => {}}
        style={styles.seeMoreButton}
        buttonTextStyle={{ fontSize: 14 }}
      />
    </View>
  );
};

export default Leaderboard;
