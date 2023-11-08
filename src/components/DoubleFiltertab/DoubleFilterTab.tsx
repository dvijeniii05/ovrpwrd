import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { styles } from './DoubleFilterTab.styles';
import Lock from '../../assets/icons/lock.svg';

interface Props {
  leftTabAction: () => void;
  rightTabAction: () => void;
  leftTabText: string;
  rightTabText: string;
  isLeftTabDisabled?: boolean;
  isRightTabDisabled?: boolean;
}

const DoubleFilterTab = (props: Props) => {
  const [isLeftTabActive, setIsLeftTabActive] = useState<boolean>(true);

  const onLeftPress = () => {
    setIsLeftTabActive(true);
    props.leftTabAction();
  };

  const onRightPress = () => {
    setIsLeftTabActive(false);
    props.rightTabAction();
  };

  return (
    <View
      style={styles.tabsContainer(
        props.isLeftTabDisabled || props.isRightTabDisabled,
      )}>
      <Pressable
        style={styles.tabsButton(isLeftTabActive, props.isLeftTabDisabled)}
        onPress={onLeftPress}
        disabled={props.isLeftTabDisabled}>
        <Text style={styles.tabsButtonText}>{props.leftTabText}</Text>
        {props.isLeftTabDisabled && (
          <Lock style={{ left: 8 }} width={16} height={16} fill={'white'} />
        )}
      </Pressable>
      <Pressable
        style={styles.tabsButton(!isLeftTabActive, props.isRightTabDisabled)}
        onPress={onRightPress}
        disabled={props.isRightTabDisabled}>
        <Text style={styles.tabsButtonText}>{props.rightTabText}</Text>
        {props.isRightTabDisabled && (
          <Lock style={{ left: 8 }} width={16} height={16} fill={'white'} />
        )}
      </Pressable>
    </View>
  );
};

export default DoubleFilterTab;
