import { View, Image, Text, Linking } from 'react-native';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { styles } from './ProductCard.styles';
import ProductTag from '../ProductTag/ProductTag';
import { Product } from '../../redux/query/endpoints/productsApi';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { LeaguePrize } from '../../redux/query/apiSlice';

type Props =
  | {
      isPurchasable: true;
      product: Product;
    }
  | {
      isPurchasable: false;
      product: LeaguePrize;
    };

const ProductCard = (props: Props) => {
  const nav = useNavigation<StackProps>();

  if (props.isPurchasable) {
    const isOutOfStock = props.product.promoCodes?.length == 0;

    const buttonText = () => {
      if (isOutOfStock) {
        return 'Out of Stock';
      }
      return `${props.product.price}`;
    };

    return (
      <View style={styles.parentContainer}>
        <Image
          source={{ uri: props.product.productThumbnailUrl }}
          style={styles.image}
          resizeMode="stretch"
        />
        <ProductTag
          isPremium={props.product.isPremium}
          style={styles.productTag}
        />
        <View style={styles.textContainer}>
          <Text style={styles.brandText}>{props.product.productBrand}</Text>
          <Text style={styles.nameText} numberOfLines={1}>
            {props.product.productName}
          </Text>
        </View>
        <StandardButton
          onPress={() =>
            nav.navigate(StackScreenName.prodcutInfo, {
              product: props.product,
            })
          }
          buttonText={buttonText()}
          iconName={isOutOfStock ? undefined : 'relic'}
          style={styles.button(props.isPurchasable, isOutOfStock)}
          buttonTextStyle={{ fontSize: 16 }}
          isDisabled={isOutOfStock}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.parentContainer}>
        <Image
          source={{ uri: props.product.imageUrl }}
          style={styles.image}
          resizeMode="stretch"
        />
        <ProductTag
          isPremium={props.product.isPremium}
          style={styles.productTag}
        />
        <View style={styles.textContainer}>
          <Text style={styles.brandText}>{props.product.prizeBrand}</Text>
          <Text style={styles.nameText} numberOfLines={1}>
            {props.product.prizeName}
          </Text>
        </View>
        <StandardButton
          onPress={() => Linking.openURL(props.product.linkToProduct)}
          buttonText={'View'}
          style={styles.button(props.isPurchasable)}
          buttonTextStyle={{ fontSize: 16 }}
        />
      </View>
    );
  }
};

export default ProductCard;
