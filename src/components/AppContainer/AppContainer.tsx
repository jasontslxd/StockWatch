import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-light" style={{ minHeight: '80vh' }}>
      <Container>{children}</Container>
    </div>
  );
};
