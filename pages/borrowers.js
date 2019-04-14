import styled from "styled-components";
import Router from "next/router";
import { Row, Col } from "react-flexa";

import DefaultLayout from "../layouts/default";
import Select from "../components/ui/atoms/Select";
import TextField from "../components/ui/atoms/TextField";
import Checkbox from "../components/ui/atoms/Checkbox";
import InputRange from "../components/ui/atoms/InputRange";
import Button from "../components/ui/atoms/Button";

const Heading = styled.h1`
  margin: 0;
  font-size: 28px;
`;

const Subheading = styled.h2`
  margin: 0;
  font-size: 18px;

  font-weight: 600;
`;

const Card = styled.div`
  padding: 20px 10px;
  border-radius: 1px;

  box-shadow: 0 0 2px 1px #bbb8b8;

  background-color: #fff;
`;

const InputGroupWrapper = styled.div`
  padding: 15px 5px 0;
`;

const InputWrapper = styled.div`
  margin: 10px 0;
`;

class Borrowers extends React.Component {
  currencies = [
    { value: "RUB", text: "Российский рубль (RUB)" },
    { value: "USD", text: "Американский доллар (USD)" },
    { value: "KZT", text: "Казахстанский тенге (KZT)" }
  ];
  paymentFrequencyTypes = [
    { value: "EVERY_WEEK", text: "Каждую неделю" },
    { value: "EVERY_MONTH", text: "Каждый месяц" },
    { value: "UPON_DEAL_CLOSING", text: "В конце срока" }
  ];
  defaultFormValues = {
    loanCurrency: "RUB",
    loanAmountFrom: "",
    loanAmountTo: "",
    loanInterestFrom: 0,
    loanInterestTo: 100,

    pawnCurrency: "RUB",
    pawnAmountFrom: "",
    pawnAmountTo: "",
    pawnDiscountFrom: 0,
    pawnDiscountTo: 100,

    dealTermFrom: 0,
    dealTermTo: 200,
    paymentFrequency: []
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.defaultFormValues
    };
  }

  componentDidMount() {
    // prefill form state with query params
    Object.keys(Router.query).forEach(name => {
      const val = Router.query[name];
      const isNumber = !Number.isNaN(parseInt(val));

      if (isNumber) {
        this.setState({ [name]: parseInt(val) });
      } else {
        if (Array.isArray(this.state[name]) && !Array.isArray(val)) {
          this.setState({ [name]: [val] });
        } else {
          this.setState({ [name]: val });
        }
      }
    });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleCheck = e => {
    const { name, value } = e.target;

    this.setState(prevState => {
      if (Array.isArray(prevState[name])) {
        if (prevState[name].includes(value)) {
          return {
            [name]: prevState[name].filter(item => item !== value)
          };
        } else {
          return {
            [name]: [...prevState[name], value]
          };
        }
      }
    });
  };

  resetForm = () => {
    this.setState({
      ...this.defaultFormValues
    });
  };

  formatTermRangeLabel = (value, type) => {
    if (type === "min") {
      return `от ${value} дн`;
    } else if (type === "max") {
      return `до ${value} дн`;
    }

    return `${value} дн`;
  };

  formatPercentageRangeLabel = value => {
    return `${value}%`;
  };

  applyFilters = () => {
    let params = {};

    Object.keys(this.state).forEach(field => {
      const isEmpty = !this.state[field] && this.state[field] !== 0;

      if (!isEmpty) {
        params[field] = this.state[field];
      }
    });

    const newRoute = {
      pathname: Router.pathname,
      query: params
    };

    Router.push(newRoute, newRoute, { shallow: true });
  };

  resetFilters = () => {
    const newRoute = {
      pathname: Router.pathname
    };

    Router.push(newRoute, newRoute, { shallow: true });
    this.resetForm();
  };

  render() {
    const {
      loanAmountFrom,
      loanAmountTo,
      loanCurrency,
      loanInterestFrom,
      loanInterestTo,
      pawnCurrency,
      pawnAmountFrom,
      pawnAmountTo,
      pawnDiscountFrom,
      pawnDiscountTo,
      paymentFrequency,
      dealTermFrom,
      dealTermTo
    } = this.state;
    const stateString = JSON.stringify(this.state, null, 2);

    return (
      <DefaultLayout>
        <Heading>Найти объявления заемщиков</Heading>

        <Col style={{ marginTop: 20 }}>
          <Row>
            <Col xs={9}>
              <Card>
                <Row>
                  <Col xs={4}>
                    <Subheading>О кредите</Subheading>

                    <InputGroupWrapper>
                      <InputWrapper>
                        <Select
                          name="loanCurrency"
                          value={loanCurrency}
                          label="Валюта кредита"
                          onChange={this.handleChange}
                        >
                          {this.currencies.map(({ text, value }) => (
                            <option value={value} key={value}>
                              {text}
                            </option>
                          ))}
                        </Select>
                      </InputWrapper>
                      <InputWrapper>
                        <TextField
                          name="loanAmountFrom"
                          label="Сумма кредита от"
                          value={loanAmountFrom}
                          type="number"
                          valueMeta={loanCurrency}
                          onChange={this.handleChange}
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <TextField
                          name="loanAmountTo"
                          label="До"
                          value={loanAmountTo}
                          type="number"
                          valueMeta={loanCurrency}
                          onChange={this.handleChange}
                        />
                      </InputWrapper>

                      <InputWrapper>
                        <InputRange
                          label="Ставка от-до %"
                          minValue={0}
                          maxValue={100}
                          formatLabel={this.formatPercentageRangeLabel}
                          value={{ min: loanInterestFrom, max: loanInterestTo }}
                          onChange={({ max, min }) =>
                            this.setState({
                              loanInterestFrom: min,
                              loanInterestTo: max
                            })
                          }
                        />
                      </InputWrapper>
                    </InputGroupWrapper>
                  </Col>
                  <Col xs={4}>
                    <Subheading>О залоге</Subheading>
                    <InputGroupWrapper>
                      <InputWrapper>
                        <Select
                          name="pawnCurrency"
                          value={pawnCurrency}
                          label="Валюта кредита"
                          onChange={this.handleChange}
                        >
                          {this.currencies.map(({ text, value }) => (
                            <option value={value} key={value}>
                              {text}
                            </option>
                          ))}
                        </Select>
                      </InputWrapper>
                      <InputWrapper>
                        <TextField
                          name="pawnAmountFrom"
                          label="Сумма залога от"
                          type="number"
                          value={pawnAmountFrom}
                          valueMeta={pawnCurrency}
                          onChange={this.handleChange}
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <TextField
                          name="pawnAmountTo"
                          label="До"
                          type="number"
                          value={pawnAmountTo}
                          valueMeta={pawnCurrency}
                          onChange={this.handleChange}
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <InputRange
                          label="Дисконт залога от-до %"
                          minValue={0}
                          maxValue={100}
                          formatLabel={this.formatPercentageRangeLabel}
                          value={{ min: pawnDiscountFrom, max: pawnDiscountTo }}
                          onChange={({ max, min }) =>
                            this.setState({
                              pawnDiscountFrom: min,
                              pawnDiscountTo: max
                            })
                          }
                        />
                      </InputWrapper>
                    </InputGroupWrapper>
                  </Col>
                  <Col xs={4}>
                    <Subheading>Сроки и выплаты</Subheading>

                    <InputGroupWrapper>
                      <InputWrapper>
                        <InputRange
                          label="Дисконт залога от-до %"
                          minValue={0}
                          maxValue={200}
                          formatLabel={this.formatTermRangeLabel}
                          value={{ min: dealTermFrom, max: dealTermTo }}
                          onChange={({ max, min }) =>
                            this.setState({
                              dealTermFrom: min,
                              dealTermTo: max
                            })
                          }
                        />
                      </InputWrapper>
                      {this.paymentFrequencyTypes.map(({ text, value }) => (
                        <div key={value} style={{ margin: "5px 0" }}>
                          <Checkbox
                            name="paymentFrequency"
                            label={text}
                            value={value}
                            checked={
                              paymentFrequency &&
                              paymentFrequency.includes(value)
                            }
                            onChange={this.handleCheck}
                          />
                        </div>
                      ))}
                    </InputGroupWrapper>
                  </Col>
                </Row>
                <Row>
                  <div style={{ padding: 20 }}>
                    <Button
                      style={{ marginRight: 20 }}
                      onClick={this.applyFilters}
                    >
                      Найти
                    </Button>
                    <Button secondary onClick={this.resetFilters}>
                      Сбросить фильтры
                    </Button>
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <code>{stateString}</code>
              </Card>
            </Col>
          </Row>
        </Col>
      </DefaultLayout>
    );
  }
}

export default Borrowers;
