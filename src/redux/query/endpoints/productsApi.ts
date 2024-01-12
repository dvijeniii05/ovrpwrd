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
  type: string;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<
      { offers: Product[]; games: Product[]; physical: Product[] },
      void
    >({
      query: () => '/products/getProducts',
      keepUnusedDataFor: 500,
      providesTags: ['allProducts'],
      transformResponse: (response: Product[]) => {
        let offers: Product[] = [];
        let games: Product[] = [];
        let physical: Product[] = [];

        response.map(product => {
          if (product.type === 'Offers') {
            offers.push(product);
          } else if (product.type === 'Games') {
            games.push(product);
          }
        });
        return { offers, games, physical };
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
