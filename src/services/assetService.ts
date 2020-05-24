import { requestRest, ResponseData } from "./restService";
import { BrickData, BrickDataResponse } from "model/brickData";

const cache: { brickData: BrickData | null, imprint: string | null, privacy: string | null, doc: string | null } = {
    brickData: null,
    imprint: null,
    privacy: null,
    doc: null
}
export async function loadBricksData(): Promise<BrickData> {
    if (cache.brickData == null) {
        const response = await requestRest<BrickDataResponse>('/assets/bricks.lego.json');
        if (response.code >= 200 && response.code < 300) {
            cache.brickData = new BrickData(response.data);
        }

    }
    if (cache.brickData) {
        return cache.brickData;

    }
    else {
        throw new Error("problem with cache");
    }

}

export function loadImprint() {
    if (cache.imprint == null) {
        const response = requestRest<string>('/assets/imprint.md');
        response.then((data) => {
            if (data.code >= 200 && data.code < 300) {
                cache.imprint = data.data;
            }
        })
        return response;
    }
    else {
        return new Promise<ResponseData<string>>((resolve, reject) => {
            if (cache.imprint) {
                resolve({
                    code: 200, data: cache.imprint
                });
            }
            else {
                reject("problem while caching")
            }
        });
    }

}
export function loadPrivacy() {
    if (cache.privacy == null) {
        const response = requestRest<string>('/assets/privacy.md');
        response.then((data) => {
            if (data.code >= 200 && data.code < 300) {
                cache.privacy = data.data;
            }
        })
        return response;
    }
    else {
        return new Promise<ResponseData<string>>((resolve, reject) => {
            if (cache.privacy) {
                resolve({
                    code: 200, data: cache.privacy
                });
            }
            else {
                reject("problem while caching")
            }
        });
    }

}

export function loadDocumentation() {
    if (cache.doc == null) {
        const response = requestRest<string>('/assets/documentation.md');
        response.then((data) => {
            if (data.code >= 200 && data.code < 300) {
                cache.doc = data.data;
            }
        })
        return response;
    }
    else {
        return new Promise<ResponseData<string>>((resolve, reject) => {
            if (cache.doc) {
                resolve({
                    code: 200, data: cache.doc
                });
            }
            else {
                reject("problem while caching")
            }
        });
    }

}
