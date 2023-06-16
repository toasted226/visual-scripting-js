import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"
import { useState } from 'react';

function Canvas() {
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const width = window.innerWidth;
    const height = window.innerHeight;

    setXPos(width * 0.25);
    setYPos(50);

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
