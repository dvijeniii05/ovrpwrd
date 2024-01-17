import { Text, View } from 'react-native';
import { useGetRewardsStatusQuery } from '../../redux/query/endpoints/rewardsApi';
import { styles } from './GiftCardsContainer.styles';
import GiftCard from '../GiftCard/GiftCard';
import { SharedValue } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { COLORS } from '../../constans/COLORS';
import { Loader } from '../Loaders/Loader';

interface Props {
  rawPerks: SharedValue<number>;
  rawRelics: SharedValue<number>;
}

const GiftCardsContainer = (props: Props) => {
  const { isFetching, isError, isSuccess, refetch } =
    useGetRewardsStatusQuery();

  const fetchingContent = (
    <LottieView
      source={require('../../assets/lottie/greenLoader.json')}
      style={{ width: 50, height: 150 }}
      autoPlay
      loop
    />
  );

  const successContent = (
    <View>
      <View style={styles.giftsContainer}>
        <GiftCard
          rawPerks={props.rawPerks}
          rawRelics={props.rawRelics}
          cardId="left"
        />
        <GiftCard
          rawPerks={props.rawPerks}
          rawRelics={props.rawRelics}
          cardId="mid"
        />
        <GiftCard
          rawPerks={props.rawPerks}
          rawRelics={props.rawRelics}
          cardId="right"
        />
      </View>
      <Text style={styles.informationText}>
        Try your luck for a chance to win between 40 and 70 Relics
      </Text>
    </View>
  );

  const errorContent = (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        We encountered an issue retrieving your Rewards. Please try again or
        contact our customer support chat in Discord.
      </Text>
      <StandardButton
        buttonText="Retry"
        onPress={refetch}
        style={{ backgroundColor: COLORS.red }}
        buttonTextStyle={{ fontSize: 14 }}
      />
    </View>
  );

  return (
    <Loader isFetching={isFetching} fetchFallback={fetchingContent}>
      {isSuccess ? successContent : null}
      {isError ? errorContent : null}
    </Loader>
  );
};

export default GiftCardsContainer;
