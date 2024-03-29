import React, { useState } from 'react';
import { Image, ListRenderItemInfo, View } from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './LinkGameScreen.styles';
import Steam from '../../assets/icons/steam.svg';
import EpicIcon from '../../assets/icons/epic.svg';
import RiotIcon from '../../assets/icons/riot.svg';
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia';
import GameCard from '../../components/GameCard/GameCard';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import CustomCarousel from 'carousel-with-pagination-rn';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';
import InformationModal from '../Modals/InformationModal/InformationModal';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import CustomSafeAreaView from '../../components/CustomSafeAreaView/CustomSafeAreaView';
import { publishersAndGames } from '../../constans/publishersAndGames';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.linkGame>;

const LinkGame = ({ navigation }: ScreenProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [singleItemWidth, setSingleItemWidth] = useState<number>(WIDTH);

  const imagePicker = (item: (typeof publishersAndGames)[0]) => {
    switch (item.publisher) {
      case 'steam':
        return {
          publisher: require('../../assets/images/Steam.png'),
          icon: <Steam />,
          style: { width: 104, height: 160, borderRadius: 16 },
        };
      case 'epic':
        return {
          publisher: require('../../assets/images/Epic.png'),
          icon: <EpicIcon />,
          style: { width: 320, height: 160, borderRadius: 16 },
        };
      case 'riot':
        return {
          publisher: require('../../assets/images/Riot.png'),
          icon: <RiotIcon />,
          style: { width: 160, height: 160, borderRadius: 16 },
        };
      default:
        return {
          publisher: null,
          icon: null,
          style: {},
        };
    }
  };
  const renderItem = ({
    item,
  }: ListRenderItemInfo<(typeof publishersAndGames)[0]>) => {
    return (
      <View
        style={styles.publisherContainer}
        onLayout={event => {
          const width = event.nativeEvent.layout.width;
          setSingleItemWidth(width);
        }}>
        <Canvas style={styles.canvas}>
          <RoundedRect x={0} y={0} width={360} height={300} r={30}>
            <LinearGradient
              start={vec(180, 180)}
              end={vec(180, 300)}
              colors={['transparent', '#040413']}
            />
          </RoundedRect>
        </Canvas>
        <Image
          source={imagePicker(item).publisher}
          style={styles.publisherImage}
          resizeMode="contain"
        />
        <View style={styles.publisherIcon}>{imagePicker(item).icon}</View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
            }}>
            {item.games.map(game => (
              <GameCard
                key={game.key}
                gameName={game.gameName}
                style={imagePicker(item).style}
                isAvailable={game.isAvalable}
              />
            ))}
          </View>
          <StandardButton
            buttonText={
              item.isLinkAvailable ? 'Sign in through Steam ' : 'Coming soon'
            }
            logoName={item.isLinkAvailable ? 'steam' : undefined}
            onPress={() => setIsModalVisible(true)}
            style={{ marginTop: 64 }}
            isDisabled={!item.isLinkAvailable}
          />
        </View>
      </View>
    );
  };

  const handleModalOnPress = () => {
    setIsModalVisible(false);
    navigation.navigate(StackScreenName.steamModal);
  };

  return (
    <CustomSafeAreaView
      style={styles.parentContainer(isModalVisible)}
      edges={['bottom']}>
      <InformationModal
        informationText={t('steam.public.account.information')}
        headerText="Before you progress!"
        buttonText="Done"
        isVisible={isModalVisible}
        onPress={handleModalOnPress}
      />
      <Gradient type="conical" style={{ position: 'absolute' }} />
      <CustomCarousel
        data={publishersAndGames}
        renderItem={renderItem}
        widthBoundaryForPagination={singleItemWidth}
        carouselContainerStyle={{ width: singleItemWidth }}
        paginationContainerStyle={{ marginTop: 24 }}
        indicatorWidth={[8, 8, 8]}
        indicatorHeight={[8, 8, 8]}
        indicatorColor={[COLORS.neutral, COLORS.white, COLORS.neutral]}
      />
    </CustomSafeAreaView>
  );
};

export default LinkGame;
