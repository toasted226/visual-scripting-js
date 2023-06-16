import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"
import { useState, useEffect } from 'react';

function Canvas() {
    // const [xPos, setXPos] = useState(0);
    // const [yPos, setYPos] = useState(0);
    // const [stageWidth, setStageWidth] = useState(0);
    // const [stageHeight, setStageHeight] = useState(0);
    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // useEffect(() => {
    //     function handleResize() {
    //         setXPos(width * 0.25);
    //         setYPos(50);
    //         setStageWidth(width - xPos);
    //         setStageHeight(height - yPos);
    //     }
    //     window.addEventListener('resize', handleResize);
    // });

    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight} draggable>
                <Layer>
                    <Rect width={50} height={50} x={300} y={300} fill='red' />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
