import React, { useState } from 'react';
import './SearchInput.css';

export default function SearchInput({
  placeholder = "Search my files",
  value = "",
  onChange = null,
  onSearch = null,
  onClear = null,
  className = "",
  disabled = false,
  ...props
}) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange && onChange(newValue, e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch && onSearch(inputValue, e);
    }
    if (e.key === 'Escape') {
      if (inputValue) {
        setInputValue('');
        onClear && onClear(e);
      }
      e.target.blur();
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur && props.onBlur(e);
  };

  const containerClasses = [
    'search-input',
    isFocused && 'search-input--focused',
    disabled && 'search-input--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      data-node-id="9236:13796"
    >
      <input
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        data-node-id="9236:13797"
        {...props}
      />
    </div>
  );
}





