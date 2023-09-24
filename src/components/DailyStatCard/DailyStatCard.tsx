import React, { useState } from 'react';
import { View, Text, Image, ListRenderItemInfo, Pressable } from 'react-native';
import CardWrapper from '../CardWrapper/CardWrapper';
import { styles } from './DailyStatCard.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { COLORS } from '../../constans/COLORS';
import { ParsedMatch } from '../../constans/interfaces';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import GiftCard from '../GiftCard/GiftCard';

interface Props {
  lastTenMatches: ParsedMatch[];
}

const DailyStatCard = (props: Props) => {
  const [isTodaysStatsCard, setIsTodaysStatsCard] = useState<boolean>(true);
  const lastThreeMatches = props.lastTenMatches.slice(0, 3);

  const newRenderItem = ({ item }: ListRenderItemInfo<ParsedMatch>) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <View style={styles.currencyContainer}>
            <CurrencyWrapper
              value={item.points.toString()}
              isPerks
              staticWidth
              style={{ backgroundColor: COLORS.darkGrey }}
            />

            <CurrencyWrapper
              value={(item.points * 0.001).toFixed(2)}
              isPerks={false}
              staticWidth
              style={{ backgroundColor: COLORS.darkGrey }}
            />
          </View>
          <View style={styles.infoContainer}>
            {item.isWin ? (
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
                <Text style={styles.infoText}>LOSS</Text>
              </View>
            )}
          </View>
          <View style={styles.kdaContainer}>
            <View style={styles.individualKdaBox}>
              <Text style={styles.kdaNumberText}>{item.kills}</Text>
              <Text style={styles.kdaText}>Kills</Text>
            </View>
            <View style={styles.kdaSeparator} />
            <View style={styles.individualKdaBox}>
              <Text style={styles.kdaNumberText}>{item.deaths}</Text>
              <Text style={styles.kdaText}>Deaths</Text>
            </View>
            <View style={styles.kdaSeparator} />

            <View style={styles.individualKdaBox}>
              <Text style={styles.kdaNumberText}>{item.assists}</Text>
              <Text style={styles.kdaText}>Assists</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${item.heroUrl}` }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 16,
            }}
            resizeMode="stretch"
          />
        </View>
      </View>
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
            buttonTextStyle={{ fontSize: 14 }}
            iconName="round-chevron-right"
            onPress={() => {}}
            style={styles.matchHistoryButton}
          />
        </>
      ) : (
        <View style={styles.giftsContainer}>
          <GiftCard />
          <GiftCard />
          <GiftCard isDisabled />
        </View>
      )}
    </CardWrapper>
  );
};

export default DailyStatCard;
