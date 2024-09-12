import * as React from 'react';
import { tv } from 'tailwind-variants';

const textareaStyles = tv({
  base: 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus-within:outline-red-400',
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, errorMessage, label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full pb-2">
      <label className="text-sm font-semibold flex flex-col gap-2 capitalize">
        {props.name || 'label'}
        <textarea className={textareaStyles({ className })} ref={ref} {...props} />
      </label>
      {errorMessage && <span className="text-red-500 text-sm min-h-5">{errorMessage}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export default Textarea;
