import * as React from 'react'
import rasterService, { RasterService } from '../services/rasterService'
import { ColorTable } from 'model/colorTable';
import PageWrapper from './pageWrapper';
import EditorView from './editor/editorView';
import EditorSettings from './editor/editorSettings';

interface IEditorState {
    img: string | ArrayBuffer | null;
    colorTable: ColorTable;
    targetResolution: { width: number, height: number } | null;
}

class EditorPage extends React.Component<any, IEditorState> {

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



    render() {
        return <PageWrapper >
            <div id="editor-wrapper">
                <EditorView />
                <EditorSettings />
            </div>
        </PageWrapper>
    }
}
export default EditorPage