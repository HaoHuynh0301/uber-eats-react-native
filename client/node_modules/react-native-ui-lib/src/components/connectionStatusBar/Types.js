import _pt from "prop-types";
import React, { PureComponent } from 'react';
export const DEFAULT_PROPS = {
  label: 'No internet. Check your connection.',
  allowDismiss: false,
  useAbsolutePosition: true
};
/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx
 * @notes: The component requires installing the '@react-native-community/netinfo' native library
 */
// @ts-ignore

class FakeConnectionStatusBarForDocs extends PureComponent {
  static propTypes = {
    /**
       * Text to show as the status
       */
    label: _pt.string,

    /**
       * Handler to get connection change events propagation
       */
    onConnectionChange: _pt.func,

    /**
       * Text to show as the status
       */
    allowDismiss: _pt.bool,

    /**
       * Use absolute position for the component
       */
    useAbsolutePosition: _pt.bool
  };
  // eslint-disable-line
  static displayName = 'ConnectionStatusBar';
  static defaultProps = DEFAULT_PROPS;

  render() {
    return null;
  }

}