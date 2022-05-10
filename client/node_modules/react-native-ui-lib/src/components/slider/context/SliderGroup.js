import _pt from "prop-types";
import React, { Component } from 'react';
import _ from 'lodash';
import SliderContext from "./SliderContext";
import { Colors } from "../../../style";
import View from "../../view";
export default class SliderGroup extends Component {
  static propTypes = {
    color: _pt.string.isRequired,
    onValueChange: _pt.func.isRequired
  };
  static displayName = 'IGNORE';

  constructor(props) {
    super(props);
    this.state = {
      value: Colors.getHSL(props.color)
    };
  }

  getContextProviderValue() {
    return {
      value: this.state.value,
      setValue: this.setValue
    };
  }

  setValue = value => {
    this.setState({
      value
    });

    _.invoke(this.props, 'onValueChange', Colors.getHexString(value));
  };

  render() {
    return <View {...this.props}>
        <SliderContext.Provider value={this.getContextProviderValue()}>
          {this.props.children}
        </SliderContext.Provider>
      </View>;
  }

}