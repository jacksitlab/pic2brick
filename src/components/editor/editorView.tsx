import * as React from 'react';
import { ColorTable } from 'model/colorTable';
import rasterService, { RasterService } from 'services/rasterService';
import BrickSvg from 'components/brickSvg';
import { BrickItem, BrickColor, BrickItemWithPosition } from 'model/brickData';


interface IEditorState {
    img: string | ArrayBuffer | null;
    colorTable: ColorTable;
    targetResolution: { width: number, height: number } | null;
}
class EditorView extends React.Component<any, IEditorState>{

    private readonly rasterService: RasterService;
    public constructor(props: any) {
        super(props);
        this.rasterService = rasterService;
        this.state = { img: null, colorTable: ColorTable.default(), targetResolution: null }
    }

    componentDidMount() {
        if (this.state.img != null) {

        }
    }

    private onFileInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const tgt = e.target,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = () => {
                this.setState({ img: fr.result })

            }
            fr.readAsDataURL(files[0]);
        }
    }
    private onImageLoaded(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        var canvas = document.createElement('canvas');
        const w = 500, h = 500
        const img = document.getElementById('my-image') as HTMLImageElement

        canvas.width = img ? img.width : w;
        canvas.height = img ? img.height : h;
        const ctx = canvas.getContext('2d');
        if (ctx && img) {
            ctx.drawImage(img, 0, 0, w, h);
        }
    }
    private onReload() {
        var canvas = document.createElement('canvas');
        const img = document.getElementById('my-image') as HTMLImageElement
        const w = img ? img.width : 500, h = img ? img.height : 500

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx && img) {
            console.log("write image into context")
            ctx.drawImage(img, 0, 0, w, h);
            this.rasterService.doRaster(ctx.getImageData(0, 0, w, h), this.state.colorTable, { width: 2, height: 2 }).then((data) => {
                console.log(data);
            })
        }
        else {
            console.log(`something wrong ctx=${ctx} img=${img}`)
        }
    }
    private getImageHtml() {
        return <div>
            <img id="my-image" style={{ display: '' }} src={this.state.img?.toString()} onLoad={(e) => { this.onImageLoaded(e) }} />

        </div>
    }
    render() {
        const items: BrickItemWithPosition[] = [];
        const colors: BrickColor[] = [];
        items.push({ partNumber: 1, availableColors: colors, fmt: "0", position: { x: 0, y: 0 } })
        items.push({ partNumber: 1, availableColors: colors, fmt: "0", position: { x: 1, y: 0 } })
        items.push({ partNumber: 1, availableColors: colors, fmt: "0", position: { x: 1, y: 1 } })
        return <div id="editor"> <input type="file" onChange={(e) => { this.onFileInputChange(e); }} title="Load Image" />
            <div className="source">
                {this.getImageHtml()}
                {/* {this.state.img == null ? <input type="file" onChange={(e) => { this.onFileInputChange(e); }} title="Load Image" /> : this.getImageHtml()} */}
            </div>
            <button onClick={() => { this.onReload() }} >Reload</button>
            <div className="dest my-1">
                <BrickSvg items={items} size={{ width: 40, height: 30 }} />
            </div></div>
    }
}
export default EditorView;