import React from 'react';
import { View } from 'react-native';
import Light from '../../assets/Light.svg';
import Gift from '../../assets/Gift.svg';
import DisabledLight from '../../assets/Disabled-light.svg';
import DisabledGift from '../../assets/Disabled-gift.svg';
import { styles } from './GiftCard.styles';
import StandardButton from '../Buttons/StandardButton/StandardButton';

interface Props {
  isDisabled?: boolean;
}

const GiftCard = (props: Props) => {
  return (
    <View style={styles.parentContainer}>
      {props.isDisabled ? (
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
        onPress={() => {}}
        buttonText="Claim"
        style={{ paddingVertical: 8, width: '100%', marginTop: 16 }}
        buttonTextStyle={{ fontSize: 16 }}
        isDisabled={props.isDisabled}
      />
    </View>
  );
};

export default GiftCard;
