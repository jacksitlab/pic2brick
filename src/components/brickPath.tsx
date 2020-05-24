import * as React from 'react'
import { BrickItem } from 'model/brickData';

export interface IBrickPathProps {
    item: BrickItem;
}

class BrickPath extends React.Component<IBrickPathProps>{

    public constructor(props: IBrickPathProps) {
        super(props);
    }


    render() {
        return <path d="" />
    }
}