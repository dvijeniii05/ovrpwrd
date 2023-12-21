import { View, Text } from 'react-native';
import { ParsedMatch } from '../../constans/interfaces';
import { styles } from './SingleGameStatsCard.styles';
import { COLORS } from '../../constans/COLORS';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { Canvas, Circle } from '@shopify/react-native-skia';
import FramedImage from '../FramedImage/FramedImage';

const SingleGameStatsCard = (props: ParsedMatch) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.currencyContainer}>
          <CurrencyWrapper
            value={props.points}
            isPerks
            staticWidth
            style={{ backgroundColor: COLORS.darkGrey }}
          />

          <CurrencyWrapper
            value={+(props.points * 0.001).toFixed(2)} // "+" is used to convert string into number
            isPerks={false}
            staticWidth
            style={{ backgroundColor: COLORS.darkGrey }}
          />
        </View>
        <View style={styles.infoContainer}>
          {props.isWin ? (
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 2,
                backgroundColor: COLORS.green,
                borderRadius: 6,
              }}>
              <Text style={styles.infoText}>WIN</Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 2,
                backgroundColor: COLORS.red,
                borderRadius: 6,
              }}>
              <Text style={[styles.infoText, { color: COLORS.white }]}>
                LOSS
              </Text>
            </View>
          )}
        </View>
        <View style={styles.kdaContainer}>
          <View style={styles.individualKdaBox}>
            <Text style={styles.kdaNumberText}>{props.kills}</Text>
            <Text style={styles.kdaText}>Kills</Text>
          </View>
          <View style={styles.kdaSeparator} />
          <View style={styles.individualKdaBox}>
            <Text style={styles.kdaNumberText}>{props.deaths}</Text>
            <Text style={styles.kdaText}>Deaths</Text>
          </View>
          <View style={styles.kdaSeparator} />

          <View style={styles.individualKdaBox}>
            <Text style={styles.kdaNumberText}>{props.assists}</Text>
            <Text style={styles.kdaText}>Assists</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Canvas
          style={{
            position: 'absolute',
            zIndex: 6,
            width: '100%',
            height: '100%',
          }}>
          <Circle cx={50} cy={50} r={45} color={COLORS.darkBlue} />
        </Canvas>
        <FramedImage
          frameSize={{ width: 80, height: 80 }}
          style={{ zIndex: 10, height: 70 }}
          avatar={props.heroUrl}
          frameColor="blue"
        />
      </View>
    </View>
  );
};

export default SingleGameStatsCard;
