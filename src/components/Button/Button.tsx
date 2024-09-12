import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',

  variants: {
    variant: {
      filled: 'bg-brand-blue text-white hover:bg-club-blue-600 active:bg-club-blue-800',
      outlined: 'border border-brand-blue text-brand-blue hover:bg-club-blue-100  active:bg-club-blue-200',
    },
    size: {
      sm: 'h-9 rounded-md px-3',
      lg: 'rounded-md py-2 px-6 text-3xl font-normal',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'lg',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
