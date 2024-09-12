import { type ForwardedRef, type InputHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

const inputStyles = tv({
  base: 'rounded-lg py-3 px-4 placeholder:text-gray-600 border border-gray-300 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus-within:outline-red-400',
});

function Component(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { errorMessage, className, ...inputProps } = props;
  return (
    <div className="flex flex-col gap-1 w-full pb-2">
      <label className="text-sm font-semibold flex flex-col gap-2 capitalize">
        {inputProps.name || 'label'}
        <input ref={ref} className={inputStyles({ className: className })} {...inputProps} />
      </label>
      {errorMessage && <span className="text-red-500 text-sm min-h-5">{errorMessage}</span>}
    </div>
  );
}

const Input = forwardRef<HTMLInputElement, InputProps>(Component);

export default Input;
