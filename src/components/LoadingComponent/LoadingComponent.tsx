import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { styles } from './LoadingComponent.style';
import LottieView from 'lottie-react-native';

interface Props {
  isLoading: boolean;
}

const LoadingComponent = (props: Props) => {
  return (
    <>
      {props.isLoading && (
        <View style={styles.parentContainer}>
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
