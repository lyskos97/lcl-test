import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Row, Col } from "react-flexa";

import Button from "../components/ui/atoms/Button";
import DefaultLayout from "../layouts/default";
import Account from "../components/Account";

const TabPanel = styled.div`
  display: inline-block;
  padding: 0 40px;
  border-radius: 1px;

  box-shadow: 0 1px 1px 0 #ccc;

  background-color: #fff;
`;

const TabLink = styled.a`
  display: inline-block;
  padding: 20px 20px;
  border-bottom: 2px solid ${p => (p.active ? "orange" : "transparent")};

  text-decoration: none;

  color: grey;

  &:hover {
    color: orange;
  }
`;

const Tab = ({ children, tabName, active, ...props }) => {
  return (
    <Link passHref href={`?tab=${tabName}`} {...props}>
      <TabLink active={active}>{children}</TabLink>
    </Link>
  );
};

Tab.propTypes = {
  tabName: PropTypes.string.isRequired,
  active: PropTypes.bool
};

const Card = styled.div`
  padding: 20px 10px;
  border-radius: 1px;

  box-shadow: 0 0 1px 0 #ccc;

  background-color: #fff;
`;

const tabs = [
  {
    name: "my-notices",
    label: "Мои объявления"
  },
  {
    name: "my-deals",
    label: "Мои сделки"
  },
  {
    name: "billing",
    label: "Управление счетом"
  },
  { name: "account", label: "Аккаунт", component: Account },
  {
    name: "security",
    label: "Безопасность"
  }
];

const tabComponentMap = {
  "my-notices": () => <h1>Мои объявления</h1>,
  "my-deals": () => <h1>Мои сделки</h1>,
  billing: () => <h1>Управление счетом</h1>,
  account: Account,
  security: () => <h1>Безопасность</h1>
};

class Settings extends React.Component {
  componentDidMount() {
    const { router } = this.props;

    if (!router.query.tab) {
      router.push({ pathname: router.pathname, query: { tab: "account" } });
    } else if (!tabs.find(tab => tab.name === router.query.tab)) {
      router.push({ pathname: router.pathname, query: { tab: "account" } });
    }
  }

  render() {
    const { router } = this.props;
    const { tab: currentTabName } = router.query;
    const TabContent = tabComponentMap[currentTabName];

    return (
      <DefaultLayout>
        <TabPanel>
          {tabs.map(({ label, name }) => (
            <Tab key={name} tabName={name} active={currentTabName === name}>
              {label}
            </Tab>
          ))}
        </TabPanel>

        <Row>
          <Col xs={12} sm={11} md={10} lg={9}>
            <div style={{ marginTop: 20 }}>
              <Card style={{ padding: 30 }}>
                {TabContent && <TabContent />}
              </Card>
            </div>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default withRouter(Settings);
