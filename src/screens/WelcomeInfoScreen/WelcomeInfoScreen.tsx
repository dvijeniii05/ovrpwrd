import { View, Text, Image, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WIDTH } from '../../utils/dimension';
import { COLORS } from '../../constans/COLORS';
import Logo from '../../assets/Logo.svg';
import CustomCarousel from 'carousel-with-pagination-rn';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';
import { useRef, useState } from 'react';
import { RefProps } from 'carousel-with-pagination-rn/lib/typescript/Interfaces';
import { styles } from './WelcomeInfoScreen.styles';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { welcomeInfoData } from '../../constans/welcomeInfoData';

type ScreenProps = StackScreenProps<
  StackParamList,
  StackScreenName.welcomeInfo
>;

const WelcomeInfoScreen = ({ navigation }: ScreenProps) => {
  const carouselRef = useRef<RefProps>(null);
  const [isLastCarouselItem, setIsLastCarouselItem] = useState<boolean>(false);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<(typeof welcomeInfoData)[0]>) => (
    <View style={{ width: WIDTH }}>
      <Image source={item.image} style={styles.imageStyle} />
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Logo style={{ marginTop: 24 }} />
      <CustomCarousel
        ref={carouselRef}
        data={welcomeInfoData}
        renderItem={renderItem}
        paginationContainerStyle={{ marginTop: 32 }}
        indicatorWidth={[8, 8, 8]}
        indicatorHeight={[8, 8, 8]}
        indicatorColor={[COLORS.neutral, COLORS.white, COLORS.neutral]}
        isEndReached={() => setIsLastCarouselItem(true)}
      />
      <View style={styles.buttonsWrapper}>
        {!isLastCarouselItem ? (
          <>
            <StandardButton
              onPress={() => navigation.navigate(StackScreenName.landing)}
              buttonText="Skip"
              style={{ flex: 1, backgroundColor: COLORS.darkBlue }}
            />
            <StandardButton
              onPress={() => carouselRef.current?.showNextItem()}
              buttonText="Next"
              style={{ flex: 1 }}
            />
          </>
        ) : (
          <StandardButton
            onPress={() => navigation.navigate(StackScreenName.landing)}
            buttonText="Get Started"
            style={{ flex: 1 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeInfoScreen;
