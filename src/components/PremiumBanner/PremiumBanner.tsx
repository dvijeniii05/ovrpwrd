import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { View, Image, Text } from 'react-native';
import { WIDTH } from '../../utils/dimension';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './PremiumBanner.styles';

const PremiumBanner = () => {
  const [bannerHeight, setBannerHeight] = useState<number>(0);
  const { t } = useTranslation();
  return (
    <View
      style={styles.parentContainer}
      onLayout={event => {
        const width = event.nativeEvent.layout.height;
        setBannerHeight(Number(width.toFixed(3)));
      }}>
      <Image
        source={require('../../assets/banners/premiumBanner.png')}
        style={{ width: '100%' }}
        resizeMode="cover"
      />
      <Canvas style={styles.canvas}>
        <Rect width={WIDTH} height={bannerHeight} />
        <LinearGradient
          start={vec(WIDTH * 0.5, bannerHeight * 0.4)}
          end={vec(WIDTH * 0.5, bannerHeight)}
          colors={['transparent', '#040413']}
        />
      </Canvas>
      <View style={styles.contentContainer}>
        <Text style={styles.headingText}>{t('premium.banner.header')}</Text>
        <Text style={styles.descriptionText}>
          {t('premium.banner.description')}
        </Text>
        <StandardButton
          onPress={() => {}}
          buttonText="Go to Premium"
          iconName="round-chevron-right"
          buttonTextStyle={{ fontSize: 16 }}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default PremiumBanner;
