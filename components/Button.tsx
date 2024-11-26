import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(`
                w-full
                rounded-full
                bg-red-500
                border-transparent
                px-3
                py-3
                disabled:cursor-not-allowed
                disabled: opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition
            `,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
