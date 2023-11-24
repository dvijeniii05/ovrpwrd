import { apiSlice } from '../apiSlice';

export interface Product {
  uniqueId: string;
  productThumbnailUrl: string;
  productImages: string[];
  productLink: string;
  promoCodes: string[];
  productBrand: string;
  productName: string;
  isPremium: boolean;
  productDescription: string;
  price: number;
  isDigital: boolean;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<
      { digitalProducts: Product[]; physicalProducts: Product[] },
      void
    >({
      query: () => '/products/getProducts',
      keepUnusedDataFor: 500,
      providesTags: ['allProducts'],
      transformResponse: (response: Product[]) => {
        let digitalProducts: Product[] = [];
        let physicalProducts: Product[] = [];
        response.map(product =>
          product.isDigital
            ? digitalProducts.push(product)
            : physicalProducts.push(product),
        );
        return { digitalProducts, physicalProducts };
      },
    }),
    buyProduct: builder.mutation<{ promoCode: string }, { uniqueId: string }>({
      query: arg => ({
        url: '/products/buyProduct',
        body: arg,
        method: 'PATCH',
      }),
      invalidatesTags: ['userStats', 'allProducts', 'userDetails'],
    }),
  }),
});

export const { useGetAllProductsQuery, useBuyProductMutation } = productsApi;
