type ButtonSize = 'large' | 'medium' | 'small';
type ButtonScheme = 'primary' | 'secondary' | 'danger';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
}

const DEFAULT_STYLE = 'inline-flex items-center justify-center font-bold text-white text-2xl';
const SIZE_MAP: Record<ButtonSize, string> = {
  large: 'w-[280px] h-36 rounded-2xl',
  medium: 'w-[280px] h-16 rounded-2xl',
  small: 'w-[280px] h-12 rounded-2xl',
};
const SCHEME_MAP: Record<ButtonScheme, string> = {
  primary: 'bg-button-primary',
  secondary: 'bg-button-secondary',
  danger: 'bg-button-danger',
};

const Button = ({ children, size, scheme, ...rest }: Props) => {
  return (
    <button className={`${DEFAULT_STYLE} ${SIZE_MAP[size]} ${SCHEME_MAP[scheme]} `} {...rest}>
      {children}
    </button>
  );
};
export default Button;
