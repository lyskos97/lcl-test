import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexa";

import Button from "../components/ui/atoms/Button";

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

class Account extends React.Component {
  render() {
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
                  <Col flex="1" sm={12}>
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
              <p>
                2-х факторная аутентификация делает ваши данные более
                защищенными
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Account;
