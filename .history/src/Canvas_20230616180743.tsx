import { Stage, Layer, Rect } from 'react-konva';
import { useRef, useState } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import "./Canvas.css";

const scaleBy = 1.15;
const gridWidth = 100;
const gridHeight = 100;
const grid = [["red", "yellow"], ["green", "blue"]];

function Canvas() {
    const stageRef = useRef(null);

    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const startX = Math.floor((-stagePos.x - window.innerWidth) / gridWidth) * gridWidth;
    const endX =
        Math.floor((-stagePos.x + window.innerWidth * 2) / gridWidth) * gridWidth;

    const startY =
        Math.floor((-stagePos.y - window.innerHeight) / gridHeight) * gridHeight;
    const endY =
        Math.floor((-stagePos.y + window.innerHeight * 2) / gridHeight) * gridHeight;

    const gridComponents = [];
    var i = 0;
    for (var x = startX; x < endX; x += gridWidth) {
        for (var y = startY; y < endY; y += gridHeight) {
        if (i === 4) {
            i = 0;
        }

        const indexX = Math.abs(x / gridWidth) % grid.length;
        const indexY = Math.abs(y / gridHeight) % grid[0].length;

        gridComponents.push(
            <Rect
            x={x}
            y={y}
            width={gridWidth}
            height={gridHeight}
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
            onDragEnd={e => {
                setStagePos(e.currentTarget.position());
              }}
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
