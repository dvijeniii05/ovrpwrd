import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './CurrencyWrapper.styles';
import Perks from '../../assets/Perks.svg';
import Relics from '../../assets/Relics.svg';
import Premiums from '../../assets/Premium.svg';
import LottieView from 'lottie-react-native';

export type currencyType = 'perks' | 'relics' | 'premiums';

interface Props {
  style?: ViewStyle;
  currencyType: currencyType;
  value: string | number;
  staticWidth?: boolean;
  forLeagueProgression?: boolean;
  perkWidth?: number;
  perkHeight?: number;
  textStyle?: TextStyle;
  hidePerks?: boolean;
}

const CurrencyWrapper = ({ staticWidth = false, ...props }: Props) => {
  const nonLeagueCurrencyWrapper = () => {
    switch (props.currencyType) {
      case 'perks': {
        return (
          <>
            {props.hidePerks ? null : <Perks width={28} height={28} />}
            <Text style={[styles.text(staticWidth), props.textStyle]}>
              {props.value}
            </Text>
          </>
        );
      }
      case 'relics': {
        return (
          <>
            <Relics width={28} height={28} />
            <Text style={[styles.text(staticWidth), props.textStyle]}>
              {props.value}
            </Text>
          </>
        );
      }
      case 'premiums': {
        return (
          <>
            {props.hidePerks ? null : <Premiums width={28} height={28} />}
            <Text style={[styles.text(staticWidth), props.textStyle]}>
              {props.value}
            </Text>
          </>
        );
      }
    }
  };

  if (props.forLeagueProgression) {
    return (
      <View style={[styles.currencyContainerForLeagues, props.style]}>
        {props.currencyType === 'perks' ? (
          <>
            <Perks
              width={props.perkWidth ?? 12}
              height={props.perkHeight ?? 12}
            />
            <Text style={styles.textForLeagues}>{props.value}</Text>
          </>
        ) : (
          <>
            <Relics width={12} height={12} />
            <Text style={styles.textForLeagues}>{props.value}</Text>
          </>
        )}
      </View>
    );
  }
  return (
    <View style={[styles.currencyContainer(staticWidth), props.style]}>
      {nonLeagueCurrencyWrapper()}
    </View>
  );
};

export default CurrencyWrapper;
