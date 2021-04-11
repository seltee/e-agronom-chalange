import React from 'react';

export const onKeySelect = (selectEvent: (() => any) | undefined): React.KeyboardEventHandler<HTMLElement> => {
  return (e) => ['Enter', 'Space'].includes(e.code) && selectEvent && selectEvent();
}