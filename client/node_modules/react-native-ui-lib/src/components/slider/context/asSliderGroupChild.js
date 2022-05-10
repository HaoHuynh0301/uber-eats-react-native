import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import SliderContext from "./SliderContext";

const getConsumer = WrappedComponent => class SliderContextConsumer extends Component {
  render() {
    return <SliderContext.Consumer>
          {context => <WrappedComponent ref={r => this.contentRef = r} sliderContext={context} {...this.props} />}
        </SliderContext.Consumer>;
  }

};

function asSliderGroupChild(WrappedComponent) {
  const SliderContextConsumer = getConsumer(WrappedComponent);
  hoistNonReactStatic(SliderContextConsumer, WrappedComponent);
  return SliderContextConsumer;
}

export default asSliderGroupChild;