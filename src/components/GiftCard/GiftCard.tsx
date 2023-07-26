import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Light from '../../assets/dummyAssets/Light.svg';
import { styles } from './GiftCard.styles';

const GiftCard = () => {
  return (
    <View style={styles.parentContainer}>
      <Light style={{ position: 'absolute', top: -8 }} />
      <Image
        source={require('../../assets/dummyAssets/gift2.png')}
        style={{ width: 64, height: 64 }}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Claim reward</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiftCard;
