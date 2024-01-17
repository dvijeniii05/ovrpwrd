import { Linking, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './ForceUpdateScreen.styles';
import StandardButton from '../../components/Buttons/StandardButton/StandardButton';

const ForceUpdateScreen = () => {
  const googleStoreLink = `google`;
  const appleStoreLink = `apple`;
  const handleOnpres = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(appleStoreLink);
    } else {
      Linking.openURL(googleStoreLink);
    }
  };
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Text style={styles.headerText}>Update Available</Text>
      <Text style={styles.descriptionText}>
        Our latest app version introduces new features and resolves critical
        issues. Please update you app to the latest version available in the
        store.
      </Text>
      <StandardButton
        buttonText="Update App"
        onPress={handleOnpres}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

export default ForceUpdateScreen;
