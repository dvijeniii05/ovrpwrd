import React, { useMemo } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import UserGreenIcon from '../../assets/icons/userGreen.svg';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { leaugeNames } from '../../constans/interfaces';
import { styles } from './GeneralLeagueProgress.styles';
import NeonBar from '../NeonBar/NeonBar';

interface Props {
  leagueName: leaugeNames;
  daysLeft: string | undefined;
  userCount?: number;
  currentPerks: number;
  leagueRequiredPerks: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const GeneralLeagueProgress = (props: Props) => {
  const hasEnoughPointsForLeague =
    props.currentPerks >= props.leagueRequiredPerks;

  const leagueProgress = useMemo(() => {
    if (props.leagueRequiredPerks && props.currentPerks) {
      if (hasEnoughPointsForLeague) {
        return 1;
      }
      return props.currentPerks / props.leagueRequiredPerks;
    }
    return 0;
  }, [props.leagueRequiredPerks, props.currentPerks]);

  const content = (
    <>
      <View style={styles.topContentContainer}>
        <View>
          <Text style={styles.generalText}>{props.leagueName}</Text>
          <Text style={styles.greySmallText}>{props.daysLeft}</Text>
        </View>
        {props.userCount ? (
          <View style={styles.userCountContainer}>
            <UserGreenIcon />
            <Text style={styles.generalSmallText}>{props.userCount}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.progressMainContainer}>
        <View style={styles.progressPerksContainer}>
          <CurrencyWrapper
            currencyType="perks"
            value={0}
            forLeagueProgression
            style={{ minWidth: 46 }}
          />
          {hasEnoughPointsForLeague ? (
            <CurrencyWrapper
              currencyType="perks"
              value={'QUALIFIED'}
              style={{ backgroundColor: COLORS.green }}
              textStyle={{ color: COLORS.black, fontSize: 12 }}
              hidePerks
            />
          ) : (
            <CurrencyWrapper
              currencyType="perks"
              value={props.currentPerks}
              style={{ backgroundColor: COLORS.darkGrey }}
            />
          )}

          <CurrencyWrapper
            currencyType="perks"
            value={props.leagueRequiredPerks}
            forLeagueProgression
          />
        </View>

        <NeonBar
          leagueProgress={leagueProgress}
          leagueName={props.leagueName}
          generalLeague
        />
      </View>
    </>
  );

  return props.onPress ? (
    <CardWrapper onPress={props.onPress} style={props.style}>
      {content}
    </CardWrapper>
  ) : (
    <CardWrapper style={props.style}>{content}</CardWrapper>
  );
};

export default GeneralLeagueProgress;
