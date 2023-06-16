import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"

function Canvas() {
    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight}>

            </Stage>
        </div>
    )
}

export default Canvas;
