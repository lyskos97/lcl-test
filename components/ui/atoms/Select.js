import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLabel = styled.span`
  display: block;
  margin-bottom: 5px;

  font-size: 14px;
  color: grey;
`;

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;

  font-size: 14px;
  outline-color: orange;
  box-shadow: 0 0 3px 0 #bbb8b8;
  cursor: pointer;
`;

const Select = ({ children, label, ...otherProps }) => {
  return label ? (
    <label style={{ width: "100%" }}>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect {...otherProps}>{children}</StyledSelect>
    </label>
  ) : (
    <StyledSelect {...otherProps}>{children}</StyledSelect>
  );
};

Select.propTypes = {
  label: PropTypes.string
};

export default Select;
