import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexa";

import Button from "../components/ui/atoms/Button";
import TextField from "../components/ui/atoms/TextField";
import Modal from "../components/Modal";

const AvatarWrapper = styled.div`
  max-width: 150px;
  max-height: 150px;

  > img {
    object-fit: fill;
    height: auto;
    width: 100%;
    border-radius: 100%;
  }
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 5px;

  font-size: 22px;
`;

const StatusText = styled.span`
  display: block;
  font-size: 14px;
  color: grey;
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  background-color: #f1f1f1;
  color: grey;
`;

const Subtitle = styled.h3`
  font-size: 18px;
`;

const ModalWrapper = styled.div`
  padding: 40px;
  border-radius: 4px;

  background-color: #fff;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

class Account extends React.Component {
  state = {
    twoStepAuthEnabled: false,
    showTwoStepAuthModal: false
  };

  showModal = () => {
    this.setState({
      showTwoStepAuthModal: true
    });
  };

  hideModal = () => {
    this.setState({
      showTwoStepAuthModal: false
    });
  };

  enableTwoStepAuth = e => {
    e.preventDefault();

    this.setState({
      twoStepAuthEnabled: true,
      showTwoStepAuthModal: false
    });
  };

  disableTwoStepAuth = () => {
    this.setState({ twoStepAuthEnabled: false });
  };

  render() {
    const { showTwoStepAuthModal, twoStepAuthEnabled } = this.state;

    return (
      <Row>
        <Col xs={12} md={3}>
          <AvatarWrapper>
            <img src="https://via.placeholder.com/500x500" alt="User avatar" />
          </AvatarWrapper>
        </Col>
        <Col xs={12} md={9}>
          <Row>
            <Col xs={12}>
              <div>
                <Row>
                  <Col flex="1">
                    <Title>Ахан Кусаинов</Title>
                    <StatusText>Ожидание верификации</StatusText>

                    <p>akhankussainov@gmail.com</p>
                    <p>+7 (775) 987-65-43</p>
                    <p>Республика Казахстан</p>
                  </Col>
                  <Col>
                    <Button small outlined>
                      Редактировать
                    </Button>
                  </Col>
                </Row>
              </div>
              <Divider />
            </Col>
            <Col xs={12}>
              <Subtitle>Пароль</Subtitle>
              <Button>Изменить пароль</Button>
              <Divider />
            </Col>
            <Col xs={12}>
              <Subtitle>2-х факторная аутентификация</Subtitle>

              <Modal show={showTwoStepAuthModal} onClose={this.hideModal}>
                <ModalWrapper>
                  <Title>Включить 2-х факторную аутентификацию</Title>
                  <Button
                    small
                    secondary
                    style={{ top: 20, right: 20, position: "absolute" }}
                    onClick={this.hideModal}
                  >
                    Закрыть
                  </Button>

                  <div>
                    <p>
                      <BoldText>Шаг 1</BoldText> - Загрузите приложение для 2-х
                      факторной аутентификации
                    </p>
                    <p>
                      <BoldText>Шаг 2</BoldText> - Отсканируйте QR код или
                      введите вручную секретный код ниже через приложение
                    </p>
                  </div>

                  <Row>
                    <Col>
                      <img src="/static/qr_code.png" alt="QR Code" />
                    </Col>
                    <Col>
                      <StatusText>Секретный код</StatusText>
                      <span>XXXX XXXX XXXX XXXX</span>
                    </Col>
                  </Row>

                  <div>
                    <p>
                      <BoldText>Шаг 3</BoldText> - Введите код подтверждения из
                      приложения аутентификатора
                    </p>
                  </div>

                  <form
                    onSubmit={() => this.setState({ twoStepAuthEnabled: true })}
                  >
                    <Row>
                      <TextField placeholder="Введите код" />
                    </Row>
                    <br />
                    <Row>
                      <Button type="submit" onClick={this.enableTwoStepAuth}>
                        Подтвердить
                      </Button>
                    </Row>
                  </form>
                </ModalWrapper>
              </Modal>

              <div>
                {twoStepAuthEnabled ? (
                  <Button
                    type="button"
                    small
                    outlined
                    onClick={this.disableTwoStepAuth}
                  >
                    Выключить
                  </Button>
                ) : (
                  <Button type="button" small onClick={this.showModal}>
                    Включить
                  </Button>
                )}
                <p>
                  2-х факторная аутентификация делает ваши данные более
                  защищенными
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Account;
