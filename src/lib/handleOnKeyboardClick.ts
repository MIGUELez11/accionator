export function handleOnKeyboardClick(
  onClick?: (e: React.KeyboardEvent<HTMLDivElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void,
) {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.(e);
    } else if (onKeyDown) {
      onKeyDown(e);
    }
  };
}
