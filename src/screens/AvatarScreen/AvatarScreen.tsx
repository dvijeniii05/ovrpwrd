import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { COLORS } from '../../constans/COLORS';
import { useTranslation } from 'react-i18next';
import { styles } from './AvatarScreen.styles';
import { useHeaderHeight } from '@react-navigation/elements';
import FramedImage from '../../components/FramedImage/FramedImage';
import { useState } from 'react';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { useUpdateUserDetailsMutation } from '../../redux/query/endpoints/userApi';
import InformationModal from '../Modals/InformationModal/InformationModal';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { avatars } from '../../constans/avatars';
import { revenueCatInit } from '../../utils/revenueCatInit';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.avatar>;

const AvatarScreen = ({ navigation }: ScreenProps) => {
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 56;
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [isInformationModalVisible, setIsInformationModalVisible] =
    useState<boolean>(false);
  const [informationModalText, setInformationModalText] = useState<string>('');
  const revUserId = useSelector(
    (state: RootState) => state.userData.data.revenueCatId,
  );

  // Code below is to disable hardware backButton action on old models of Android devices to stop user from going back
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    if (revUserId) {
      revenueCatInit(revUserId);
    }

    return () => backHandler.remove();
  }, []);

  const [addAvatar, { isLoading }] = useUpdateUserDetailsMutation();

  const renderItem = ({ item }: ListRenderItemInfo<{ value: string }>) => (
    <TouchableOpacity onPress={() => setSelectedAvatar(item.value)}>
      <FramedImage
        avatar={item.value}
        frameColor={selectedAvatar == item.value ? 'green' : 'blue'}
        isOverflowHidden
      />
    </TouchableOpacity>
  );

  const handleOnPress = () => {
    addAvatar({ avatar: selectedAvatar })
      .unwrap()
      .then(response => {
        navigation.navigate(StackScreenName.linkGame);
      })
      .catch(error => {
        setInformationModalText(error.data?.message ?? JSON.stringify(error));
        setIsInformationModalVisible(true);
      });
  };

  return (
    <CustomSafeAreaView style={styles.parentContainer} edges={['bottom']}>
      <Gradient type="shaded" style={{ position: 'absolute', top: 0 }} />
      <LoadingComponent isLoading={isLoading} />
      <InformationModal
        isVisible={isInformationModalVisible}
        headerText="Oops, something went wrong"
        informationText={informationModalText}
        onPress={() => setIsInformationModalVisible(false)}
        buttonText="Okay"
      />
      <View style={styles.headingContainer(topMargin)}>
        <Text style={styles.headingText(COLORS.mainBlue)}>2.</Text>
        <Text style={styles.headingText(COLORS.white)}>
          {t('avatar.pick.heading')}
        </Text>
      </View>
      <FlatList
        data={avatars}
        renderItem={renderItem}
        numColumns={3}
        style={{ marginTop: 40 }}
        contentContainerStyle={{ gap: 24 }}
        columnWrapperStyle={{ gap: 24 }}
      />
      <StandardButton
        buttonText={t('nextStep.button')}
        onPress={handleOnPress}
        isDisabled={!selectedAvatar}
        style={{ width: '100%' }}
      />
    </CustomSafeAreaView>
  );
};

export default AvatarScreen;
