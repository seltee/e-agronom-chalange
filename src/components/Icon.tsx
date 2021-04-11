import React from 'react';
import styled from 'styled-components';

interface IIcon {
  code: string;
}

const IconContainer = styled.span`
  font-size: inherit!important;
`;

const Icon = (props: IIcon) => <IconContainer className="material-icons">{props.code}</IconContainer>;

export default Icon;
