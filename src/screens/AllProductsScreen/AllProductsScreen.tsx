import {
  StatusBar,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './AllProductsScreen.styles';
import { useHeaderHeight } from '@react-navigation/elements';
import { Product } from '../../redux/query/endpoints/productsApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';

type NavProps = StackScreenProps<StackParamList, StackScreenName.allProducts>;

const AllProductsScreen = ({ route }: NavProps) => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 80;

  const { productType, products } = route?.params;

  const productRenderItem = ({ item }: ListRenderItemInfo<Product>) => {
    return (
      <View>
        <ProductCard isPurchasable product={item} />
      </View>
    );
  };

  const header: React.FC = () => (
    <View style={styles.headerContainer(topMargin)}>
      <Text style={styles.headerText}>{productType}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.parentContainer}>
        <Gradient type="shaded" style={{ position: 'absolute' }} />
        <FlatList
          data={products}
          renderItem={productRenderItem}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 48,
          }}
          ListHeaderComponent={header}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;
