import { requestRest, ResponseData } from "./restService";
import { BrickData } from "model/brickData";

const cache: { brickData: BrickData | null, imprint: string | null, privacy: string | null, doc: string | null } = {
    brickData: null,
    imprint: null,
    privacy: null,
    doc: null
}
export function loadBricksData() {
    if (cache.brickData == null) {
        const response = requestRest<BrickData>('/assets/bricks.lego.json');
        response.then((data) => {
            if (data.code >= 200 && data.code < 300) {
                cache.brickData = data.data;
            }
        })
        return response;
    }
    else {
        return new Promise<ResponseData<BrickData>>((resolve, reject) => {
            if (cache.brickData) {
                resolve({
                    code: 200, data: cache.brickData
                });
            }
            else {
                reject("problem while caching")
            }
        });
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
