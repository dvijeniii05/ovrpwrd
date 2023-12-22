import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Light from '../../assets/Light.svg';
import Gift from '../../assets/Gift.svg';
import DisabledLight from '../../assets/Disabled-light.svg';
import DisabledGift from '../../assets/Disabled-gift.svg';
import { styles } from './GiftCard.styles';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';
import InformationModal from '../../screens/Modals/InformationModal/InformationModal';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { rewardsAdHelper } from '../../utils/rewardsAdHelper/rewardsAdHelper';
import {
  useClaimRewardMutation,
  useGetRewardsStatusQuery,
} from '../../redux/query/endpoints/rewardsApi';
import { useDispatch } from 'react-redux';
import { userApi } from '../../redux/query/endpoints/userApi';

interface Props {
  isDisabled?: boolean;
  rawPerks: SharedValue<number>;
  rawRelics: SharedValue<number>;
  cardId: 'left' | 'mid' | 'right';
}

const GiftCard = (props: Props) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [test, setTest] = useState(false);

  const { data } = useGetRewardsStatusQuery();
  const [trigger, { isLoading, isError, isSuccess }] = useClaimRewardMutation();

  const fullDate = new Date();
  const today = fullDate.getDate();

  const isGiftAlreadyClaimed = useMemo(() => {
    switch (props.cardId) {
      case 'left':
        return data?.rewards.leftGiftClaimedDate == today;
      case 'mid':
        return data?.rewards.midGiftClaimedDate == today;
      case 'right':
        return data?.rewards.rightGiftClaimedDate == today;
    }
  }, [props.cardId, data]);

  const { isLoaded, isClosed, load, show, reward, isEarnedReward } =
    useRewardedAd(TestIds.REWARDED);

  const rewards = useMemo(() => rewardsAdHelper(), [props.cardId]);

  useEffect(() => {
    load();
  }, [load, isClosed]);

  useEffect(() => {
    if (isEarnedReward) {
      setIsModalVisible(true);
      trigger({ reward: rewards.rewardPerks, claimId: props.cardId });
    }
  }, [isEarnedReward]);

  const onRewardSuccess = () => {
    dispatch(userApi.util.invalidateTags(['currency', 'rewards']));
    props.rawPerks.value = withTiming(
      props.rawPerks.value + rewards.rewardPerks,
      {
        duration: 1000,
      },
    );
    props.rawRelics.value = withTiming(
      props.rawRelics.value + rewards.rewardRelics,
      {
        duration: 1000,
      },
    );
  };

  return (
    <View style={styles.parentContainer} key={props.cardId}>
      <InformationModal
        isVisible={isModalVisible}
        onPress={() => {
          setIsModalVisible(false);
          onRewardSuccess();
        }}
        onErrorPress={() => {
          setIsModalVisible(false);
        }}
        isDataDriven
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        withReward
        rewards={rewards.rewardPerks}
      />
      {isGiftAlreadyClaimed ? (
        <>
          <DisabledLight style={{ position: 'absolute', top: -8 }} />
          <DisabledGift width={72} />
        </>
      ) : (
        <>
          <Light style={{ position: 'absolute', top: -8 }} />
          <Gift width={72} />
        </>
      )}
      <StandardButton
        onPress={() => {
          if (isLoaded) {
            show();
            // setTest(true);
          }
        }}
        buttonText={isGiftAlreadyClaimed ? 'Claimed' : 'Claim'}
        style={{ paddingVertical: 8, width: '100%', marginTop: 16 }}
        buttonTextStyle={{ fontSize: isGiftAlreadyClaimed ? 14 : 16 }}
        isDisabled={isGiftAlreadyClaimed}
        isVerifying={!isLoaded}
      />
    </View>
  );
};

export default GiftCard;
