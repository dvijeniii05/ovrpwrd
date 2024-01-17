import React from 'react';
import { View, Modal, Text } from 'react-native';
import StandardButton from '../../../components/Buttons/StandardButton/StandardButton';
import { styles } from './InformationModal.style';
import Clipboard from '../../../components/Clipboard/Clipboard';
import LottieView from 'lottie-react-native';
import PerksIcon from '../../../assets/Perks.svg';

interface DefaultProps {
  isVisible: boolean;
  onPress: () => void;
  promoCode?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isDataDriven?: boolean;
  withReward?: boolean;
  rewards?: number;
  onErrorPress?: () => void;
}

type ConditionalProps =
  | {
      isDataDriven: boolean;
      headerText?: string;
      informationText?: string;
      buttonText?: string;
    }
  | {
      isDataDriven?: boolean;
      headerText: string;
      informationText: string;
      buttonText: string;
    };

type Props = DefaultProps & ConditionalProps;

const InformationModal = (props: Props) => {
  const fetchingContent = (
    <LottieView
      source={require('../../../assets/lottie/greenLoader.json')}
      style={{ width: 50, height: 50 }}
      autoPlay
      loop
    />
  );

  const successContent = () => {
    if (props.withReward) {
      return (
        <View style={{ alignItems: 'center' }}>
          <LottieView
            source={require('../../../assets/lottie/confetti.json')}
            style={{
              width: 300,
              height: 200,
              position: 'absolute',
            }}
            autoPlay
            loop
          />
          <Text style={styles.header}>Congradulations!</Text>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Text
              style={
                styles.information
              }>{`You have won ${props.rewards}`}</Text>
            <PerksIcon width={24} height={24} />
          </View>
          <View style={{ marginTop: 40, width: '100%' }}>
            <StandardButton buttonText={'Close'} onPress={props.onPress} />
          </View>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.header}>Reported Successfully</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.information}>
            Thanks for helping our community! Customer support team will take it
            from here.
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <StandardButton buttonText={'Close'} onPress={props.onPress} />
        </View>
      </>
    );
  };

  const errorContent = () => {
    if (props.withReward) {
      return (
        <>
          <Text style={styles.header}>Ooops...</Text>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.information}>
              There was an error processing this request. Please try again or
              contact our Customer support service.
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <StandardButton
              buttonText={'Close'}
              onPress={() => props.onErrorPress?.()}
              style={{ marginTop: 24 }}
            />
          </View>
        </>
      );
    }

    return (
      <>
        <Text style={styles.header}>Ooops...</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.information}>
            There was an error processing this request. Please try again or
            contact our Customer support service.
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <StandardButton
            buttonText={'Close'}
            onPress={props.onPress}
            style={{ marginTop: 24 }}
          />
        </View>
      </>
    );
  };

  const dataDrivenContent = (
    <>
      {props.isLoading ? fetchingContent : null}
      {props.isSuccess ? successContent() : null}
      {props.isError ? errorContent : null}
    </>
  );

  const staticContent = (
    <>
      <Text style={styles.header}>{props.headerText}</Text>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.information}>{props.informationText}</Text>
      </View>
      {props.promoCode ? (
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <Text style={styles.information}>
            You can now use the Code below to activate your purchase on the
            product's website:
          </Text>
          <Clipboard style={{ marginTop: 24 }} promoCode={props.promoCode} />
        </View>
      ) : null}

      <View style={{ marginTop: 40 }}>
        <StandardButton
          buttonText={props.buttonText!}
          onPress={props.onPress}
        />
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
                {props.isDataDriven ? dataDrivenContent : staticContent}
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default InformationModal;
