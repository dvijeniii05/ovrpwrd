import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './LoadingComponent.style';
import LottieView from 'lottie-react-native';

interface Props {
  isLoading: boolean;
  style?: ViewStyle;
}

const LoadingComponent = (props: Props) => {
  return (
    <>
      {props.isLoading && (
        <View style={[styles.parentContainer, props.style]}>
          <LottieView
            source={require('../../assets/lottie/greenLoader.json')}
            style={{ width: 50, height: 50 }}
            autoPlay
            loop
          />
        </View>
      )}
    </>
  );
};

export default LoadingComponent;
