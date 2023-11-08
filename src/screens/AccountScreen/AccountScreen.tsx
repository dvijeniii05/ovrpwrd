import {
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './AccountScreen.styles';
import { useHeaderHeight } from '@react-navigation/elements';
import UserInfo from '../../components/UserInfo/UserInfo';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import Perks from '../../assets/Perks.svg';
import Relics from '../../assets/Relics.svg';
import { useCallback, useState } from 'react';
import PurchaseModal from '../Modals/PurchaseModal/PurchaseModal';
import {
  PurchasedProduct,
  useGetUserDetailsQuery,
  useGetUserStatsQuery,
} from '../../redux/query/endpoints/userApi';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';

const AccountScreen = () => {
  const [isProductModalVisible, setIsProductModalVisible] =
    useState<boolean>(false);
  const [pickedProduct, setPickedProduct] = useState({
    uniqueId: '',
    productLink: '',
    data: { promoCode: '' },
  });

  const {
    data: userDetails,
    isFetching: isUserDetailsFetching,
    isSuccess: isUserDetailsSuccess,
    isError: isUserDetailsError,
    refetch: userDetailsRefetch,
  } = useGetUserDetailsQuery();

  const {
    data: userStats,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetUserStatsQuery();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PurchasedProduct>) => (
      <TouchableOpacity
        style={styles.singlePurchaseContainer}
        onPress={() => {
          setPickedProduct({
            uniqueId: item.uniqueId,
            productLink: item.productLink,
            data: { promoCode: item.promoCode },
          });
          setIsProductModalVisible(true);
        }}>
        <Image
          source={{ uri: item.productThumbnailUrl }}
          style={{ aspectRatio: 1.2, width: 56 }}
        />
        <View>
          <Text numberOfLines={1} style={styles.brandText}>
            {item.productBrand}
          </Text>
          <Text numberOfLines={1} style={styles.productNameText}>
            {item.productName}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.brandText}>
          {item.date}
        </Text>
        <View style={styles.priceContainer}>
          {item.isPriceInPerks ? (
            <Perks width={24} height={24} />
          ) : (
            <Relics width={24} height={24} />
          )}
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.parentContainer}>
        <Gradient type="shaded" style={{ position: 'absolute' }} />
        <LoadingComponent isLoading={isUserDetailsFetching || isFetching} />
        <PurchaseModal
          isVisible={isProductModalVisible}
          uniqueId={pickedProduct.uniqueId}
          productLink={pickedProduct.productLink}
          data={pickedProduct.data}
          isDataDriven={false}
          onPress={() => setIsProductModalVisible(false)}
        />
        {isUserDetailsSuccess && isSuccess ? (
          <>
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <UserInfo
                currentPerks={userStats.currentPoints.currentPerks}
                currentRelics={userStats.currentPoints.currentRelics}
                userName={userDetails.fullName}
                nickName={userDetails.nickname}
                avatar={userDetails.avatar}
              />
              <StandardButton
                buttonText="Edit profile"
                iconName="lock"
                isDisabled
                onPress={() => {}}
                style={styles.editButton}
                buttonTextStyle={{ fontSize: 14 }}
              />
            </View>
            <View style={styles.purchaseParentContent}>
              <Text style={styles.purchaseHeadingText}>Purchase history</Text>
              {userDetails.purchases.length > 0 ? (
                <FlatList
                  data={userDetails.purchases}
                  renderItem={renderItem}
                  horizontal={false}
                  style={{ marginTop: 16 }}
                  contentContainerStyle={{ gap: 8, paddingBottom: 56 }}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              ) : (
                <Text style={styles.noPurchaseText}>
                  Your future purchases will be displayed here. You will be able
                  to click on each "Purchase" tile to get access to more
                  information
                </Text>
              )}
            </View>
          </>
        ) : null}
        {isError || isUserDetailsError ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <GeneralErrorComponent
              refetchFunction={() => {
                userDetailsRefetch();
                refetch();
              }}
              isExtraLargeComponent
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
