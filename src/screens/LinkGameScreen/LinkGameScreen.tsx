import React, { useState } from 'react';
import { Image, ListRenderItemInfo, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gradient from '../../components/Gradient/Gradient';
import { styles } from './LinkGameScreen.styles';
import SteamIcon from '../../assets/icons/steam.svg';
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

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.linkGame>;

const LinkGame = ({ navigation }: ScreenProps) => {
  const publishersAndGames = [
    {
      key: 1,
      publisher: 'steam',
      isLinkAvailable: true,
      games: [
        { key: 1, gameName: 'dota', isAvalable: true },
        { key: 2, gameName: 'cs', isAvalable: false },
        { key: 3, gameName: 'apex', isAvalable: false },
      ],
    },
    {
      key: 2,
      publisher: 'riot',
      isLinkAvailable: false,
      games: [
        { key: 1, gameName: 'valorant', isAvalable: false },
        { key: 2, gameName: 'lol', isAvalable: false },
      ],
    },
    {
      key: 3,
      publisher: 'epic',
      isLinkAvailable: false,
      games: [{ key: 1, gameName: 'fortnite', isAvalable: false }],
    },
  ];

  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<(typeof publishersAndGames)[0]>) => {
    function imagePicker() {
      switch (item.publisher) {
        case 'steam':
          return {
            publisher: require('../../assets/images/Steam.png'),
            icon: <SteamIcon />,
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
    }

    return (
      <View style={styles.publisherContainer}>
        <Canvas style={styles.canvas}>
          <RoundedRect x={0} y={0} width={360} height={360} r={30}>
            <LinearGradient
              start={vec(180, 180)}
              end={vec(180, 360)}
              colors={['transparent', '#040413']}
            />
          </RoundedRect>
        </Canvas>
        <Image source={imagePicker().publisher} style={styles.publisherImage} />
        <View style={styles.publisherIcon}>{imagePicker().icon}</View>
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
                style={imagePicker().style}
                isAvailable={game.isAvalable}
              />
            ))}
          </View>
          <StandardButton
            buttonText={item.isLinkAvailable ? 'Link account' : 'Coming soon'}
            onPress={() => setIsModalVisible(true)}
            style={{ marginTop: 24 }}
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
    <SafeAreaView
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
        widthBoundaryForPagination={WIDTH * 0.9 + 8}
        carouselContainerStyle={{ width: WIDTH * 0.9 + 8 }}
        paginationContainerStyle={{ marginTop: 24 }}
        indicatorWidth={[8, 8, 8]}
        indicatorHeight={[8, 8, 8]}
        indicatorColor={[COLORS.neutral, COLORS.white, COLORS.neutral]}
      />
    </SafeAreaView>
  );
};

export default LinkGame;
