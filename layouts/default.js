import Header from "../components/ui/organisms/Header";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px 40px 0;
`;

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default DefaultLayout;
