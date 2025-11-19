import React from 'react';
import { Icons } from './icons';

// A simplified cva-like function
const cva = (base: string, variants: Record<string, Record<string, string>>) => {
  return (props: { variant?: string, size?: string }) => {
    let variantClasses = '';
    if (props.variant && variants.variant[props.variant]) {
      variantClasses += variants.variant[props.variant] + ' ';
    }
    if (props.size && variants.size[props.size]) {
      variantClasses += variants.size[props.size] + ' ';
    }
    return [base, variantClasses].join(' ').trim();
  };
};

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-foundation focus:ring-neon-surge disabled:opacity-50 disabled:pointer-events-none active:scale-95 font-orbitron',
  {
    variant: {
      primary: 'bg-neon-surge text-black hover:bg-neon-surge/90 shadow-neon-card hover:shadow-neon-card-hover hover:-translate-y-1',
      ghost: 'bg-transparent hover:bg-foundation-light text-text-secondary hover:text-white',
      destructive: 'bg-warning-high text-white hover:bg-warning-high/90',
    },
    size: {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size }) + ` ${className}`}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Icons.Loader2 className="h-5 w-5 animate-spin" />
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };