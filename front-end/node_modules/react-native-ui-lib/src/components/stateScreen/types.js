import _pt from "prop-types";
import React, { PureComponent } from 'react';

/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.tsx
 */
// @ts-ignore
class FakeStateScreenForDocs extends PureComponent {
  static propTypes = {
    /**
       * To to show as the title
       */

    /* TODO: remove after deprecation*/
    title: _pt.string.isRequired,

    /**
       * Text to to show as the subtitle
       */
    subtitle: _pt.oneOfType([_pt.string, _pt.node]),

    /**
       * Text to to show in the "call to action" button
       */
    ctaLabel: _pt.string,

    /**
       * Action handler for "call to action" button
       */
    onCtaPress: _pt.func,

    /**
       * Use to identify the container in tests
       */
    testId: _pt.string,
    testID: _pt.string
  };
  // eslint-disable-line
  static displayName = 'StateScreen';

  render() {
    return null;
  }

}