import React from 'react';
import PropTypes from 'prop-types';

class CustomInput extends React.Component {
  render() {
    return (
      <input
        onChange={(event) => this.props.onChange(event.target.value)}
        value={this.props.value}
      />
    );
  }
}

CustomInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default CustomInput;
