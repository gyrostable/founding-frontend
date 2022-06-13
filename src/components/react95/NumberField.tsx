import propTypes from "prop-types";
import React, { RefObject } from "react";
import { Button, InputVariant, TextField } from "react95";
import styled, { css } from "styled-components";

const errorColor = "#ff0000";

const blockSizes = {
  sm: "28px",
  md: "36px",
  lg: "44px",
};

const StyledNumberFieldWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const StyledButton = styled(Button)`
  width: 30px;
  padding: 0;
  flex-shrink: 0;

  ${({ isFlat }) =>
    isFlat
      ? css`
          height: calc(50% - 1px);
        `
      : css`
          height: 50%;
          &:before {
            border-left-color: ${({ theme }) => theme.borderLight};
            border-top-color: ${({ theme }) => theme.borderLight};
            box-shadow: inset 1px 1px 0px 1px ${({ theme }) => theme.borderLightest},
              inset -1px -1px 0 1px ${({ theme }) => theme.borderDark};
          }
        `}
`;

const StyledButtonWrapper = styled.div<{ isFlat?: boolean; hideIncrementer?: boolean }>`
  display: ${({ hideIncrementer }) => (hideIncrementer ? "none" : "flex")};
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;

  ${({ isFlat }) =>
    isFlat
      ? css`
          height: calc(${blockSizes.md} - 4px);
        `
      : css`
          height: ${blockSizes.md};
          margin-left: 2px;
        `}
`;

const StyledTextField = styled(TextField)<{ error?: boolean }>`
  ${({ error }) =>
    error
      ? css`
          border: 2px solid ${errorColor};
        `
      : ``}
`;

const StyledButtonIcon = styled.span<{ invert?: boolean }>`
  width: 0px;
  height: 0px;
  display: inline-block;
  ${({ invert }) =>
    invert
      ? css`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid ${({ theme }) => theme.materialText};
        `
      : css`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid ${({ theme }) => theme.materialText};
        `}
  ${StyledButton}:disabled & {
    filter: drop-shadow(1px 1px 0px ${({ theme }) => theme.materialTextDisabledShadow});
    ${({ invert }) =>
      invert
        ? css`
            border-bottom-color: ${({ theme }) => theme.materialTextDisabled};
          `
        : css`
            border-top-color: ${({ theme }) => theme.materialTextDisabled};
          `}
  }
`;

const ErrorMessage = styled.span<{ error?: boolean }>`
  position: absolute;
  top: -1.5em;
  font-size: x-small;
  color: ${errorColor};
  display: ${({ error }) => (error ? "" : "none")};
`;

function clamp(value: number, min: number, max: number): number {
  if (max !== null && value > max) {
    return max;
  }
  if (min !== null && value < min) {
    return min;
  }
  return value;
}

interface BaseNumberFieldProps {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  onChange?: (newValue: string) => void;
  shadow?: boolean;
  style?: React.CSSProperties;
  type?: string;
  value?: number | string;
  hideIncrementer?: boolean;
  defaultValue?: number;
  step?: number;
  width?: number;
  min?: number;
  max?: number;
  variant?: InputVariant;
}

type NumberFieldProps = BaseNumberFieldProps &
  Omit<
    React.PropsWithRef<JSX.IntrinsicElements["input"] | JSX.IntrinsicElements["textarea"]>,
    "onChange"
  >;

const NumberField = React.forwardRef(function NumberField(
  props: NumberFieldProps,
  ref: RefObject<HTMLTextAreaElement>
) {
  const {
    value,
    defaultValue,
    disabled,
    error,
    errorMessage,
    className,
    variant,
    hideIncrementer,
    step,
    width,
    min,
    max,
    onChange,
    style,
  } = props;

  const handleClick = (val: number) => {
    let currentValue: number | string = value;
    if (typeof currentValue === "string") {
      currentValue = parseInt(currentValue, 10);
    }
    const newValue = clamp(currentValue + val, min, max);
    if (onChange) {
      onChange(newValue.toString());
    }
  };

  return (
    <StyledNumberFieldWrapper className={className} style={{ ...style, width: width || "auto" }}>
      <StyledTextField
        defaultValue={defaultValue}
        error={error}
        value={value}
        variant={variant}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        disabled={disabled}
        type="number"
        ref={ref}
        fullWidth
      />
      <StyledButtonWrapper isFlat={variant === "flat"} hideIncrementer={hideIncrementer}>
        <StyledButton
          data-testid="increment"
          isFlat={variant === "flat"}
          variant={variant}
          disabled={disabled}
          onClick={() => handleClick(step)}
        >
          <StyledButtonIcon invert />
        </StyledButton>
        <StyledButton
          data-testid="decrement"
          isFlat={variant === "flat"}
          variant={variant}
          disabled={disabled}
          onClick={() => handleClick(-step)}
        >
          <StyledButtonIcon />
        </StyledButton>
      </StyledButtonWrapper>
      <ErrorMessage error={error}>{errorMessage}</ErrorMessage>
    </StyledNumberFieldWrapper>
  );
});

NumberField.defaultProps = {
  className: "",
  defaultValue: undefined,
  disabled: false,
  error: false,
  errorMessage: "",
  max: null,
  min: null,
  step: 1,
  onChange: null,
  style: {},
  value: undefined,
  variant: "default",
  hideIncrementer: false,
  width: null,
};

NumberField.propTypes = {
  className: propTypes.string,
  defaultValue: propTypes.number,
  disabled: propTypes.bool,
  error: propTypes.bool,
  errorMessage: propTypes.string,
  max: propTypes.number,
  min: propTypes.number,
  step: propTypes.number,
  onChange: propTypes.func,
  style: propTypes.object,
  // value: propTypes.number,
  variant: propTypes.oneOf(["default", "flat"]),
  hideIncrementer: propTypes.bool,
  // width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default NumberField;
