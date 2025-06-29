// Type declarations for UI components
declare module '@/components/ui/button' {
  import { ComponentProps, forwardRef } from 'react';
  
  export interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  
  export const Button: ReturnType<typeof forwardRef<HTMLButtonElement, ButtonProps>>;
  export const buttonVariants: any;
}

declare module '@/components/ui/badge' {
  import { ComponentProps } from 'react';
  
  export interface BadgeProps extends ComponentProps<'div'> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
  
  export const Badge: (props: BadgeProps) => JSX.Element;
  export const badgeVariants: any;
} 