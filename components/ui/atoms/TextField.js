import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLabel = styled.span`
  display: block;
  margin-bottom: 5px;

  font-size: 14px;
  color: grey;
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 100%;
  border: none;
  color: grey;

  font-size: 14px;
  box-shadow: 0 0 3px 0 #bbb8b8;
  outline: none;

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputMeta = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  font-size: 14px;
  pointer-events: none;
  color: #000;
`;

const TextField = ({ label, valueMeta, ...otherProps }) => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <Wrapper>
        <StyledInput {...otherProps} />
        <InputMeta>{valueMeta}</InputMeta>
      </Wrapper>
    </>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  valueMeta: PropTypes.string
};

export default TextField;
