import React from 'react';
import { Image, ImageStyle, Text, View } from 'react-native';
import { COLORS } from '../../constans/COLORS';

interface Props {
  gameName: string;
  style: ImageStyle;
  isAvailable: boolean;
}

const GameCard = (props: Props) => {
  const imagePicker = () => {
    switch (props.gameName) {
      case 'dota':
        return require('../../assets/images/dota.png');
      case 'cs':
        return require('../../assets/images/cs.png');
      case 'apex':
        return require('../../assets/images/apex.png');
      case 'lol':
        return require('../../assets/images/lol.png');
      case 'valorant':
        return require('../../assets/images/valorant.png');
      case 'fortnite':
        return require('../../assets/images/fortnite.png');
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={imagePicker()}
        style={[props.style, { opacity: props.isAvailable ? 1 : 0.4 }]}
        resizeMode="cover"
      />
      <View
        style={{
          backgroundColor: props.isAvailable ? COLORS.green : COLORS.neutral,
          paddingVertical: 4,
          paddingHorizontal: 8,
          alignItems: 'center',
          position: 'absolute',
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: props.isAvailable ? COLORS.black : COLORS.white,
            fontFamily: 'Jost-SemiBold',
            fontSize: 10,
          }}>
          {props.isAvailable ? 'AVAILABLE' : 'COMING SOON'}
        </Text>
      </View>
    </View>
  );
};

export default GameCard;
