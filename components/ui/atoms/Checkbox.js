import styled from "styled-components";
import PropTypes from "prop-types";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  height: 1px;
  margin: -1px;
  border: 0;
  overflow: hidden;
  padding: 0;
  width: 1px;

  clippath: inset(50%);
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid orange;
  background: ${props => (props.checked ? "salmon" : "#fff")};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  background-color: ${props => (props.checked ? "orange" : "none")};
  background-image: url("/static/icons/checkmark.svg");
`;

const StyledLabel = styled.span`
  display: inline-block;
  margin-left: 8px;

  font-size: 14px;
`;

const Checkbox = ({ label, checked, ...props }) => {
  return label ? (
    <label style={{ cursor: "pointer" }}>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked} />
      </CheckboxContainer>
      <StyledLabel>{label}</StyledLabel>
    </label>
  ) : (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} />
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string
};

export default Checkbox;
