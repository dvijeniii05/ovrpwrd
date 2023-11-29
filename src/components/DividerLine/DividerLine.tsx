import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './DividerLine.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const DividerLine = (props: Props) => {
  return <View style={[styles.divider, props.style]} />;
};

export default DividerLine;
