import { Stage, Layer, Rect } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import "./Canvas.css";

const scaleBy = 1.15;
const gridWidth = 100;
const gridHeight = 100;

function Canvas() {
    const stageRef = useRef(null);

    const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 });
    const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
    const endX =
        Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

    const startY =
        Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
    const endY =
        Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

    const gridComponents = [];
    var i = 0;
    for (var x = startX; x < endX; x += WIDTH) {
        for (var y = startY; y < endY; y += HEIGHT) {
        if (i === 4) {
            i = 0;
        }

        const indexX = Math.abs(x / WIDTH) % grid.length;
        const indexY = Math.abs(y / HEIGHT) % grid[0].length;

        gridComponents.push(
            <Rect
            x={x}
            y={y}
            width={WIDTH}
            height={HEIGHT}
            fill={grid[indexX][indexY]}
            stroke="black"
            />
        );
        }
    }

    function zoomStage(event: any) {
        event.evt.preventDefault();
        if (stageRef.current != null) {
            const stage: Konva.Stage = stageRef.current;
            const oldScale = stage.scaleX();
            const pointerPos: Vector2d = stage.getPointerPosition()!;
            const mousePointTo = {
                x: (pointerPos.x - stage.x()) / oldScale,
                y: (pointerPos.y - stage.y()) / oldScale,
            };

            // Determine the zoom direction based on the sign of deltaY
            const zoomDirection = event.evt.deltaY > 0 ? -1 : 1;
            const newScale = oldScale * Math.pow(scaleBy, zoomDirection);

            stage.scale({ x: newScale, y: newScale });

            const newPos = {
                x: pointerPos.x - mousePointTo.x * newScale,
                y: pointerPos.y - mousePointTo.y * newScale,
            };

            stage.position(newPos);
            stage.batchDraw();
        }
    }

    return (
        <div className="canvas">
            <Stage 
            width={window.innerWidth} 
            height={window.innerHeight} 
            draggable 
            ref={stageRef} 
            onWheel={zoomStage}>
                <Layer>
                    <Rect width={50} height={50} x={300} y={300} fill='red' perfectDrawEnabled={true} />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
