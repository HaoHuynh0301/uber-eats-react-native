import _pt from "prop-types";
import React, { PureComponent } from 'react';

/**
 * @description: Component that shows a full screen with an activity indicator
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/LoadingScreen.tsx
 */
// @ts-ignore
class FakeLoaderScreenForDocs extends PureComponent {
  static propTypes = {
    /**
         * Color of the loading indicator
         */
    loaderColor: _pt.string,

    /**
         * Color of the loader background (only when passing 'overlay')
         */
    backgroundColor: _pt.string,

    /**
         * loader message
         */
    message: _pt.string,

    /**
         * Show the screen as an absolute overlay
         */
    overlay: _pt.bool
  };
  // eslint-disable-line
  static displayName = 'LoaderScreen';

  render() {
    return null;
  }

}