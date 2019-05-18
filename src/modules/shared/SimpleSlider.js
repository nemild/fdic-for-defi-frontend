// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

//const createSliderWithTooltip = Slider.createSliderWithTooltip;
//const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

var handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };
  

function SimpleSlider(props) {
    return (
        <div>
        <Slider onChange={props.onChange} min={0} max={100} defaultValue={(props && props.value) || 0} handle={handle} />
      </div>
    );
}

export default SimpleSlider;