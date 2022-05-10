import React, {memo} from "react";
import { Button } from "react-native-ui-lib";
import styles from "./floatingButton.style";

export default memo(function FloatingButton({onPress}) {
  return (
    <Button
      borderRadius={50}
      style={styles.buttonWrapper}
      size={Button.sizes.xSmall}
      enableShadow={true}
      backgroundColor="black"
      label = {'Checkout'}
      disabled = {false}
      onPress = {onPress}
    />
  );
});
