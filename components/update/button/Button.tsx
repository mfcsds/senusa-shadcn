import React from 'react';

interface ButtonProps {
  
  label?: string;
  variant: 'primary' | 'secondary' | 'danger' | 'outlinePrimary' | 'outlineSecondary' | 'outlineDanger' | 'borderPrimary' | 'borderSecondary' | 'borderDanger' | 'iconPrimary' | 'iconSecondary' | 'iconDanger' | 'iconBorderPrimary' | 'iconBorderSecondary' | 'iconBorderDanger' | 'iconListViewActive' | 'iconListView' | 'iconCardViewActive' | 'iconCardView';
  size?: 'small' | 'medium' | 'large' | 'innerSize' | 'innerChild' | 'sm' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  size = 'medium',
  className = '',
  icon,
  iconClassName = '',
  ariaLabel,
  disabled = false, 
  onClick,
  type = 'button',
}) => {
  const baseStyles =
    "font-medium rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2";

  const sizeStyles = {
    small: 'h-8 p-2',
    medium: 'px-2 py-2 h-8 text-sm',
    large: 'px-4 h-9 py-2 text-sm',
    innerSize: 'absolute inset-y-0 right-0 flex items-center pr-3',
    innerChild: 'absolute inset-y-0 right-0 flex items-center pr-10',
    sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
  };

  const variants = {
    primary: 'bg-primary hover:bg-secondary text-text-action',
    secondary: 'bg-blue-primary hover:bg-blue-secondary text-text-action',
    danger: 'bg-red-primary hover:bg-red-secondary text-text-action',
    outlinePrimary: 'hover:text-primary border-2 border-secondary text-text-action bg-secondary hover:bg-foreground hover:border-2 hover:border-primary hover:text-primary',
    outlineSecondary: 'border-2 border-blue-secondary text-text-action bg-blue-secondary hover:bg-foreground hover:border-2 hover:border-blue-primary  hover:text-blue-primary',
    outlineDanger: 'border-2 border-red-secondary text-text-action bg-red-secondary hover:bg-foreground hover:border-2 hover:border-red-primary hover:text-red-primary',
    borderPrimary: 'bg-foreground border-2 border-primary rounded hover:bg-secondary',
    borderSecondary: 'bg-foreground border-2 border-blue-primary hover:border-blue-secondary rounded hover:bg-blue-secondary text-blue-primary hover:text-text-action',
    borderDanger: 'bg-foreground border-2 border-red-primary hover:border-red-secondary rounded hover:bg-red-secondary text-red-primary hover:text-text-action',
    iconPrimary: 'text-primary hover:text-secondary',
    iconSecondary: 'bg-foreground text-blue-primary hover:text-text-secondary',
    iconDanger: 'bg-foreground text-red-primary hover:text-text-secondary',
    iconBorderPrimary: 'border-2 border-foreground text-primary hover:border-2 hover:border-primary',
    iconBorderSecondary: 'border-2 border-foreground text-blue-primary hover:border-2 hover:border-blue-primary',
    iconBorderDanger: 'border-2 border-foreground text-red-primary hover:border-2 hover:border-red-primary',
    iconListView: 'text-red-primary hover:text-text-secondary',
    iconListViewActive: 'text-red-primary border-2 border-red-primary',
    iconCardView: 'text-blue-primary hover:text-text-secondary',
    iconCardViewActive: 'text-blue-primary border-2 border-blue-primary',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed disabled:pointer-events-none disabled:opacity-50'; // Gaya untuk tombol disabled
  
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick} 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className} ${disabled ? disabledStyles : ''}`}
      aria-label={ariaLabel}
      disabled={disabled} 
    >
      {icon && (
        <span className={`${iconClassName}`}>
          {icon}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
