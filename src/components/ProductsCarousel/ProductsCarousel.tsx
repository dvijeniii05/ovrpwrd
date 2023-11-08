import React, { useRef } from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../ProductCard/ProductCard';
import { styles } from './ProductsCarousel.styles';
import { COLORS } from '../../constans/COLORS';
import { Product } from '../../redux/query/endpoints/productsApi';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';

interface Props {
  data: Product[];
  headerText: string;
  style?: ViewStyle;
}

const ProductsCarousel = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const renderItemWidth = 164;
  const scrollRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const noProducts = props.data.length === 0;

  const eightProdcuts = props.data.slice(0, 8);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const productRenderItem = ({ item }: ListRenderItemInfo<Product>) => {
    return <ProductCard isPurchasable product={item} />;
  };

  const content = () => {
    if (noProducts) {
      return (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>Coming Soon ...</Text>
        </View>
      );
    }

    return (
      <>
        <FlatList
          ref={scrollRef}
          data={eightProdcuts}
          renderItem={productRenderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={styles.scrollContentContainer(renderItemWidth)}
          style={styles.scrollStyle}
        />

        <View style={styles.paginationContainer}>
          {eightProdcuts.map((_, idx) => {
            const inputRange = [
              (idx - 1) * renderItemWidth,
              idx * renderItemWidth,
              (idx + 1) * renderItemWidth,
            ];
            const indicatorWidth = scrollX.interpolate({
              inputRange,
              outputRange: [20, 10, 20],
              extrapolate: 'clamp',
            });
            const indicatorColor = scrollX.interpolate({
              inputRange,
              outputRange: [COLORS.darkGrey, 'white', COLORS.darkGrey],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={idx}
                style={styles.paginationIndicator(
                  indicatorWidth,
                  indicatorColor,
                )}
              />
            );
          })}
        </View>
      </>
    );
  };

  return (
    <View style={[styles.parentContainer, props.style]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{props.headerText}</Text>
        <TouchableOpacity
          disabled={noProducts}
          onPress={() =>
            navigation.navigate(StackScreenName.allProducts, {
              products: props.data,
              productType: props.headerText,
            })
          }>
          <ArrowRight />
        </TouchableOpacity>
      </View>
      {content()}
    </View>
  );
};

export default ProductsCarousel;
