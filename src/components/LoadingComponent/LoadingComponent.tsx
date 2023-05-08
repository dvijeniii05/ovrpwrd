import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {styles} from './LoadingComponent.style';

interface Props {
  loadingText: string;
  isLoading?: boolean;
}

const LoadingComponent = (props: Props) => {
  return (
    <>
      {props.isLoading && (
        <View style={styles.parentContainer}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size={'large'} color="green" />
            <Text style={styles.textContainer}>{props.loadingText}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default LoadingComponent;
