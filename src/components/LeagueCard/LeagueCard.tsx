import React from 'react';
import {View, Text, Image} from 'react-native';
import {LeagueData} from '../../redux/query/apiSlice';
import {styles} from './LeagueCard.style';
import {DateTime} from 'luxon';

interface Props {
  leagueData: LeagueData;
  userPoints: number;
}

export const LeagueCard = (props: Props) => {
  const endDate = DateTime.fromSeconds(props.leagueData.endData);
  const daysLeft = endDate.diffNow('days').toObject().days?.toFixed();
  const countDown =
    Number(daysLeft) > 0
      ? `${daysLeft} days left`
      : 'This league has ended. Winner will be announced soon';

  const isNoughPoints = props.userPoints >= props.leagueData.pointsRequired;

  return (
    <View style={styles.parentContainer}>
      <View style={styles.innerWrapper}>
        <View style={styles.eligibleDot(isNoughPoints)}></View>
        <Text style={styles.generalText}>{props.leagueData.leagueName}</Text>
        <Image
          source={{uri: props.leagueData.lootImage}}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <Text style={styles.generalText}>
          {props.leagueData.lootDescription}
        </Text>
        <Text style={styles.generalText}>
          {props.leagueData.pointsRequired} points required
        </Text>
        <Text style={styles.generalText}>{countDown}</Text>
      </View>
    </View>
  );
};
