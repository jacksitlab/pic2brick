
export interface Color {
    r: number;
    g: number;
    b: number;
}
export class ColorTable {

    private readonly allowedColors: Color[];
    private readonly maximumDistance: Color;

    public constructor(colors: Color[] = [], maxDist: Color = { r: 5, g: 5, b: 5 }) {
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