import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import FramedImage from '../FramedImage/FramedImage';
import { styles } from './PreviousWinnerCard.styles';
import TransparentHole from '../../assets/TransparentHole.svg';
import { COLORS } from '../../constans/COLORS';

interface Props {
  prizeImageUrl: string;
  prizeName: string;
  prizeValue: number;
  winnerName: string;
  season: string;
  style?: ViewStyle;
}

const PreviousWinnerCard = (props: Props) => {
  return (
    <View style={[styles.parentContainer, props.style]}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.tag}>
            <Text style={[styles.headerText, { color: COLORS.black }]}>
              WINNER
            </Text>
          </View>
          <Text style={styles.headerText}>{props.season.toUpperCase()}</Text>
        </View>
        <Text style={styles.winnerNameText}>{props.winnerName}</Text>
        <View style={styles.prizeContainer}>
          <Image
            source={{ uri: props.prizeImageUrl }}
            style={styles.prizeImage}
          />
          <View>
            <Text style={styles.prizeText}>Prize</Text>
            <Text style={styles.prizeNameText}>{props.prizeName}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.prizeRetailText}>Retail price</Text>
            <Text style={styles.prizeValueText}>$ {props.prizeValue}</Text>
          </View>
        </View>
      </View>
      <View style={styles.winnerAvatarContainer}>
        <TransparentHole style={{ position: 'absolute', zIndex: 1 }} />
        <FramedImage
          avatar="2"
          frameColor="green"
          frameSize={{ width: 75, height: 80 }}
          style={{ zIndex: 2 }}
        />
      </View>
    </View>
  );
};

export default PreviousWinnerCard;
