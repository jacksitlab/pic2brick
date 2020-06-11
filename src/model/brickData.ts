import { Color } from "./colorTable";
import { NearestColor } from "../lib/nearestColor/nearestColor"
export interface BrickColor {
    id: number;
    name: string;
    code: string;
}
export interface BrickColorExt extends BrickColor {
    color: Color
}
export interface BrickItemResponse {

    partNumber: number;
    fmt: string;
    colorIds: number[];

}
export interface BrickItem {

    partNumber: number;
    fmt: string;
    availableColors: BrickColor[];

}
export interface BrickItemWithPosition extends BrickItem {
    position: {
        x: number;
        y: number;
    }
}

export interface BrickDataResponse {
    tiles: BrickItemResponse[];
    plates: BrickItemResponse[];

    colors: BrickColor[];


}

export class BrickFormat {

    public static readonly DIRECTION_START = 0;
    public static readonly DIRECTION_TOP = 1;
    public static readonly DIRECTION_RIGHT = 2;
    public static readonly DIRECTION_BOTTOM = 3;
    public static readonly DIRECTION_LEFT = 4;


    public readonly directions: number[];
    public constructor(fmt: string) {
        this.directions = [];
        for (let i = 0; i < fmt.length; i++) {
            const tmp = parseInt(fmt[i]);
            if (tmp < BrickFormat.DIRECTION_START || tmp > BrickFormat.DIRECTION_LEFT) {
                throw new Error("unknown format");
            }
            this.directions.push();
        }
    }
}
export class BrickData {

    public readonly tiles: BrickItem[];
    public readonly plates: BrickItem[];
    private readonly colors: BrickColorExt[];
    public constructor(data: BrickDataResponse) {
        this.colors = [];
        data.colors.forEach((color) => {
            this.colors.push({ ...color, ...{ color: this.parseColor(color.code) } })
        });
        this.tiles = [];

        data.tiles.forEach((tile) => {
            this.tiles.push({ partNumber: tile.partNumber, fmt: tile.fmt, availableColors: this.resolveColors(tile.colorIds) })
        })
        this.plates = [];
        data.plates.forEach((plate) => {
            this.plates.push({ partNumber: plate.partNumber, fmt: plate.fmt, availableColors: this.resolveColors(plate.colorIds) })
        })
    }
    private parseColor(colorCode: string): Color {
        return NearestColor.parseColor(colorCode);
    }
    private resolveColors(colorIds: number[]): BrickColor[] {
        const colors: BrickColor[] = [];
        colorIds.forEach((id) => {
            this.colors.forEach((color) => {
                if (color.id == id) {
                    colors.push(color);
                }
            })
        });
        return colors;
    }
}