
export interface BrickColor {
    id: number;
    name: string;
    code: string;
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


export interface BrickDataResponse {
    tiles: BrickItemResponse[];
    plates: BrickItemResponse[];

    colors: BrickColor[];


}

export class BrickData {

    public readonly tiles: BrickItem[];
    public readonly plates: BrickItem[];
    private readonly colors: BrickColor[];
    public constructor(data: BrickDataResponse) {
        this.colors = data.colors;
        this.tiles = [];

        data.tiles.forEach((tile) => {
            this.tiles.push({ partNumber: tile.partNumber, fmt: tile.fmt, availableColors: this.resolveColors(tile.colorIds) })
        })
        this.plates = [];
        data.plates.forEach((plate) => {
            this.plates.push({ partNumber: plate.partNumber, fmt: plate.fmt, availableColors: this.resolveColors(plate.colorIds) })
        })
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