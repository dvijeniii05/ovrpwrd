import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from './CardWrapper.styles';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const CardWrapper = (props: Props) => {
  return (
    // <BlurView
    //   style={[styles.container, props.style]}
    //   blurAmount={20}
    //   blurType="dark">
    //   {props.children}
    // </BlurView>
    <>
      {props.onPress ? (
        <TouchableOpacity
          style={[styles.container, props.style]}
          onPress={props.onPress}>
          {props.children}
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, props.style]}>{props.children}</View>
      )}
    </>
  );
};

export default CardWrapper;
