import React from "react";
import {Modal} from 'react-native-ui-lib';

export default function EditDialog({visible, onDismiss, item, handleUpdate}) {
  return (
    <Modal
      visible={visible}
      onDismiss = {() => onDismiss}
      // panDirection={PanningProvider.Directions.DOWN}
    > 

    </Modal>
  );
}
