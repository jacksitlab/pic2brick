import { Color } from "model/colorTable";
import { BrickColorExt } from "model/brickData";


export class NearestColor {


    public static readonly VERSION = '0.4.4';

    private readonly nearestColorBase: BrickColorExt[]
    public constructor(colors: BrickColorExt[]) {

        this.nearestColorBase = colors;
        // var colors = NearestColor.mapColors(availableColors),
        // this.nearestColorBase = nearestColor;

        // var matcher = nearestColor(hex)=> {
        //     return this.nearestColorBase(hex, colors);
        // };

        // // Keep the 'from' method, to support changing the list of available colors
        // // multiple times without needing to keep a reference to the original
        // // nearestColor function.
        // matcher.from = from;

        // // Also provide a way to combine multiple color lists.
        // matcher.or = function or(alternateColors) {
        //     var extendedColors = colors.concat(mapColors(alternateColors));
        //     return nearestColor.from(extendedColors);
        // };

        // return matcher;
    };
    public from(needle: string, ignoreColors: number[] = []): BrickColorExt {

        const tmp = NearestColor.parseColor(needle);


        let distanceSq,
            minDistanceSq = Infinity,
            rgb;
        let value: BrickColorExt = this.nearestColorBase[0];
        let inc = 0;
        while (inc < this.nearestColorBase.length) {
            rgb = this.nearestColorBase[inc];
            inc++;
            if (!(rgb.id in ignoreColors)) {
                value = rgb;
                break;
            }
        }


        for (let i = inc; i < this.nearestColorBase.length; ++i) {
            rgb = this.nearestColorBase[i];

            distanceSq = (
                Math.pow(tmp.r - rgb.color.r, 2) +
                Math.pow(tmp.g - rgb.color.g, 2) +
                Math.pow(tmp.b - rgb.color.b, 2)
            );

            if (distanceSq < minDistanceSq) {
                minDistanceSq = distanceSq;
                value = rgb;
            }
        }



        return value;
    }


    public static mapColors(colors: string[]): BrickColorExt[] {
        return colors.map((color) => {
            return NearestColor.createColorSpec(color);
        });


    };


    public static parseColor(source: string): Color {
        var red, green, blue;

        var hexMatch = source.match(/^#?((?:[0-9a-f]{3}){1,2})$/i);
        if (hexMatch) {
            const tmp = hexMatch[1].toString();
            let tmp2: string[];
            if (tmp.length === 3) {
                tmp2 = [
                    tmp.charAt(0) + tmp.charAt(0),
                    tmp.charAt(1) + tmp.charAt(1),
                    tmp.charAt(2) + tmp.charAt(2)
                ];

            } else {
                tmp2 = [
                    tmp.substring(0, 2),
                    tmp.substring(2, 4),
                    tmp.substring(4, 6)
                ];
            }

            red = parseInt(hexMatch[0], 16);
            green = parseInt(hexMatch[1], 16);
            blue = parseInt(hexMatch[2], 16);

            return { r: red, g: green, b: blue };
        }

        var rgbMatch = source.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);
        if (rgbMatch) {
            red = NearestColor.parseComponentValue(rgbMatch[1]);
            green = NearestColor.parseComponentValue(rgbMatch[2]);
            blue = NearestColor.parseComponentValue(rgbMatch[3]);

            return { r: red, g: green, b: blue };
        }

        throw Error('"' + source + '" is not a valid color');

    }


    public static createColorSpec(input: string, name: string | null = null): BrickColorExt {
        var color: BrickColorExt = {
            name: name || "",
            id: 0,
            code: input,
            color: NearestColor.parseColor(input)

        };

        return color;
    }


    private static parseComponentValue(s: string) {
        if (s.charAt(s.length - 1) === '%') {
            return Math.round(parseInt(s, 10) * 255 / 100);
        }

        return Number(s);
    }


    private rgbToHex(rgb: Color) {
        return '#' + this.leadingZero(rgb.r.toString(16)) +
            this.leadingZero(rgb.g.toString(16)) + this.leadingZero(rgb.b.toString(16));
    }


    private leadingZero(value: string) {
        if (value.length === 1) {
            value = '0' + value;
        }
        return value;
    }



}