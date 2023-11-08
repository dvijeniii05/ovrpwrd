import { View, ViewStyle } from 'react-native';
import { styles } from './DividerLine.styles';

interface Props {
  style?: ViewStyle;
}

const DividerLine = (props: Props) => {
  return <View style={[styles.divider, props.style]} />;
};

export default DividerLine;
