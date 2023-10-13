import { View, Image, Text, Linking } from 'react-native';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { styles } from './ProductCard.styles';

interface Props {
  prizeImageUrl: string;
  linkToPrize: string;
  prizeBrand: string;
  prizeName: string;
  isPremium: boolean;
}

const ProductCard = (props: Props) => {
  const tagText = props.isPremium ? 'PREMIUM' : 'FREE';
  return (
    <View style={styles.parentContainer}>
      <Image
        source={{ uri: props.prizeImageUrl }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.prizeTag(props.isPremium)}>
        <Text style={styles.prizeTagText}>{tagText}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandText}>{props.prizeBrand}</Text>
        <Text style={styles.nameText}>{props.prizeName}</Text>
      </View>
      <StandardButton
        onPress={() => Linking.openURL(props.linkToPrize)}
        buttonText="View"
        style={styles.button}
        buttonTextStyle={{ fontSize: 14 }}
      />
    </View>
  );
};

export default ProductCard;
