import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'emotion';

const background = css`{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: #00000088;
}`;

const clip = keyframes`
  0% {transform: rotate(0deg) scale(1)}
  50% {transform: rotate(180deg) scale(0.8)}
  100% {transform: rotate(360deg) scale(1)}
`;

const loader = css`{
	position: absolute;
  top: 50%;
  left: 50%;
  'msTransform': 'translateX(-50%) translateY(-50%)',
  'WebkitTransform': 'translate(-50%,-50%)',
  transform: translate(-50%,-50%);
  background: transparent !important;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 5px solid;
  border-color: #2E86C1;
  border-bottom-color: transparent;
  display: inline-block;
  animation: ${clip} 0.75s 0s infinite linear;
  animation-fill-mode: both;
}`;

class Loader extends React.Component {
  render() {
    return this.props.loading ? (
    	<div className={background}>
    		<div className={loader} />
    	</div>
    ) : null;
  }
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
