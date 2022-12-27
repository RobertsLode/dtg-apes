import React from 'react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { ClearButton } from '../ClearButton/ClearButton.jsx';
import cn from 'classnames';
import './styles.scss';
import useDebounce from '../../hooks/useDebounce.jsx';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  debounce: PropTypes.number,
  className: PropTypes.string,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  label: '',
  value: '',
  debounce: 0,
  className: '',
  valid: null,
  required: false,
  disabled: false,
};

function TextInput({
  value: propsValue, onChange, debounce, name, label, className, valid, required, disabled,
}) {
  const [value, setValue, debouncedValue] = useDebounce(propsValue, debounce);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue, setValue]);

  useEffect(() => {
    onChange({ target: { name, value: debouncedValue } });
  }, [debouncedValue, name, onChange]);

  useEffect(() => {
    const hasValue = !!debouncedValue.length;
    const validity = valid === null
      ? hasValue
      : valid;

    setIsValid(validity);
  }, [debouncedValue, valid]);

  const getValidity = useCallback((validity) => {
    if (!required || disabled) return '';

    if (validity) return 'is-valid';

    return 'is-invalid';
  }, [disabled, required]);

  return (
    <div className={cn('text-input-component', className)}>
      <label className={cn('text-input-label position-relative w-100')}>
        {label}
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={name}
          type="text"
          className={cn('form-control', getValidity(isValid))}
          disabled={disabled}
          data-testid="input"
        />
        <ClearButton
          handler={() => setValue('')}
          isVisible={!disabled && !!value.length}
        />
      </label>
    </div>
  );
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export { TextInput };
