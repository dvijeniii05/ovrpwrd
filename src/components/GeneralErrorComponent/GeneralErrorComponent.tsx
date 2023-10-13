import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from './GeneralErrorComponent.styles';

interface Props {
  refetchFunction: () => void;
  isSmallComponent?: boolean;
  style?: ViewStyle;
  isExtraLargeComponent?: boolean;
}

const GeneralErrorComponent = ({
  isSmallComponent = false,
  isExtraLargeComponent = false,
  ...props
}: Props) => {
  return (
    <>
      <View style={[styles.parentContainer, props.style]}>
        {isExtraLargeComponent ? (
          <>
            <Text style={styles.extraLargeText}>Error getting data</Text>
            <TouchableOpacity
              onPress={props.refetchFunction}
              style={styles.largeButton}>
              <Text style={styles.largeButtonText}>RETRY</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.titleText(isSmallComponent)}>
              Error getting data
            </Text>
            <TouchableOpacity
              onPress={props.refetchFunction}
              style={styles.button(isSmallComponent)}>
              <Text style={styles.buttonText(isSmallComponent)}>RETRY</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
};

export default GeneralErrorComponent;
