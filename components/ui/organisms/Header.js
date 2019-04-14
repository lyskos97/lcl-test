import styled from "styled-components";
import { Row, Col } from "react-flexa";
import Link from "next/link";
import { withRouter } from "next/router";

const StyledHeader = styled.header`
  background-color: black;
  color: grey;

  padding: 0 40px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;

  cursor: pointer;

  &:hover {
    color: orange;
  }
`;

const Nav = styled.nav`
  height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 45px;
  height: 45px;

  > img {
    object-fit: fill;
    height: 100%;
    width: 100%;
    border-radius: 100%;
  }
`;

const NavLink = styled.a`
  display: inline-block;
  padding: 20px 20px;
  border-bottom: 2px solid ${p => (p.active ? "orange" : "transparent")};

  text-decoration: none;
  color: ${p => (p.active ? "orange" : "grey")};

  &:hover {
    color: orange;
  }

  &:visited {
    color: 2px solid ${p => (p.active ? "orange" : "transparent")};
  }
`;

const routes = [
  { path: "/creditors", label: "Кредиторы" },
  { path: "/borrowers", label: "Заемщики" },
  { path: "/new-notice", label: "Разместить объявления" },
  { path: "/help", label: "Справка" }
];

const Header = ({ router }) => {
  return (
    <StyledHeader>
      <Row gutter={0}>
        <Col xs={2}>
          <Logo>
            <span>LCL</span>
          </Logo>
        </Col>
        <Col xs={8}>
          <Nav>
            {routes.map(({ path, label }) => (
              <Link key={path} href={path} passHref>
                <NavLink active={path === router.route}>{label}</NavLink>
              </Link>
            ))}
          </Nav>
        </Col>
        <Col xs={2}>
          <Row
            justifyContent="flex-end"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Col>
              <Link href="/settings">
                <a>
                  <ImageWrapper>
                    <img
                      src="https://via.placeholder.com/200x200"
                      alt="User avatar"
                    />
                  </ImageWrapper>
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default withRouter(Header);
