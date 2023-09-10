import React from 'react';
import { View, Modal, Text } from 'react-native';
import StandardButton from '../../../components/Buttons/StandardButton/StandardButton';
import { styles } from './InformationModal.style';

interface Props {
  isVisible: boolean;
  onPress: () => void;
  headerText: string;
  informationText: string;
  buttonText: string;
}

const InformationModal = (props: Props) => {
  return (
    <>
      {props.isVisible ? (
        <View style={styles.parentContainer}>
          <Modal visible={props.isVisible} transparent animationType="slide">
            <View style={styles.modalcontainer}>
              <View style={styles.wrapper}>
                <Text style={styles.header}>{props.headerText}</Text>
                <View style={{ marginTop: 40 }}>
                  <Text style={styles.information}>
                    {props.informationText}
                  </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                  <StandardButton
                    buttonText={props.buttonText}
                    onPress={props.onPress}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default InformationModal;
