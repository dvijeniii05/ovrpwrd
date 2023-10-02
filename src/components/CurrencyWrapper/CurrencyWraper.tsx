import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles } from './CurrencyWrapper.styles';
import Perks from '../../assets/Perks.svg';
import Relics from '../../assets/Relics.svg';
interface Props {
  style?: ViewStyle;
  isPerks: boolean;
  value: number;
  staticWidth?: boolean;
  forLeagueProgression?: boolean;
  perkWidth?: number;
  perkHeight?: number;
}

const CurrencyWrapper = ({ staticWidth = false, ...props }: Props) => {
  if (props.forLeagueProgression) {
    return (
      <View style={[styles.currencyContainerForLeagues, props.style]}>
        {props.isPerks ? (
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
      {props.isPerks ? (
        <>
          <Perks width={24} height={24} />
          <Text style={styles.text(staticWidth)}>{props.value}</Text>
        </>
      ) : (
        <>
          <Relics width={24} height={24} />
          <Text style={styles.text(staticWidth)}>{props.value}</Text>
        </>
      )}
    </View>
  );
};

export default CurrencyWrapper;
