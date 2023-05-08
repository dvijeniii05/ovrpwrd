import {ViewStyle} from 'react-native/types';
import {WIDTH} from '../../utils/dimension';

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
  right: 20,
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
export const styles = {
  parentContainer,
  welcomeContainer,
  idContainer,
  refreshButton,
  resetButton,
};
