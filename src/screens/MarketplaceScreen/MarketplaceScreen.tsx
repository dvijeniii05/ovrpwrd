import React, { useState } from 'react';
import { ScrollView, StatusBar, View, Text } from 'react-native';
import { styles } from './MarketplaceScreen.styles';
import Gradient from '../../components/Gradient/Gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import DoubleFilterTab from '../../components/DoubleFiltertab/DoubleFilterTab';
import ProductsCarousel from '../../components/ProductsCarousel/ProductsCarousel';
import { useGetAllProductsQuery } from '../../redux/query/endpoints/productsApi';
import { Loader } from '../../components/Loaders/Loader';
import { SkeletonLoader } from '../../components/Loaders/SkeletonLoader';
import { Rect } from 'react-content-loader/native';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';

const MarketplaceScreen = () => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 20;

  const [isMarketplaceActive, setIsMarketplaceActive] = useState<boolean>(true);

  const { data, isSuccess, isError, isFetching, refetch } =
    useGetAllProductsQuery();

  const marketplaceLoader = (
    <SkeletonLoader viewBox="0,0,370,380">
      <Rect x="10" y="40" width="70" height="30" />
      <Rect x="340" y="45" width="20" height="20" />

      <Rect x="10" y="100" rx={20} width="160" height="240" />
      <Rect x="180" y="100" rx={20} width="160" height="240" />
      <Rect x="350" y="100" rx={20} width="160" height="240" />

      <Rect x="85" y="360" width="200" height="20" />
    </SkeletonLoader>
  );

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <Gradient type="shaded" style={{ position: 'absolute' }} />
        <View style={styles.headerContainer(topMargin)}>
          <Text style={styles.headerText}>Market</Text>
          <DoubleFilterTab
            leftTabText="Offers"
            rightTabText="Auction"
            leftTabAction={() => setIsMarketplaceActive(true)}
            rightTabAction={() => setIsMarketplaceActive(false)}
            isRightTabDisabled
          />
        </View>
        {isMarketplaceActive ? (
          <Loader isFetching={isFetching} fetchFallback={marketplaceLoader}>
            {isSuccess ? (
              <>
                <ProductsCarousel
                  data={data.offers}
                  headerText={data.offers[0].type}
                  style={{ marginTop: 48 }}
                />
                <ProductsCarousel
                  data={data.games}
                  headerText={data.games[0].type}
                  style={{ marginTop: 48 }}
                />
                <ProductsCarousel
                  data={data.physical}
                  headerText={'Physical'}
                  style={{ marginTop: 48 }}
                />
              </>
            ) : null}
            {isError ? (
              <GeneralErrorComponent
                refetchFunction={() => {
                  refetch();
                }}
                isExtraLargeComponent
                customErrorMessage="Error loading Marketplace"
                style={{ marginTop: 48 }}
              />
            ) : null}
          </Loader>
        ) : (
          <Text style={{ color: 'white' }}>AUCTION</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MarketplaceScreen;
