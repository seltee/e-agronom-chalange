import React, { useRef, useEffect } from 'react';

export function useOutsideClick(ref?: React.RefObject<HTMLElement>, onClickOutside?: () => any) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node) && onClickOutside) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
}