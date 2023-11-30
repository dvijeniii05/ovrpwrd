import React, { useState } from 'react';
import {
  View,
  Text,
  ListRenderItemInfo,
  Pressable,
  Linking,
} from 'react-native';
import CardWrapper from '../CardWrapper/CardWrapper';
import { styles } from './DailyStatCard.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { COLORS } from '../../constans/COLORS';
import { ParsedMatch } from '../../constans/interfaces';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import GiftCard from '../GiftCard/GiftCard';
import FramedImage from '../FramedImage/FramedImage';
import { useTranslation } from 'react-i18next';
import { Canvas, Circle } from '@shopify/react-native-skia';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';

interface Props {
  lastTenMatches?: ParsedMatch[];
  firstGameId?: number;
}

const DailyStatCard = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const [isTodaysStatsCard, setIsTodaysStatsCard] = useState<boolean>(true);
  const lastThreeMatches = props.lastTenMatches?.slice(0, 3);

  const { t } = useTranslation();

  const newRenderItem = ({ item }: ListRenderItemInfo<ParsedMatch>) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <View style={styles.currencyContainer}>
            <CurrencyWrapper
              value={item.points}
              isPerks
              staticWidth
              style={{ backgroundColor: COLORS.darkGrey }}
            />

            <CurrencyWrapper
              value={+(item.points * 0.001).toFixed(2)} // "+" is used to convert string into number
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
                <Text style={[styles.infoText, { color: COLORS.white }]}>
                  LOSS
                </Text>
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
            avatar={item.heroUrl}
            frameColor="blue"
          />
        </View>
      </View>
    );
  };

  const noGamesCard = () => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <View style={styles.currencyContainer}>
            <CurrencyWrapper
              value={0}
              isPerks
              staticWidth
              style={{ backgroundColor: COLORS.darkGrey }}
            />
            <CurrencyWrapper
              value={0} // "+" is used to convert string into number
              isPerks={false}
              staticWidth
              style={{ backgroundColor: COLORS.darkGrey }}
            />
          </View>
          <View style={styles.noGameContainer}>
            <Text style={styles.noGameText}>
              {`${t('dailyStats.noGame.card.text')}`}{' '}
              <Text
                style={{
                  color: COLORS.green,
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  Linking.openURL(
                    `https://www.opendota.com/matches/${props.firstGameId}`,
                  );
                }}>
                {props.firstGameId}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const carouselContent = () => {
    if (!lastThreeMatches?.length) return noGamesCard();

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
