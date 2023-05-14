import {ViewStyle} from 'react-native/types';

const parentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'black',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const welcomeContainer: ViewStyle = {
  alignItems: 'center',
};

const idContainer: ViewStyle = {
  position: 'absolute',
  height: 20,
  backgroundColor: 'green',
  top: 60,
  right: 0,
};

const refreshButton: ViewStyle = {
  width: 200,
  backgroundColor: 'green',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
};

const resetButton: ViewStyle = {
  ...refreshButton,
  backgroundColor: 'red',
};

const recalContainer: ViewStyle = {
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 100,
};

const recalcButton: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 50,
  backgroundColor: 'blue',
};

export const styles = {
  parentContainer,
  welcomeContainer,
  idContainer,
  refreshButton,
  resetButton,
  recalContainer,
  recalcButton,
};
