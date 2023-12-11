import { Modal, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import { styles } from './NoNetworkModal.styles';

const NoNetworkModal = () => {
  const { isConnected } = useNetInfo();

  const content = (
    <Modal visible={!isConnected && isConnected !== null} transparent>
      <View style={styles.modalBackgroundContainer}></View>
      <View style={styles.modalContentContainer(useSafeAreaInsets().bottom)}>
        <Text style={styles.headerText}>No Internet Connection</Text>
        <Text style={styles.descriptionText}>
          We will retry and connect you back automaticaly once you will retrieve
          your Network connection back.
        </Text>
        <LottieView
          source={require('../../../assets/lottie/greenLoader.json')}
          style={{ width: 40, height: 40, marginTop: 40 }}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );

  return content;
};

export default NoNetworkModal;
