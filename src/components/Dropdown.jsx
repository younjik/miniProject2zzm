import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function Dropdown({ options, value, onChange, placeholder = "선택해주세요" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectOption = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={rootRef}>
      <button
        type="button"
        className={`dropdown-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "" : "dropdown-placeholder"}>{value || placeholder}</span>
        <ChevronDown size={18} className="dropdown-chevron" />
      </button>
      {open && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  className={`dropdown-option${selected ? " selected" : ""}`}
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectOption(opt)}
                >
                  {opt}
                  {selected && <Check size={16} className="dropdown-check" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
