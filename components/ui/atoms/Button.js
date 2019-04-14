import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const secondaryStyles = css`
  background-color: transparent;
  color: #000;

  &:hover {
    background-color: #e6e6e6;
  }

  &:disabled {
    background-color: #e6e6e6;

    /* &:hover {
      background-color: #e6e6e6;
    } */
  }
`;

const outlinedStyles = css`
  background-color: transparent;
  color: orange;
  border: 1px solid orange;

  &:hover {
    background-color: #ffd699;
  }
`;

const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 4px;
  padding: ${props => (props.small ? "10px" : "20px")} 0;
  min-width: ${props => (props.small ? "150px" : "200px")};
  width: ${props => props.fluid && "100%"};

  background-color: #ee9d14;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ff9d14;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  ${props => props.secondary && secondaryStyles}
  ${props => props.outlined && outlinedStyles}
`;

Button.propTypes = {
  secondary: PropTypes.bool,
  fluid: PropTypes.bool,
  small: PropTypes.bool
};

export default Button;
