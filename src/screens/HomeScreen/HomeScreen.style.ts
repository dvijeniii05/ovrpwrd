import {ViewStyle} from 'react-native/types';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
};

const welcomeContainer: ViewStyle = {
  height: 100,
  alignItems: 'center',
};

const idContainer: ViewStyle = {
  position: 'absolute',
  height: 20,
  backgroundColor: 'green',
  top: 100,
  right: 20,
};

export const styles = {
  parentContainer,
  welcomeContainer,
  idContainer,
};
