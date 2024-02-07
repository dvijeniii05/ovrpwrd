import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { devBaseUrl, prodBaseUrl } from '../constans/urls';
import { mainStore } from '../redux/store/mainStore';
import { updateAppVersionCheck } from '../redux/slices/userDataSlice';

type SemiVersion = {
  major: number;
  minor: number;
};

// This logic has to be checked in production OR changed to a fully custom logic
export const vershionCheck = async () => {
  const appVersion = DeviceInfo.getVersion();
  console.log('APP+V', appVersion);

  try {
    const requiredVersion = await axios.get(`${devBaseUrl}/appVersionCheck`);
    console.log('CURRENT VERSION: ' + appVersion);
    console.log('REQUIRED VERSION: ' + requiredVersion.data.appVersion);

    console.log(isUpdateRequired(appVersion, requiredVersion.data.appVersion));
    const isAppUpdateRequired = isUpdateRequired(
      appVersion,
      requiredVersion.data.appVersion,
    );
    mainStore.dispatch(updateAppVersionCheck(isAppUpdateRequired));
    // if (updateNeeded.isNeeded) {
    //   Linking.openURL(updateNeeded.storeUrl);
    // }
  } catch {
    console.log('ERROR: app version check failure');
  }
};

export const convertToBaseTenInt = (stringOfInt: string) => {
  return parseInt(stringOfInt, 10);
};

export const isUpdateRequired = (
  currentVersion: string,
  versionRequired: string,
) => {
  const currentVersionParsed = convertToVersion(currentVersion);
  const versionRequiredPersed = convertToVersion(versionRequired);

  const isMajorOlder = currentVersionParsed.major < versionRequiredPersed.major;

  const isMinorOlder =
    currentVersionParsed.major === versionRequiredPersed.major &&
    currentVersionParsed.minor < versionRequiredPersed.minor;

  return isMajorOlder || isMinorOlder;
};

const convertToVersion = (version: string): SemiVersion => {
  const versions = version
    .split('.', 2)
    .map(versionPart => convertToBaseTenInt(versionPart));
  return {
    major: versions[0],
    minor: versions[1],
  };
};
