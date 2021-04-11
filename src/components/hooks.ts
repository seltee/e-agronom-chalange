import React, { useRef, useEffect } from 'react';

export function useOutsideClick(ref?: React.RefObject<HTMLElement>, onClickOutside?: () => any) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(e.target as Node) && onClickOutside) {
        e.stopPropagation();
        e.preventDefault();
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref?.current, onClickOutside]);
}
