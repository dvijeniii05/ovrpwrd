import {
  StatusBar,
  View,
  Text,
  ListRenderItemInfo,
  Image,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ProductInfoScreen.styles';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { COLORS } from '../../constans/COLORS';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';
import Perk from '../../assets/Perks.svg';
import Relic from '../../assets/Relics.svg';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { useEffect, useState } from 'react';
import ProductTag from '../../components/ProductTag/ProductTag';
import PurchaseModal from '../Modals/PurchaseModal/PurchaseModal';
import { useBuyProductMutation } from '../../redux/query/endpoints/productsApi';
import { useGetUserStatsQuery } from '../../redux/query/endpoints/userApi';

type NavProps = StackScreenProps<StackParamList, StackScreenName.prodcutInfo>;

const ProductInfoScreen = ({ navigation, route }: NavProps) => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 40;

  const [isPurchaseModalShown, setIsPurchaseModalShown] =
    useState<boolean>(false);

  const { product } = route?.params;

  const [trigger, { data, isSuccess, isError, isLoading }] =
    useBuyProductMutation();

  const { data: userStats, isSuccess: isUserStatsSuccess } =
    useGetUserStatsQuery();

  const isAvailable = product.promoCodes.length > 0;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ProductTag isPremium={product.isPremium} style={styles.productTag} />
      ),
    });
  }, []);

  const renderImage = ({ item }: ListRenderItemInfo<string>) => (
    <Image
      source={{ uri: item }}
      style={styles.productImage}
      resizeMode="cover"
    />
  );

  const userHasEnoughCurrency = () => {
    if (product.isPriceInPerks && userStats) {
      return userStats?.currentPoints.currentPerks >= product.price;
    } else if (!product.isPriceInPerks && userStats) {
      return userStats?.currentPoints.currentRelics >= product.price;
    }
  };

  const onBuyPress = () => {
    // add IF statement to check whether user has enough perks, if not display alert message with 'OK' ELSE display alert nox with confirmation text
    if (userHasEnoughCurrency()) {
      Alert.alert(
        'Would you like to proceed with the purchase of this product?',
        `Please press 'Yes' to continue with purchase OR 'No' to cancel`,
        [
          {
            text: 'No',
            onPress: () => Alert.alert('Prurchase cancelled'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setIsPurchaseModalShown(true);
              trigger({ uniqueId: product.uniqueId });
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      Alert.alert(
        `Oooops!`,
        `You don't have enough currency to purchase this product. You currently own ${userStats?.currentPoints.currentPerks} Perks and ${userStats?.currentPoints.currentRelics} Relics`,
        [
          {
            text: 'Understood',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.parentContainer}>
        <Gradient
          type="conical"
          style={{ position: 'absolute', tintColor: 'black' }}
        />
        <Gradient
          type="noise"
          style={{
            position: 'absolute',
            opacity: 0.5,
            tintColor: COLORS.darkGrey,
          }}
        />
        <PurchaseModal
          isVisible={isPurchaseModalShown}
          onPress={() => {
            setIsPurchaseModalShown(false);
            navigation.goBack();
          }}
          onPurchaseHistoryNavigation={() => setIsPurchaseModalShown(false)}
          uniqueId={product.uniqueId}
          productLink={product.productLink}
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          data={data}
          refetch={() => trigger({ uniqueId: product.uniqueId })}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer(topMargin)}>
            <Text style={styles.productBrandText}>{product.productBrand}</Text>
            <Text style={styles.productNameText}>{product.productName}</Text>
          </View>
          <CustomCarousel
            data={product.productImages}
            renderItem={renderImage}
            widthBoundaryForPagination={WIDTH - 32}
            indicatorWidth={[6, 6, 6]}
            indicatorHeight={[6, 6, 6]}
            indicatorColor={[COLORS.neutral, COLORS.white, COLORS.neutral]}
            indicatorHorizontalPadding={2}
            paginationContainerStyle={{ marginTop: 8 }}
          />
          <Text style={styles.productDescriptionText}>
            {product.productDescription}
          </Text>
          <StandardButton
            onPress={() => Linking.openURL(product.productLink)}
            buttonText={`Product's website`}
            style={styles.productLinkButton}
            iconName="web"
            buttonTextStyle={styles.productLinkText}
          />
          <View style={styles.priceContainer}>
            {product.isPriceInPerks ? (
              <Perk width={24} height={24} />
            ) : (
              <Relic width={24} height={24} />
            )}
            <Text style={styles.priceText}>{product.price}</Text>
          </View>
          <StandardButton
            onPress={onBuyPress}
            isDisabled={!isAvailable}
            isVerifying={!isUserStatsSuccess}
            buttonText={isAvailable ? `Buy` : `Out of stock`}
            style={{ width: '100%', marginTop: 16 }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;
