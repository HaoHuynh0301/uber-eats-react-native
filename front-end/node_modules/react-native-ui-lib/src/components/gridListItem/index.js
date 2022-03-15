import _pt from "prop-types";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import * as Modifiers from "../../commons/modifiers";
import { Colors, Spacings, Typography } from "../../style";
import View from "../view";
import Text from "../text";
import TouchableOpacity from "../touchableOpacity";
import Image from "../image";

/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridListItem extends Component {
  static propTypes = {
    /**
       * Custom GridListItem to be rendered in the GridView
       */
    renderCustomItem: _pt.func,

    /**
       * The item size
       */
    itemSize: _pt.oneOfType([_pt.number, _pt.shape({
      width: _pt.number,
      height: _pt.number
    })]),

    /**
       * Title content text
       */
    title: _pt.oneOfType([_pt.string, _pt.element]),

    /**
       * Title content typography
       */
    titleTypography: _pt.string,

    /**
       * Title content color
       */
    titleColor: _pt.string,

    /**
       * Title content number of lines
       */
    titleLines: _pt.number,

    /**
       * Subtitle content text
       */
    subtitle: _pt.oneOfType([_pt.string, _pt.element]),

    /**
       * Subtitle content typography
       */
    subtitleTypography: _pt.string,

    /**
       * Subtitle content color
       */
    subtitleColor: _pt.string,

    /**
       * Subtitle content number of lines
       */
    subtitleLines: _pt.number,

    /**
       * Description content text
       */
    description: _pt.oneOfType([_pt.string, _pt.element]),

    /**
       * Description content typography
       */
    descriptionTypography: _pt.string,

    /**
       * Description content color
       */
    descriptionColor: _pt.string,

    /**
       * Description content number of lines
       */
    descriptionLines: _pt.number,

    /**
       * Renders the title, subtitle and description inside the item
       */
    overlayText: _pt.bool,

    /**
       * Should content be align to start (default is center)
       */
    alignToStart: _pt.bool,

    /**
       * Renders an overlay on top of the image
       */
    renderOverlay: _pt.func,

    /**
       * Test ID for component
       */
    testID: _pt.string
  };
  static displayName = 'GridListItem';
  static defaultProps = {
    itemSize: 48
  };
  state = {};
  onItemPress = () => {
    this.props.onPress?.(this.props);
  };

  getItemSizeObj() {
    const {
      itemSize
    } = this.props;

    if (_.isPlainObject(itemSize)) {
      return itemSize;
    }

    return {
      width: itemSize,
      height: itemSize
    };
  }

  renderContent({
    text,
    typography,
    color,
    numberOfLines = 1,
    style,
    testID
  }) {
    const {
      alignToStart
    } = this.props;

    if (text) {
      return <Text testID={testID} // @ts-ignore
      style={[style, Typography[typography], color && {
        color
      }, alignToStart && styles.contentAlignedToStart]} numberOfLines={numberOfLines}>
          {text}
        </Text>;
    }
  }

  render() {
    const {
      testID,
      imageProps,
      alignToStart,
      containerStyle,
      containerProps,
      renderCustomItem,
      children,
      title,
      titleTypography,
      titleColor,
      titleLines,
      overlayText,
      overlayTextContainerStyle,
      subtitle,
      subtitleTypography,
      subtitleColor,
      subtitleLines,
      description,
      descriptionTypography,
      descriptionColor,
      descriptionLines,
      onPress,
      renderOverlay
    } = this.props;

    const hasPress = _.isFunction(onPress);

    const hasOverlay = _.isFunction(renderOverlay);

    const Container = hasPress ? TouchableOpacity : View;
    const imageStyle = { ...this.getItemSizeObj()
    };

    const width = _.get(imageStyle, 'width');

    const TextContainer = overlayText ? View : React.Fragment;
    const textContainerStyle = overlayText ? {
      style: [styles.overlayText, overlayTextContainerStyle]
    } : null;
    const imageBorderRadius = imageProps?.borderRadius;
    return <Container style={[styles.container, alignToStart && styles.containerAlignedToStart, {
      width
    }, containerStyle]} {...containerProps} onPress={hasPress ? this.onItemPress : undefined} accessible={renderCustomItem ? true : undefined} {...Modifiers.extractAccessibilityProps(this.props)}>
        {imageProps && <View style={[{
        borderRadius: imageBorderRadius
      }, imageStyle]}>
            <Image {...imageProps} style={[imageStyle, imageProps?.style]} />
            {children}
          </View>}
        {!_.isNil(renderCustomItem) && <View style={{
        width
      }}>{renderCustomItem()}</View>}
        {hasOverlay && <View style={[styles.overlay, this.getItemSizeObj()]}>{renderOverlay?.()}</View>}
        <TextContainer {...textContainerStyle}>
          {this.renderContent({
          testID: `${testID}.title`,
          text: title,
          typography: titleTypography,
          color: titleColor,
          numberOfLines: titleLines,
          style: styles.title
        })}
          {this.renderContent({
          testID: `${testID}.subtitle`,
          text: subtitle,
          typography: subtitleTypography,
          color: subtitleColor,
          numberOfLines: subtitleLines,
          style: styles.subtitle
        })}
          {this.renderContent({
          testID: `${testID}.description`,
          text: description,
          typography: descriptionTypography,
          color: descriptionColor,
          numberOfLines: descriptionLines,
          style: styles.description
        })}
        </TextContainer>
      </Container>;
  }

}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  containerAlignedToStart: {
    alignItems: 'flex-start'
  },
  title: {
    marginTop: Spacings.s1,
    textAlign: 'center',
    ...Typography.bodySmallBold
  },
  subtitle: {
    textAlign: 'center',
    ...Typography.subtext
  },
  description: {
    textAlign: 'center',
    ...Typography.subtext,
    color: Colors.grey30
  },
  contentAlignedToStart: {
    textAlign: 'left'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10
  }
});
export default GridListItem;