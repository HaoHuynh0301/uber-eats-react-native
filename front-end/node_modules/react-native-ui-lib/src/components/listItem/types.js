import _pt from "prop-types";
import React, { PureComponent } from 'react';

/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore
class FakeListItemForDocs extends PureComponent {
  static propTypes = {
    /**
       * action for when pressing the item
       */
    onPress: _pt.func,

    /**
       * action for when long pressing the item
       */
    onLongPress: _pt.func,

    /**
       * The container element to wrap the ListItem
       */
    containerElement: _pt.elementType,

    /**
       * The inner element pressed backgroundColor
       */
    underlayColor: _pt.string,
    testID: _pt.string
  };
  // eslint-disable-line
  static displayName = 'ListItem';

  render() {
    return null;
  }

}
/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
// @ts-ignore


class FakeListItemPartForDocs extends PureComponent {
  static propTypes = {
    /**
       * this part content will be aligned to left
       */
    left: _pt.bool,

    /**
       * this part content will be aligned to spreaded
       */
    middle: _pt.bool,

    /**
       * this part content will be aligned to right
       */
    right: _pt.bool,

    /**
       * this part content direction will be row (default)
       */
    row: _pt.bool,

    /**
       * this part content direction will be column
       */
    column: _pt.bool
  };
  // eslint-disable-line
  static displayName = 'ListItemPart';

  render() {
    return null;
  }

}