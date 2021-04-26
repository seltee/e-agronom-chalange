import React from 'react';
import styled from 'styled-components';

interface IIcon {
  code: string;
  outlined?: boolean;
}

const IconContainer = styled.span`
  font-size: inherit !important;
`;

const Icon = (props: IIcon) => (
  <IconContainer className={props.outlined ? 'material-icons-outlined' : 'material-icons'}>
    {props.code}
  </IconContainer>
);

export default Icon;
