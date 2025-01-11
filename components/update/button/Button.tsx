import React from 'react';

interface ButtonProps {
  label?: string;
  variant: 'primary' | 'secondary' | 'danger' | 'outlinePrimary' | 'outlineSecondary' | 'outlineDanger' | 'borderPrimary' | 'borderSecondary' | 'borderDanger' | 'iconPrimary' | 'iconSecondary' | 'iconDanger' | 'iconComponentSeccondary' | 'iconComponentDanger' | 'iconActiveComponentSeccondary' | 'iconActiveComponentDanger' | 'innerIcon';
  size?: 'small' | 'medium' | 'large' | 'innerSize';
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  ariaLabel?: string; 
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  size = 'medium',
  className = '',
  icon,
  iconClassName = '',
  ariaLabel,
  onClick,
}) => {
  const baseStyles =
    "font-medium rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2";

  const sizeStyles = {
    small: 'h-8 p-2',
    medium: 'px-2 py-2 h-8 text-sm',
    large: 'px-4 h-9 py-2 text-sm',
    innerSize: 'absolute inset-y-0 right-0 flex items-center pr-3'
  };

  const variants = {
    primary: 'bg-primary hover:bg-secondary text-text-action',
    secondary:  
      'bg-blue-primary hover:bg-blue-secondary text-text-action',
    danger: 'bg-red-primary hover:bg-red-secondary text-text-action',
    outlinePrimary: 'hover:text-primary border-2 border-secondary text-text-action bg-secondary hover:bg-foreground hover:border-2 hover:border-primary hover:text-primary',
    outlineSecondary: 'border-2 border-blue-secondary text-text-action bg-blue-secondary hover:bg-foreground hover:border-2 hover:border-blue-primary  hover:text-blue-primary',
    outlineDanger: 'border-2 border-red-secondary text-text-action bg-red-secondary hover:bg-foreground hover:border-2 hover:border-red-primary hover:text-red-primary',
    borderPrimary: 'bg-foreground border-2 border-primary rounded hover:bg-secondary',
    borderSecondary: 'bg-foreground border-2 border-blue-primary hover:border-blue-secondary rounded hover:bg-blue-secondary text-blue-primary hover:text-text-action',
    borderDanger: 'bg-foreground border-2 border-red-primary hover:border-red-secondary rounded hover:bg-red-secondary text-red-primary hover:text-text-action',
    iconPrimary: 'bg-background text-primary hover:text-secondary',
    iconSecondary: 'bg-background text-blue-primary hover:text-blue-secondary',
    iconDanger: 'bg-background text-red-primary hover:text-red-secondary',
    iconComponentSeccondary:'bg-background text-blue-primary hover:text-text-secondary',
    iconComponentDanger:'bg-background text-red-primary hover:text-text-secondary',
    iconActiveComponentSeccondary:'bg-background text-blue-primary border-2 border-blue-primary',
    iconActiveComponentDanger:'bg-background text-red-primary border-2 border-red-primary',
    innerIcon: 'text-primary hover:text-secondary'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
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