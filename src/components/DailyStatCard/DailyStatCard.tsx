import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import CardWrapper from '../CardWrapper/CardWrapper';
import ArrowRight from '../../assets/dummyAssets/arrow-right.svg';
import { styles } from './DailyStatCard.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { dummyData } from '../../constans/dummyData';
import { COLORS } from '../../constans/COLORS';
import { ParsedMatch } from '../../constans/interfaces';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';

interface Props {
  lastTenMatches: ParsedMatch[];
}

const DailyStatCard = (props: Props) => {
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
            />

            <CurrencyWrapper
              value={(item.points * 0.001).toFixed(2)}
              isPerks={false}
              staticWidth
            />
          </View>
          <View style={styles.infoContainer}>
            {item.isWin ? (
              <Text style={[styles.infoText, { color: COLORS.green }]}>
                WIN
              </Text>
            ) : (
              <Text style={[styles.infoText, { color: COLORS.red }]}>LOSS</Text>
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
              width: 100,
              height: 64,
              borderRadius: 16,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <CardWrapper style={styles.wrapperContainer} headingText="Today's stats">
      <CustomCarousel
        data={lastThreeMatches}
        renderItem={newRenderItem}
        widthBoundaryForPagination={WIDTH * 0.9 + 8}
        carouselContainerStyle={styles.listViewPort}
        indicatorWidth={[5, 5, 5]}
        indicatorHeight={[5, 5, 5]}
        indicatorColor={[
          COLORS.transparentWhite,
          COLORS.white,
          COLORS.transparentWhite,
        ]}
      />
    </CardWrapper>
  );
};

export default DailyStatCard;
