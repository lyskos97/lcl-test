import Range from "react-input-range";
import PropTypes from "prop-types";
import styled from "styled-components";
import "react-input-range/lib/css/index.css";

const Wrapper = styled.div`
  padding: 20px 20px;
`;

const StyledLabel = styled.span`
  display: block;

  font-size: 14px;
  color: grey;
`;

const InputRange = ({ label, ...otherProps }) => {
  return label ? (
    <label>
      <StyledLabel>{label}</StyledLabel>
      <Wrapper>
        <Range color="orange" {...otherProps} />
      </Wrapper>
    </label>
  ) : (
    <Wrapper>
      <Range {...otherProps} />
    </Wrapper>
  );
};

InputRange.propTypes = {
  label: PropTypes.string
};

export default InputRange;
