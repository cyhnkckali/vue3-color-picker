export type ColorType = 'HEX8' | 'HEX' | 'RGB' | 'RGBA'
export type Mode = 'gradient' | 'solid'
export type Theme = 'light' | 'dark'
export type InputType = 'RGB' | 'HSL' | 'HSV' | 'CMYK'

export interface Color {
	id: number | string
	r: number
	g: number
	b: number
	a: number
	percent: number
	hue: number
	select: boolean
}

export interface RGB {
	r: number
	g: number
	b: number
}

export interface RGBA {
	r: number
	g: number
	b: number
	a: number
}

export interface Vue3ColorPickerProps {
	mode: Mode
	type: ColorType
	theme: Theme
	inputType: InputType
	showColorList: boolean
	showEyeDrop: boolean
	colorListCount: number
}
