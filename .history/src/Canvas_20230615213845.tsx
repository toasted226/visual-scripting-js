import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"

function Canvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect width={50} height={50} fill='red' />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
