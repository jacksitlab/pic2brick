import * as React from 'react';
import { faCogs, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { loadBricksData } from 'services/assetService';
import { BrickData } from 'model/brickData';
export interface IEditorSettingsState {
    show: boolean;
    brickData: BrickData | null;
}
library.add(faCogs)
class EditorSettings extends React.Component<any, IEditorSettingsState>{

    public constructor(props: any) {
        super(props);
        this.state = { show: false, brickData: null }
        loadBricksData().then((data) => {
            this.setState({ brickData: data });
        }).catch((error) => {

        })
    }
    private showSettings(): void {
        this.setState({ show: true })
    }

    private printTilesList(): JSX.Element {
        let i = 0;
        return <div className="container-fluid">{this.state.brickData == null ? "" : this.state.brickData.tiles.map((item) => {
            return <div key={item.partNumber} className="brick-item row">
                <div className="col col-12">
                    <span style={{ display: 'block' }}>{item.partNumber}</span>
                    <div className="color-table">{item.availableColors.map((color) => {
                        return <div key={`${item.partNumber}_${color.id}_${i++}`} className="color-table-item" style={{ background: color.code }}></div>
                    })}
                    </div>
                </div>
            </div>
        })}
        </div>
    }
    private printPlatesList(): JSX.Element {
        let i = 0;
        return <div className="container-fluid">{this.state.brickData == null ? "" : this.state.brickData.plates.map((item) => {
            return <div key={item.partNumber} className="brick-item row">
                <div className="col col-12">
                    <span style={{ display: 'block' }}>{item.partNumber}</span>
                    <div className="bs-tooltip-top color-table">{item.availableColors.map((color) => {
                        return <div id={`${item.partNumber}_${color.id}_${i++}`}
                            key={`${item.partNumber}_${color.id}_${i++}`}
                            className="color-table-item"
                            data-toggle="tooltip" data-placement="top" data-html="true" title={color.name}
                            style={{ background: color.code }}>

                        </div>
                    })}
                    </div>
                </div>
            </div>
        })}
        </div>
    }
    render() {
        return <div id="editor-settings" className={this.state.show ? "show" : ""}>
            <div className="btn btn-secondary fa fa-cogs" id="btn_editor_settings_show" onClick={() => { this.showSettings(); }}>
                <FontAwesomeIcon icon={faCogs} size="2x" style={{ margin: '10px 0', cursor: 'pointer' }} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-10">
                        <h2 className="m-2">Settings</h2>
                    </div>
                </div>
                <div className="row">
                    <h3 className="col col-11 offset-1">Size</h3>
                    <div className="col col-5 offset-1">
                        <div className="form-group">
                            <label className="col-12" >original</label>
                            <input type="number" style={{ marginLeft: '4rem' }} className="form-control inline" id="tbx_settings_orig_size_width" />
                            <span> x </span>
                            <input type="number" className="form-control inline" id="tbx_settings_orig_size_height" />
                        </div>
                    </div>
                    <div className="col col-5 offset-1">
                        <div className="form-group">
                            <label className="col-12" >scaled</label>
                            <input type="number" style={{ marginLeft: '4rem' }} className="form-control inline" id="tbx_settings_scaled_size_width" />
                            <span> x </span>
                            <input type="number" className="form-control inline" id="tbx_settings_scaled_size_height" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h3 className="col col-11 offset-1">Bricks</h3>
                    <div className="col col-5 offset-1">
                        <div className="form-group">
                            <label className="col-12" >tiles</label>
                            {this.printTilesList()}
                        </div>
                    </div>
                    <div className="col col-5 offset-1">
                        <div className="form-group">
                            <label className="col-12" >plates</label>
                            {this.printPlatesList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default EditorSettings;