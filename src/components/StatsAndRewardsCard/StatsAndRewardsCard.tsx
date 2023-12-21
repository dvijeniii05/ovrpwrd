import React, { useState } from 'react';
import { View, Text, ListRenderItemInfo, Pressable } from 'react-native';
import CardWrapper from '../CardWrapper/CardWrapper';
import { styles } from './StatsAndRewardsCard.styles';
import { COLORS } from '../../constans/COLORS';
import { ParsedMatch } from '../../constans/interfaces';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { SharedValue } from 'react-native-reanimated';
import SingleGameStatsCard from '../SingleGameStatsCard./SingleGameStatsCard';
import NoGamesCard from '../NoGamesCard/NoGamesCard';
import GiftCardsContainer from '../GiftCardsContainer/GiftCardsContainer';

interface Props {
  lastTenMatches?: ParsedMatch[];
  firstGameId?: number;
  rawPerks: SharedValue<number>;
  rawRelics: SharedValue<number>;
}

const StatsAndRewardsCard = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const [isTodaysStatsCard, setIsTodaysStatsCard] = useState<boolean>(true);
  const lastThreeMatches = props.lastTenMatches?.slice(0, 3);

  const newRenderItem = ({ item }: ListRenderItemInfo<ParsedMatch>) => {
    return <SingleGameStatsCard {...item} />;
  };

  const carouselContent = () => {
    if (!lastThreeMatches?.length)
      return <NoGamesCard firstGameId={props.firstGameId} />;

    return (
      <>
        <CustomCarousel
          data={lastThreeMatches}
          renderItem={newRenderItem}
          widthBoundaryForPagination={WIDTH * 0.9 + 8}
          carouselContainerStyle={styles.listViewPort}
          indicatorWidth={[6, 6, 6]}
          indicatorHeight={[6, 6, 6]}
          indicatorColor={[COLORS.neutral, COLORS.white, COLORS.neutral]}
          indicatorHorizontalPadding={2}
        />
        <StandardButton
          buttonText="Match history"
          buttonTextStyle={{ fontSize: 16 }}
          iconName="round-chevron-right"
          onPress={() => navigation.navigate(StackScreenName.matchHistory)}
          style={styles.matchHistoryButton}
        />
      </>
    );
  };

  return (
    <CardWrapper style={styles.wrapperContainer}>
      <View style={styles.tabsContainer}>
        <Pressable
          style={styles.tabsButton(isTodaysStatsCard)}
          onPress={() => setIsTodaysStatsCard(true)}>
          <Text style={styles.tabsButtonText}>Today's stats</Text>
        </Pressable>
        <Pressable
          style={styles.tabsButton(!isTodaysStatsCard)}
          onPress={() => setIsTodaysStatsCard(false)}>
          <Text style={styles.tabsButtonText}>Daily rewards</Text>
        </Pressable>
      </View>
      {isTodaysStatsCard ? (
        carouselContent()
      ) : (
        <GiftCardsContainer
          rawPerks={props.rawPerks}
          rawRelics={props.rawRelics}
        />
      )}
    </CardWrapper>
  );
};

export default StatsAndRewardsCard;
