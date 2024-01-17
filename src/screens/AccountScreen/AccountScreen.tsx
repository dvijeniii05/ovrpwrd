import {
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './AccountScreen.styles';
import UserInfo from '../../components/UserInfo/UserInfo';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import Relics from '../../assets/Relics.svg';
import { useCallback, useState } from 'react';
import PurchaseModal from '../Modals/PurchaseModal/PurchaseModal';
import {
  PurchasedProduct,
  useGetUserCurrencyQuery,
  useGetUserDetailsQuery,
} from '../../redux/query/endpoints/userApi';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { useDispatch } from 'react-redux';
import { useGetPremiumStatusQuery } from '../../redux/query/endpoints/premiumApi';
import { useDeleteAccountMutation } from '../../redux/query/endpoints/supportApi';

const AccountScreen = () => {
  const dispatch = useDispatch();
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
    data: userCurrency,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useGetUserCurrencyQuery();

  const {
    data: premiumStatus,
    isSuccess: premiumStatusSuccess,
    isError: premiumStatusError,
    isFetching: premiumStatusFetching,
  } = useGetPremiumStatusQuery();

  const [triggerAccountDeletion] = useDeleteAccountMutation();

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
          <Relics width={22} height={22} />
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    ),
    [userDetails],
  );

  const onLogoutPress = () => {
    Alert.alert('Leaving us?', 'Are you sure you want to log out?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch({ type: 'USER_LOGOUT' }),
        style: 'cancel',
      },
    ]);
  };

  const accountDeletionPress = () => {
    Alert.alert(
      'Deleting account?',
      'Are you sure you want to delete this account?. Be aware that we will be processing your deletion reqeust within the next 7 days. If you wish to cancel the deletion process, please contact our support team.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => triggerAccountDeletion(),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}>
        <Gradient type="shaded" style={{ position: 'absolute' }} />
        <LoadingComponent
          isLoading={
            isUserDetailsFetching || isFetching || premiumStatusFetching
          }
        />
        <PurchaseModal
          isVisible={isProductModalVisible}
          uniqueId={pickedProduct.uniqueId}
          productLink={pickedProduct.productLink}
          data={pickedProduct.data}
          isDataDriven={false}
          onPress={() => setIsProductModalVisible(false)}
        />
        {isUserDetailsSuccess && isSuccess && premiumStatusSuccess ? (
          <>
            <View style={styles.userContainer}>
              <UserInfo
                currentPerks={userCurrency.perks}
                currentRelics={userCurrency.relics}
                userName={userDetails.fullName}
                nickName={userDetails.nickname}
                avatar={userDetails.avatar}
                premiumStatus={premiumStatus}
              />
              <StandardButton
                buttonText="Edit profile"
                iconName="lock"
                isDisabled
                onPress={() => {}}
                style={styles.editButton}
                buttonTextStyle={{ fontSize: 16 }}
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
                  scrollEnabled={false}
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
        <StandardButton
          buttonText="Support"
          logoName="discord"
          onPress={() => {}}
          style={styles.transparentButton}
        />
        <StandardButton
          buttonText="Terms and Conditions"
          logoName="tandc"
          onPress={() => {}}
          style={styles.transparentButton}
        />
        <StandardButton
          buttonText="Privacy Policy"
          logoName="privacy"
          onPress={() => {}}
          style={styles.transparentButton}
        />
        <StandardButton
          buttonText="Log out"
          onPress={onLogoutPress}
          style={{ marginTop: 16 }}
        />
        <StandardButton
          buttonText="Delete account"
          onPress={accountDeletionPress}
          style={styles.transparentButton}
          buttonTextStyle={styles.accountDeleteButtonText}
        />
      </ScrollView>
    </View>
  );
};

export default AccountScreen;
