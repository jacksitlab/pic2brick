import * as React from 'react'
import { BrickItem, BrickItemWithPosition } from 'model/brickData';
import BrickPath, { IBrickPathProps } from './brickPath';

export interface IBrickSvgProps {
    size?: { width: number, height: number } | null;
    items?: BrickItemWithPosition[] | null
}

class BrickSvg extends React.Component<IBrickSvgProps, any>{
    public static readonly standardWidth = 10; //with per single brick

    public constructor(props: IBrickSvgProps) {
        super(props);
    }

    render() {
        if (this.props.size == null || this.props.items == null) {
            return "";
        }
        return <svg id="svg" width="100%" height="100%" viewBox={`0 0 ${this.props.size.width * BrickSvg.standardWidth} ${this.props.size.height * BrickSvg.standardWidth}`} >
            {this.props.items.map((item) => {
                return <BrickPath item={item} />
            })}
        </svg>
    }
}

export default BrickSvg;