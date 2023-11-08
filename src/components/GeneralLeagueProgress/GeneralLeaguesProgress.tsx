import React, { useMemo, useState } from 'react';
import CardWrapper from '../CardWrapper/CardWrapper';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../constans/COLORS';
import UserGreenIcon from '../../assets/icons/userGreen.svg';
import TickIcon from '../../assets/icons/tick.svg';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import {
  BlurMask,
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { leagueBarColor } from '../../utils/leagueHelpers/leagueHelpers';
import { leaugeNames } from '../../constans/interfaces';
import { styles } from './GeneralLeagueProgress.styles';

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

  const [outerBarWidth, setOuterBarWidth] = useState<number>(0);
  const barLength = leagueProgress * outerBarWidth;

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
            isPerks
            value={0}
            forLeagueProgression
            style={{ minWidth: 46 }}
          />
          {hasEnoughPointsForLeague ? (
            <View>
              <TickIcon />
            </View>
          ) : (
            <CurrencyWrapper
              isPerks
              value={props.currentPerks}
              style={{ backgroundColor: COLORS.darkGrey }}
            />
          )}

          <CurrencyWrapper
            isPerks
            value={props.leagueRequiredPerks}
            forLeagueProgression
          />
        </View>
        <View
          style={styles.bar}
          onLayout={event => {
            const width = event.nativeEvent.layout.width;
            setOuterBarWidth(Number(width.toFixed(5)));
          }}>
          <Canvas style={{ width: Math.round(outerBarWidth), height: 30 }}>
            <Rect height={30} width={barLength} color={'black'}>
              <BlurMask blur={4} respectCTM />
              <LinearGradient
                start={vec(0, 15)}
                end={vec(barLength, 0)}
                colors={leagueBarColor(props.leagueName)}
              />
            </Rect>
          </Canvas>
        </View>
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
