import React from 'react';
import styled from 'styled-components';
import UserSettings from './UserSettings';
import { useAppSelector } from '../store/hooks';

const AppContainer = styled.div`
  background: white;
  width: 100vw;
  min-height: 100vh;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 11;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.025);
  width: 100vw;
`;

const LeftMenuPart = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightMenuPart = styled.div`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 160px;
  height: 120px;
  background-image: url('assets/logo.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  margin: 16px;
  z-index: 10;
`;

const App = () => {
  const company = useAppSelector((state) =>
    state.app.companies.find((item) => item.id === state.app.selectedCompany)
  );

  return (
    <AppContainer>
      <Menu>
        <LeftMenuPart />
        <RightMenuPart>
          <UserSettings name="Elon Mask" company={company?.name ?? 'Some Company'} />
        </RightMenuPart>
      </Menu>
      <Logo />
    </AppContainer>
  );
};

export default App;
