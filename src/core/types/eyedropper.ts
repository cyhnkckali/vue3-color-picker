interface ColorSelectionResult {
	sRGBHex: string
}

interface ColorSelectionOptions {
	signal: AbortSignal
}

declare class EyeDropper {
	open(options?: ColorSelectionOptions): Promise<ColorSelectionResult>
}

export default EyeDropper
