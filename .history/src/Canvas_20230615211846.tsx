import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"

function Canvas() {
    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight} x={50} y={50}>
                <Layer>
                    <Rect width={50} height={50} fill='red' />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
