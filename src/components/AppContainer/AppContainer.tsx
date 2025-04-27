import { Container } from "react-bootstrap";
import { Spacer } from "components";
import { PropsWithChildren } from "react";

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Spacer />
      {children}
    </Container>
  );
};
