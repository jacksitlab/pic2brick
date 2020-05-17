
export interface Color {
    R: number;
    G: number;
    B: number;
}
export class ColorTable {

    private readonly allowedColors: Color[];
    private readonly maximumDistance: Color;

    public constructor(colors: Color[] = [], maxDist: Color = { R: 5, G: 5, B: 5 }) {
        this.allowedColors = colors;
        this.maximumDistance = maxDist
    }

    public getNearestColor(color: Color): Color | null {
        return null;
    }

    public static default(): ColorTable {
        return new ColorTable([])
    }
}