import type React from 'react';

interface HandleShiftClickProps {
  onClick?: () => void;
  onShiftClick?: () => void;
}

export function handleShiftClick({ onClick, onShiftClick }: HandleShiftClickProps) {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.shiftKey && typeof onShiftClick === 'function') {
      e.preventDefault();
      onShiftClick();
    } else if (typeof onClick === 'function') {
      e.preventDefault();
      onClick();
    }
  };
}
