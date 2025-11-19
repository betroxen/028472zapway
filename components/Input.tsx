import React, { forwardRef } from 'react';

// FIX: Replaced the original interface with a discriminated union type for true polymorphic
// component props. This correctly types the attributes for 'input', 'textarea', and 'select'
// based on the 'as' prop, resolving the type conflict errors.
type InputAsInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  as?: 'input';
};
type TextareaAsTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: 'textarea';
};
type SelectAsSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  as: 'select';
};

export type InputProps = InputAsInputProps | TextareaAsTextareaProps | SelectAsSelectProps;

// FIX: Updated component signature to accept the entire props object,
// allowing TypeScript to correctly narrow types based on the 'as' prop.
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>((props, ref) => {
  const baseClassName = `flex w-full rounded-[4px] border border-[#333333] bg-foundation-light px-3 py-2 text-sm text-white placeholder:text-[#666666] font-jetbrains-mono
  transition-all duration-200
  hover:bg-foundation-lighter hover:border-[#444444]
  focus:outline-none focus:border-b-[3px] focus:border-neon-surge focus:bg-foundation focus:shadow-[0_4px_20px_-5px_rgba(0,255,192,0.2)]
  disabled:cursor-not-allowed disabled:opacity-50`;

  if (props.as === 'textarea') {
    const { as, className, ...rest } = props;
    return (
      <textarea
        className={`${baseClassName} h-auto py-2 ${className}`}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        {...rest}
      />
    );
  }

  if (props.as === 'select') {
    const { as, className, children, ...rest } = props;
    return (
      <select
        className={`${baseClassName} h-10 appearance-none ${className}`}
        ref={ref as React.Ref<HTMLSelectElement>}
        {...rest}
      >
        {children}
      </select>
    );
  }

  const { as, className, type, ...rest } = props;
  return (
    <input
      type={type}
      className={`${baseClassName} h-10 ${className}`}
      ref={ref as React.Ref<HTMLInputElement>}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
