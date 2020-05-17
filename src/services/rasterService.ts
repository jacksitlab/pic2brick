import { RasteredImageData } from "model/rasteredImageData"
import { ColorTable } from "model/colorTable";
import Jimp from "lib/jimp";

export class RasterService {

    public doRaster(data: ImageData, ct: ColorTable, targetResolution: { width: number, height: number } | null = null): Promise<RasteredImageData> {
        return new Promise<RasteredImageData>((resolve, reject) => {
            if (!targetResolution) {
                targetResolution = { width: data.width, height: data.height };
            }
            Jimp.Resize(data, targetResolution)
            resolve(data);
        });
    }
}

const rasterService = new RasterService()
export default rasterService