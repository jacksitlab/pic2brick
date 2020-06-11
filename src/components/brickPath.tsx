import * as React from 'react'
import { BrickItem, BrickFormat, BrickItemWithPosition } from 'model/brickData';
import BrickSvg from './brickSvg';

export interface IBrickPathProps {
    item: BrickItemWithPosition;
}


class BrickPath extends React.Component<IBrickPathProps>{

    public constructor(props: IBrickPathProps) {
        super(props);
    }
    private getOutlinePath(): string {
        const x = BrickSvg.standardWidth;
        let path = `M0,0 l${x},0 l0,${x} l-${x},0Z`;
        const bpath = new BrickFormat(this.props.item.fmt);

        return path;
    }

    render() {
        return <g transform={`translate(${this.props.item.position.x * BrickSvg.standardWidth},${this.props.item.position.y * BrickSvg.standardWidth})`}>
            <path d={this.getOutlinePath()} stroke="#000000" strokeWidth="0.1" fill="none" />
            <circle cx={BrickSvg.standardWidth / 2} cy={BrickSvg.standardWidth / 2} r={BrickSvg.standardWidth / 4}
                stroke="#000" strokeWidth="0.1" fill="none" />
        </g>
    }
}
export default BrickPath;