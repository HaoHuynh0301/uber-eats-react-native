import _pt from "prop-types";
import React from 'react';
export let WizardStepStates;

(function (WizardStepStates) {
  WizardStepStates["ENABLED"] = "enabled";
  WizardStepStates["DISABLED"] = "disabled";
  WizardStepStates["ERROR"] = "error";
  WizardStepStates["SKIPPED"] = "skipped";
  WizardStepStates["COMPLETED"] = "completed";
})(WizardStepStates || (WizardStepStates = {}));

// @ts-ignore
class WizardTypesForDocs extends React.Component {
  static propTypes = {
    /**
       * The active step's index
       */
    activeIndex: _pt.number.isRequired,

    /**
       * The configuration of the active step (see Wizard.Step.propTypes)
       */
    activeConfig: _pt.shape({
      /**
         * The state of the step (Wizard.States.X)
         */
      state: _pt.oneOf(["enabled", "disabled", "error", "skipped", "completed"]).isRequired,

      /**
         * The label of the item
         */
      label: _pt.string,

      /**
         * Color of the step index (or of the icon, when provided)
         */
      color: _pt.string,

      /**
         * Color of the circle
         */
      circleColor: _pt.string,

      /**
         * The step's circle size (diameter)
         */
      circleSize: _pt.number,

      /**
         * Circle's background color
         */
      circleBackgroundColor: _pt.string,

      /**
         * Whether the step should be enabled
         */
      enabled: _pt.bool,

      /**
         * Extra text to be read in accessibility mode
         */
      accessibilityInfo: _pt.string
    }),

    /**
       * Callback that is called when the active step is changed (i.e. a step was clicked on).
       * The new activeIndex will be the input of the callback.
       */
    onActiveIndexChanged: _pt.func,
    testID: _pt.string
  };
  // eslint-disable-line
  static displayName = 'Wizard';

  render() {
    return null;
  }

} // @ts-ignore


class WizardStepTypesForDocs extends React.Component {
  static propTypes = {
    /**
       * The state of the step (Wizard.States.X)
       */
    state: _pt.oneOf(["enabled", "disabled", "error", "skipped", "completed"]).isRequired,

    /**
       * The label of the item
       */
    label: _pt.string,

    /**
       * Color of the step index (or of the icon, when provided)
       */
    color: _pt.string,

    /**
       * Color of the circle
       */
    circleColor: _pt.string,

    /**
       * The step's circle size (diameter)
       */
    circleSize: _pt.number,

    /**
       * Circle's background color
       */
    circleBackgroundColor: _pt.string,

    /**
       * Whether the step should be enabled
       */
    enabled: _pt.bool,

    /**
       * Extra text to be read in accessibility mode
       */
    accessibilityInfo: _pt.string
  };
  // eslint-disable-line
  static displayName = 'Wizard.Step';

  render() {
    return null;
  }

}