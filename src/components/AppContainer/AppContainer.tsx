import { PropsWithChildren } from "react";
import { Container } from "react-bootstrap";

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-light vh-100">
      <Container>
        {children}
      </Container>
    </div>
  );
};
