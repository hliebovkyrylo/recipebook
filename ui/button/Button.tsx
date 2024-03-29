interface IButton {
  text      : string;
  onClick  ?: () => void;
  className?: string; 
  isActive  : boolean;
}

export const Button = ({
  text,
  onClick,
  className,
  isActive
}: IButton) => {
  return (
    <button onClick={onClick} disabled={!isActive} className={`${!isActive && "auth-button-disabled"} auth-button font-semibold ${className}`}>{text}</button>
  )
};