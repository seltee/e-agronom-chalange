import React, { MouseEventHandler, useRef } from 'react';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import { onKeySelect } from '../utils';
import { useOutsideClick } from './hooks';

const ListContainer = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);
  width: 280px;
  right: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 36px;
  color: #717175;
  font-size: 14px;
  line-height: 36px;
  font-weight: 700px;
  padding: 0 16px;
`;

interface ISelectableContainer {
  isSelected: boolean;
}

const SelectableContainer = styled.a`
  height: 44px;
  line-height: 44px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  color: #333333;
  padding: 0 16px;
  position: relative;

  :hover,
  :focus {
    background-color: F7F7F9;
  }

  ${(props: ISelectableContainer) =>
    props.isSelected &&
    css`
      background-color: rgba(55, 164, 71, 0.1);
      color: #157123;

      :hover,
      :focus {
        background-color: rgba(55, 164, 71, 0.2);
      }
    `}
`;

interface IButtonContainer {
  color?: string;
}

const ButtonCotainer = styled.a`
  height: 42px;
  line-height: 42px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  color: #333333;
  padding: 0 16px;

  :hover,
  :focus {
    background-color: F7F7F9;
  }

  :active {
    background-color: #eeeef2;
  }

  ${(props: IButtonContainer) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

const Border = styled.div`
  height: 1px;
  width: 280px;
  background-color: #dcdce0;
`;

const IconContainer = styled.div`
  font-size: 20px;
  padding-right: 8px;
`;

const NameContainer = styled.div`
  font-size: 16px;
  font-weight: 14;
`;

const OkMarkContainer = styled.div`
  position: absolute;
  line-height: 44px;
  position: absolute;
  right: 8px;
  font-size: 20px;
`;

export enum IListElementTypes {
  Border,
  Title,
  Selectable,
  Button
}

export interface IListElement {
  type: IListElementTypes;
  name?: string;
  isSelected?: boolean;
  icon?: string;
  color?: string;
  onClick?: (e?: React.MouseEvent) => any;
}

interface IList {
  open?: boolean;
  list?: Array<IListElement | IListElementTypes>;
  onSelfClose?: () => any;
}

const List = (props: IList) => {
  const { open = true, list = [], onSelfClose } = props;

  const listReference = useRef<HTMLDivElement>(null);
  useOutsideClick(listReference, () => {
    if (onSelfClose && open) onSelfClose();
  });

  if (open) {
    return (
      <ListContainer ref={listReference}>
        {list.map((el, i) => {
          const item = typeof el === 'object' ? el : { type: el };

          switch (item.type) {
            case IListElementTypes.Title:
              return <Title key={item.name}>{(item.name ?? '').toUpperCase()}</Title>;

            case IListElementTypes.Selectable:
              return (
                <SelectableContainer
                  isSelected={item.isSelected ?? false}
                  onPointerDown={item.onClick}
                  onKeyPress={onKeySelect(item.onClick)}
                  tabIndex={0}
                  key={`company-${item.name}`}
                >
                  {item.name}
                  {item.isSelected ? (
                    <OkMarkContainer>
                      <Icon code="done" />
                    </OkMarkContainer>
                  ) : null}
                </SelectableContainer>
              );

            case IListElementTypes.Button:
              return (
                <ButtonCotainer
                  color={item.color}
                  tabIndex={0}
                  key={`button-${item.icon}`}
                  onPointerDown={item.onClick}
                  onKeyPress={onKeySelect(item.onClick)}
                >
                  {item.icon ? (
                    <IconContainer>
                      <Icon code={item.icon} />
                    </IconContainer>
                  ) : null}
                  <NameContainer>{item.name}</NameContainer>
                </ButtonCotainer>
              );

            case IListElementTypes.Border:
              return <Border key={`border-${i}`} />;
          }
        })}
      </ListContainer>
    );
  } else {
    return null;
  }
};

export default List;
