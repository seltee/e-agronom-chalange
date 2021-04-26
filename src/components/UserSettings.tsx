import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import List, { IListElement, IListElementTypes } from './List';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { CompanyDescriptor, selectCompany, toggleMenu } from '../store';
import { onKeySelect } from '../utils';

const UserSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  height: 60px;
  padding: 0 20px;
`;

const NameCompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 2px;
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #8b8b8f;
`;

const IconContainer = styled.div`
  font-size: 24px;
  padding-left: 12px;
`;

const ListContainer = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
`;

interface IUserSettings {
  name: string;
  company: string;
}

const UserSettings = (props: IUserSettings) => {
  const { name, company } = props;

  const isMenuOpened = useAppSelector((state) => state.app.isMenuOpened);
  const selectedCompany = useAppSelector((state) => state.app.selectedCompany);
  const companies = useAppSelector((state) => state.app.companies);

  const dispatch = useAppDispatch();

  const dispatchToggleMenu = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    dispatch(toggleMenu());
  };

  const list: Array<IListElement | IListElementTypes> = [
    {
      type: IListElementTypes.Title,
      name: 'Your companies'
    },
    ...companies.map((item: CompanyDescriptor) => ({
      type: IListElementTypes.Selectable,
      name: item.name,
      isSelected: item.id === selectedCompany,
      onClick: () => dispatch(selectCompany(item.id))
    })),
    IListElementTypes.Border,
    {
      type: IListElementTypes.Button,
      name: 'Get the mobile App',
      icon: 'phone_iphone',
      onClick: dispatchToggleMenu
    },
    {
      type: IListElementTypes.Button,
      name: 'Community',
      icon: 'group',
      onClick: dispatchToggleMenu
    },
    {
      type: IListElementTypes.Button,
      name: 'Knowledge Base',
      icon: 'book',
      onClick: dispatchToggleMenu
    },
    IListElementTypes.Border,
    {
      type: IListElementTypes.Button,
      name: 'Settings',
      icon: 'settings',
      onClick: dispatchToggleMenu
    },
    {
      type: IListElementTypes.Button,
      name: 'Log out',
      icon: 'logout',
      color: '#D33649',
      onClick: dispatchToggleMenu
    }
  ];

  return (
    <UserSettingsContainer>
      <UserInfoContainer
        onPointerDown={dispatchToggleMenu}
        onKeyPress={onKeySelect(dispatchToggleMenu)}
        tabIndex={0}
      >
        <NameCompanyContainer>
          <Name>{name}</Name>
          <Company>{company}</Company>
        </NameCompanyContainer>
        <IconContainer>
          <Icon code="settings" outlined={true} />
        </IconContainer>
      </UserInfoContainer>
      <ListContainer>
        <List open={isMenuOpened} list={list} onSelfClose={dispatchToggleMenu} />
      </ListContainer>
    </UserSettingsContainer>
  );
};

export default UserSettings;
