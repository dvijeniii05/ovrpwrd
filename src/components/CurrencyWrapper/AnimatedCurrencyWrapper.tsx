import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './CurrencyWrapper.styles';
import Perks from '../../assets/Perks.svg';
import Relics from '../../assets/Relics.svg';
import LottieView from 'lottie-react-native';
import { SharedValue } from 'react-native-reanimated';
import { AnimatedTextInput } from '../AnimatedTextInput/AnimatedTextInput';

interface Props {
  style?: ViewStyle;
  isPerks: boolean;
  staticWidth?: boolean;
  forLeagueProgression?: boolean;
  perkWidth?: number;
  perkHeight?: number;
  animatedValue: SharedValue<string>;
}

const AnimatedCurrencyWrapper = ({ staticWidth = false, ...props }: Props) => {
  if (props.forLeagueProgression) {
    return (
      <View style={[styles.currencyContainerForLeagues, props.style]}>
        {props.isPerks ? (
          <>
            <Perks
              width={props.perkWidth ?? 12}
              height={props.perkHeight ?? 12}
            />
            <AnimatedTextInput
              style={styles.textForLeagues}
              text={props.animatedValue}
            />
          </>
        ) : (
          <>
            <Relics width={12} height={12} />
            <AnimatedTextInput
              style={styles.textForLeagues}
              text={props.animatedValue}
            />
          </>
        )}
      </View>
    );
  }
  return (
    <View style={[styles.currencyContainer(staticWidth), props.style]}>
      {props.isPerks ? (
        <>
          <Perks width={28} height={28} />
          <AnimatedTextInput
            style={styles.text(staticWidth)}
            text={props.animatedValue}
          />
        </>
      ) : (
        <>
          {/* <LottieView
            source={require('../../assets/lottie/animIcon.json')}
            style={{ width: 28, height: 28 }}
            autoPlay
            loop
          /> */}
          <Relics width={28} height={28} />
          <AnimatedTextInput
            style={styles.text(staticWidth)}
            text={props.animatedValue}
          />
        </>
      )}
    </View>
  );
};

export default AnimatedCurrencyWrapper;
