import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-color: rgba(50, 50, 50, 0.3);
`;

const Content = styled.div`
  position: relative;

  max-width: 80%;
`;

class Modal extends React.Component {
  el = null;
  bodyEl = null;

  componentDidMount() {
    this.el = document.getElementById("modal-root");
    this.bodyEl = document.querySelector("body");

    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.bodyEl.style.overflow = "hidden";
    } else if (prevProps.show && !this.props.show) {
      this.bodyEl.style.overflow = "visible";
    }
  }

  render() {
    const { show, children } = this.props;

    return (
      this.el &&
      show &&
      ReactDOM.createPortal(
        <Container>
          <Overlay onClick={this.props.onClose} />
          <Content>{children}</Content>
        </Container>,
        this.el
      )
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
