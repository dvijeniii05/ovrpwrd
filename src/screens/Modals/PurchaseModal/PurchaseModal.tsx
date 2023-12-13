import React from 'react';
import { Modal, View, Text, Linking } from 'react-native';
import { styles } from './PurchaseModal.styles';
import Clipboard from '../../../components/Clipboard/Clipboard';
import StandardButton from '../../../components/Buttons/StandardButton/StandardButton';
import LottieView from 'lottie-react-native';
import { COLORS } from '../../../constans/COLORS';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../../navigation/navigationTypes';
import { StackScreenName } from '../../../../ScreenNames';

interface Props {
  isVisible: boolean;
  onPress: () => void;
  onPurchaseHistoryNavigation?: () => void;
  uniqueId: string;
  productLink: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  data: { promoCode: string } | undefined;
  refetch?: () => void;
  isDataDriven?: boolean;
}

const PurchaseModal = ({ isDataDriven = true, ...props }: Props) => {
  const fetchingContent = (
    <LottieView
      source={require('../../../assets/lottie/greenLoader.json')}
      style={{ width: 50, height: 50 }}
      autoPlay
      loop
    />
  );

  const navigation = useNavigation<StackProps>();

  const successContent = (
    <>
      <Text style={styles.header}>Congratulations!</Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.information}>
          {`Your purchase is successfull. This product is added to your `}
          <Text
            style={{ color: COLORS.green, textDecorationLine: 'underline' }}
            onPress={() => {
              props.onPurchaseHistoryNavigation
                ? props.onPurchaseHistoryNavigation()
                : undefined;
              navigation.navigate(StackScreenName.account);
            }}>
            {`purchase history.`}
          </Text>
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Text style={styles.information}>
          {`You can now use the Code below to activate your purchase on the`}
          {` `}
          <Text
            style={{ color: COLORS.green, textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(props.productLink)}>
            {`product's website:`}
          </Text>
        </Text>
        <Clipboard
          style={{ marginTop: 24 }}
          promoCode={props.data?.promoCode ?? ''}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <StandardButton buttonText={'Close'} onPress={props.onPress} />
      </View>
    </>
  );

  const errorContent = (
    <>
      <Text style={styles.header}>Ooops...</Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.information}>
          There was an error processing your purchase. Please try again or
          contact our Customer support service
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <StandardButton
          buttonText={'Retry'}
          onPress={() => (props.refetch ? props.refetch() : {})}
          style={{ backgroundColor: 'red' }}
        />
        <StandardButton
          buttonText={'Close'}
          onPress={props.onPress}
          style={{ marginTop: 24 }}
        />
      </View>
    </>
  );

  const dataDrivenContent = (
    <>
      {props.isLoading ? fetchingContent : null}
      {props.isSuccess ? successContent : null}
      {props.isError ? errorContent : null}
    </>
  );

  const staticContent = (
    <>
      <Text style={styles.header}>Congratulations!</Text>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.information}>
          {`You can now use the Code below to activate your purchase on the`}
          {` `}
          <Text
            style={{ color: COLORS.green, textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(props.productLink)}>
            {`product's website:`}
          </Text>
        </Text>
        <Clipboard
          style={{ marginTop: 24 }}
          promoCode={props.data?.promoCode ?? ''}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <StandardButton buttonText={'Close'} onPress={props.onPress} />
      </View>
    </>
  );

  return (
    <>
      {props.isVisible ? (
        <View style={styles.parentContainer}>
          <Modal visible={props.isVisible} transparent animationType="slide">
            <View style={styles.modalcontainer}>
              <View style={styles.wrapper}>
                {isDataDriven ? dataDrivenContent : staticContent}
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default PurchaseModal;
