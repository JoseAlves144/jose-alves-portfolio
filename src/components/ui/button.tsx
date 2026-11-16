import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Variantes de botão (padrão shadcn/ui). Use `buttonVariants` em <a>/<Link>. */
export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent),0_10px_40px_-10px_var(--accent)]",
        gradient:
          "bg-gradient-to-r from-primary to-accent text-white shadow-[0_10px_40px_-12px_var(--primary)] hover:shadow-[0_14px_50px_-10px_var(--accent)] hover:brightness-110",
        outline: "glass text-fg hover:border-line-strong hover:bg-surface-2",
        ghost: "text-muted hover:text-fg hover:bg-surface-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
