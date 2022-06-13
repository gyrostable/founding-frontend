// Definitions by: Owen Wattenmaker <https://github.com/owattenmaker>

declare module "react95" {
  import * as React from "react";
  export const styleReset: string;
  export function createScrollbars(variant?: "default" | "flat"): string;

  export type ButtonVariant = "default" | "menu" | "flat";
  export type InputVariant = "default" | "flat";
  export type PanelVariant = "outside" | "inside" | "well";
  export type ProgressVariant = "default" | "tile";
  export type ElementSize = "sm" | "md" | "lg";
  export type Orientation = "horizontal" | "vertical";

  export function Anchor(
    props: React.PropsWithChildren<JSX.IntrinsicElements["a"]>
  ): React.ReactElement;
  export function AppBar(
    props: React.PropsWithChildren<JSX.IntrinsicElements["header"] & { fixed?: boolean }>
  ): React.ReactElement;
  export function Avatar(
    props: React.PropsWithChildren<
      JSX.IntrinsicElements["div"] & {
        alt?: string;
        noBoarder?: boolean;
        size?: string | number;
        square?: boolean;
        src?: string;
      }
    >
  ): React.ReactElement;
  export function Bar(
    props: React.PropsWithChildren<Partial<JSX.IntrinsicElements["div"] & { size: number }>>
  ): React.ReactElement;
  export function Button(
    props: React.PropsWithChildren<
      JSX.IntrinsicElements["button"] & {
        isFlat?: boolean;
        type?: string;
        disabled?: boolean;
        fullWidth?: boolean;
        size?: ElementSize;
        square?: boolean;
        active?: boolean;
        primary?: boolean;
        variant?: ButtonVariant;
        // onClick, onTouchStart types handled by JSX.IntrinsicElements types
      }
    >
  ): React.ReactElement;
  export function Checkbox(
    props: React.PropsWithChildren<
      JSX.IntrinsicElements["input"] & {
        name?: string;
        value?: string | number | boolean;
        label?: string | number;
        checked?: boolean;
        disabled?: boolean;
        variant?: ButtonVariant;
        indeterminate?: boolean;
        defaultChecked?: boolean;
        className?: string;
      }
    >
  ): React.ReactElement;
  export function ColorInput(
    props: React.PropsWithChildren<JSX.IntrinsicElements["input"]> & {
      value?: string;
      defaultValue?: string;
      variant?: InputVariant;
      disabled?: boolean;
    }
  ): React.ReactElement;
  export function Counter(
    props: React.PropsWithRef<JSX.IntrinsicElements["div"]> & {
      minLength?: number;
      // in code it lists sm, md, lg, and xl, but the prop definitions omit xl...
      size?: ElementSize;
      value?: number;
    }
  ): React.ReactElement;
  export function Cutout(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      shadow?: boolean;
    }
  ): React.ReactElement;
  export function Desktop(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      backgroundStyles?: React.CSSProperties;
    }
  ): React.ReactElement;
  export function Divider(
    props: React.PropsWithChildren<JSX.IntrinsicElements["hr"]> & {
      size?: string | number;
      orientation?: Orientation;
    }
  ): React.ReactElement;
  export function Fieldset(
    props: React.PropsWithChildren<JSX.IntrinsicElements["fieldset"]> & {
      label?: React.ReactNode;
      variant?: InputVariant;
      disabled?: boolean;
    }
  ): React.ReactElement;
  export function Hourglass(
    props: React.PropsWithChildren<JSX.IntrinsicElements["span"]> & {
      size?: string | number;
      style?: Omit<React.CSSProperties, "width" | "height">;
    }
  ): React.ReactElement;
  export function List(
    props: React.PropsWithChildren<JSX.IntrinsicElements["ul"]> & {
      fullWidth?: boolean;
      inline?: boolean;
      shadow?: boolean;
    }
  ): React.ReactElement;
  export function ListItem(
    props: React.PropsWithChildren<JSX.IntrinsicElements["li"]> & {
      size?: ElementSize;
      disabled?: boolean;
      square?: boolean;
    }
  ): React.ReactElement;
  export function LoadingIndicator(
    props: React.PropsWithRef<JSX.IntrinsicElements["div"]> & {
      shadow?: boolean;
      isLoading?: boolean;
    }
  ): React.ReactElement;
  export function NumberField(
    props: React.PropsWithRef<{
      className?: string;
      defaultValue?: number;
      disabled?: boolean;
      max?: number;
      min?: number;
      step?: number;
      onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
      style?: Omit<React.CSSProperties, "width">;
      value?: number;
      variant?: InputVariant;
      width?: number | string;
    }>
  ): React.ReactElement;
  export function Panel(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      variant?: PanelVariant;
      shadow?: boolean;
    }
  ): React.ReactElement;
  export function Progress(
    props: React.PropsWithRef<JSX.IntrinsicElements["div"]> & {
      variant?: ProgressVariant;
      shadow?: boolean;
      value?: number;
      hideValue?: boolean;
    }
  ): React.ReactElement;
  export function Radio(
    props: React.PropsWithRef<JSX.IntrinsicElements["input"]> & {
      variant?: ButtonVariant;
      disabled?: boolean;
      label?: number | string;
      value?: number | string | boolean;
      style?: React.CSSProperties;
      checked?: boolean;
      name?: string;
      className?: string;
    }
  ): React.ReactElement;

  export interface SelectOption<T> {
    label: string;
    value: T;
  }

  export function Select<T = any>(
    props: React.PropsWithRef<JSX.IntrinsicElements["input"]> & {
      "aria-label"?: string;
      className?: string;
      defaultValue?: any;
      disabled?: boolean;
      formatDisplay?: (selectedOption: SelectOption<T>) => any;
      inputRef?: React.RefCallback<any>;
      menuMaxHeight?: string | number;
      name?: string;
      native?: boolean;
      onBlur?: React.FormEventHandler;
      onChange?: (e: React.FormEvent, nextSelection: SelectOption<T>) => void;
      onClose?: (e: React.KeyboardEvent) => void;
      onFocus?: React.FormEventHandler;
      onOpen?: (e: React.KeyboardEvent) => void;
      labelId?: string;
      open?: boolean;
      options?: Array<SelectOption<T>>;
      readOnly?: boolean;
      SelectDisplayProps?: JSX.IntrinsicElements["div"];
      shadow?: boolean;
      style?: React.CSSProperties;
      value?: T;
      variant?: "default" | "flat";
      width?: string | number;
    }
  ): React.ReactElement;
  export function Slider(
    props: React.PropsWithRef<JSX.IntrinsicElements["div"]> & {
      value?: number;
      defaultValue?: number;
      step?: number;
      min?: number;
      max?: number;
      size?: string | number;
      onChange?: (event: React.KeyboardEvent | React.TouchEvent, newValue: number) => void;
      onChangeCommitted?: (event: React.KeyboardEvent, newValue: number) => void;
      onMouseDown?: (event: React.MouseEvent) => void;
      name?: string;
      marks?: boolean | Array<{ label?: React.ReactElement; value: number }>;
      variant?: InputVariant;
      orientation?: Orientation;
      disable?: boolean;
    }
  ): React.ReactElement;
  export function Tab<T = any>(
    props: React.PropsWithChildren<JSX.IntrinsicElements["button"]> & {
      value?: T;
      onClick?: (e: React.MouseEvent | React.TouchEvent, value: T) => void;
      selected?: boolean;
    }
  ): React.ReactElement;
  export function TabBody(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]>
  ): React.ReactElement;
  export function Table(
    props: React.PropsWithChildren<JSX.IntrinsicElements["table"]>
  ): React.ReactElement;
  export function TableBody(
    props: React.PropsWithChildren<JSX.IntrinsicElements["tbody"]>
  ): React.ReactElement;
  export function TableDataCell(
    props: React.PropsWithChildren<JSX.IntrinsicElements["td"]>
  ): React.ReactElement;
  export function TableHead(
    props: React.PropsWithChildren<JSX.IntrinsicElements["thead"]>
  ): React.ReactElement;
  export function TableHeadCell(
    props: React.PropsWithChildren<JSX.IntrinsicElements["th"]> & {
      disabled?: boolean;
      onClick?: React.MouseEventHandler;
      onTouchStart?: React.TouchEventHandler;
      sort?: "asc" | "desc" | null;
    }
  ): React.ReactElement;
  export function TableRow(
    props: React.PropsWithChildren<JSX.IntrinsicElements["tr"]>
  ): React.ReactElement;
  export function Tabs<T = any>(
    props: Omit<JSX.IntrinsicElements["div"], "onChange"> & {
      value?: T;
      onChange?: (e: React.MouseEvent | React.TouchEvent, value: T) => void;
      children?: React.ReactChild | React.ReactChild[];
    }
  ): React.ReactElement;
  export function TextField(
    props: React.PropsWithRef<
      JSX.IntrinsicElements["input"] | JSX.IntrinsicElements["textarea"]
    > & {
      className?: string;
      disabled?: boolean;
      fullWidth?: boolean;
      multiline?: boolean;
      onChange?: React.ChangeEventHandler;
      shadow?: boolean;
      style?: React.CSSProperties;
      type?: string;
      variant?: InputVariant;
    }
  ): React.ReactElement;
  export function Toolbar(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      noPadding?: boolean;
    }
  ): React.ReactElement;
  export function Tooltip(
    props: Omit<
      JSX.IntrinsicElements["span"],
      "onBlur" | "onClose" | "onFocus" | "onMouseEnter" | "onMouseLeave"
    > & {
      children: React.ReactNode;
      className?: string;
      disableFocusListener?: boolean;
      disableMouseListener?: boolean;
      enterDelay?: number;
      leaveDelay?: number;
      onBlur?: React.FocusEventHandler<JSX.IntrinsicElements["div"]>;
      onClose?: React.FocusEventHandler<JSX.IntrinsicElements["div"]>;
      onFocus?: React.FocusEventHandler<JSX.IntrinsicElements["div"]>;
      onMouseEnter?: React.MouseEventHandler<JSX.IntrinsicElements["div"]>;
      onMouseLeave?: React.MouseEventHandler<JSX.IntrinsicElements["div"]>;
      onOpen?: React.FocusEventHandler<JSX.IntrinsicElements["div"]>;
      style?: React.CSSProperties;
      text: string;
    }
  ): React.ReactElement;
  export function Window(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      shadow?: boolean;
      resizable?: boolean;
    }
  ): React.ReactElement;
  export function WindowContent(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]>
  ): React.ReactElement;
  export function WindowHeader(
    props: React.PropsWithChildren<JSX.IntrinsicElements["div"]> & {
      active?: boolean;
    }
  ): React.ReactElement;
}
