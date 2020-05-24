export interface BrickData {
    tiles: {
        id: string;
        format: string;
        colors: number[];
    }[];
    plates: {
        id: string;
        format: string;
        colors: number[];
    }[];

    colors: {
        id: number;
        name: "";
        code: "";
    }[];


}