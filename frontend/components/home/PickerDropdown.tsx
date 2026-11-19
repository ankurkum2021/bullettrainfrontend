"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type PickerOption = {
  value: string;
  label: string;
  sub?: string;
  meta?: string;
  disabled?: boolean;
};

type Props = {
  label: string;
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  icon?: ReactNode;
  labelIcon?: ReactNode;
};

export function PickerDropdown({ label, value, options, onChange, disabled, icon, labelIcon }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="field">
      <label id={`${listId}-label`} className={labelIcon ? "field-label with-ico" : "field-label"}>
        {labelIcon}
        {label}
      </label>
      <div
        ref={wrapRef}
        className="dd"
        data-open={open || undefined}
      >
        <button
          type="button"
          className="dd-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${listId}-label`}
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
        >
          <span className="dd-ico" aria-hidden>
            {icon ?? "◎"}
          </span>
          <span className="dd-txt">
            <span className="dd-val">{selected?.label ?? "Select"}</span>
            {selected?.sub ? <span className="dd-sub">{selected.sub}</span> : null}
          </span>
          <span className="chev" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
        <ul className="dd-list" role="listbox" aria-labelledby={`${listId}-label`}>
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled || undefined}
              className={`opt${opt.value === value ? " act" : ""}`}
              onClick={() => {
                if (opt.disabled) return;
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <span className="tick" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{opt.label}</span>
              {opt.meta ? <small>{opt.meta}</small> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}