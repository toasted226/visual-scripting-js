import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"

function Canvas() {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Rect width={50} height={50} fill='red' />
            </Layer>
        </Stage>
    )
}

export default Canvas;
