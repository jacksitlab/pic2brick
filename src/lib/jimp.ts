//import { Resize } from './jimp/resize';
import { Resize2, WriteableImageData } from './jimp/resize2';
import { Resolver } from 'dns';

class Jimp {
    public static readonly RESIZE_NEAREST_NEIGHBOR = 'nearestNeighbor';
    public static readonly RESIZE_BILINEAR = 'bilinearInterpolation';
    public static readonly RESIZE_BICUBIC = 'bicubicInterpolation';
    public static readonly RESIZE_HERMITE = 'hermiteInterpolation';
    public static readonly RESIZE_BEZIER = 'bezierInterpolation';

    public static Resize(data: ImageData, targetResolution: { width: number, height: number }): Promise<Uint8Array> {

        return new Promise<Uint8Array>((resolve, reject) => {
            const dst: WriteableImageData = { width: targetResolution.width, height: targetResolution.height, data: Buffer.alloc(targetResolution.width * targetResolution.height * 4) };
            const resize = new Resize2().bicubicInterpolation(data, dst, null);
            console.log(dst);
        })
    }
}

export default Jimp