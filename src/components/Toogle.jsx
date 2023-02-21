import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";

function Toggle(props) {
  const {
    text,
    textChecked,
    size = "default",
    checked,
    disabled,
    onChange = () => {},
    offstyle = "btn-danger",
    onstyle = "btn-success"
  } = props;

  let displayStyle = checked ? onstyle : offstyle;  
  const {theme, toggleTheme } = useTheme()
  const [inputChecked, setInputChecked] = useState(theme==='dark')

  return (
    <>
      <label>
        <span className={`${size} switch-wrapper`}>
          <input
            type="checkbox"
            checked={inputChecked}
            disabled={disabled}
            onChange={e => {
              toggleTheme()
              setInputChecked(e.target.checked)
              onChange(e)
            }}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
        <span className="switch-label">{inputChecked? textChecked: text}</span>
      </label>
    </>
  );
}

export default Toggle;
