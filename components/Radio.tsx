export const Radio = ({
  label,
  hint,
  name,
}: {
  label?: string;
  hint?: string;
  name?: string;
}) => (
  <label className="flex items-start gap-2 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      className="mt-1 accent-base-green peer rounded-full sr-only"
    />
    <span
      className="relative inline-block w-4 h-4 border border-base-green rounded-full bg-transparent after:hidden peer-checked:after:block peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:bg-base-green peer-checked:after:top-1/2 peer-checked:after:left-1/2 peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2 peer-checked:after:rounded-full"
      aria-hidden="true"
    />
    <div className="flex flex-col gap-2">
      <span className="text-[#656565] text-xs font-lexend tracking-[-0.0075rem]">
        {label}
      </span>
      {hint && (
        <span className="text-[0.6875rem] font-lexend font-normal uppercase tracking-[0.06875rem]">
          {hint}
        </span>
      )}
    </div>
  </label>
);
