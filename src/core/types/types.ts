export type ColorType = "HEX8" | "HEX" | "RGB" | "RGBA";
export type Mode = "gradient" | "solid";
export type Theme = "light" | "dark";
export type InputType = "RGB" | "HSL" | "HSV" | "CMYK";
export type GradientMode = "linear" | "radial";

export type ModelValue = string | null | undefined;

export interface Local {
  angle?: string;
  positionX?: string;
  positionY?: string;
  solid?: string;
  gradient?: string;
  linear?: string;
  radial?: string;
  colorPalette?: string;
  btnSaveLabel?: string;
  btnCancelLabel?: string;
}

export interface IconClasses {
  ruler?: string;
  eyeDroper?: string;
  arrowDown?: string;
  save?: string;
  delete?: string;
}

export interface Color {
  id: number | string;
  r: number;
  g: number;
  b: number;
  a: number;
  percent: number;
  hue: number;
  select: boolean;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Vue3ColorPickerProps {
  modelValue: ModelValue;
  mode: Mode;
  type: ColorType;
  theme: Theme;
  inputType: InputType;
  colorListCount: number;
  showColorList: boolean;
  showEyeDrop: boolean;
  showAlpha: boolean;
  showPickerMode: boolean;
  showInputMenu: boolean;
  showInputSet: boolean;
  disabled: boolean;
  local: Local;
  iconClasses: IconClasses;
  gradientMode: GradientMode;
  showButtons: boolean;
}
