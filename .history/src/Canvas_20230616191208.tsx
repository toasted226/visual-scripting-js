import { Stage, Layer, Rect, Line } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import "./Canvas.css";

const scaleBy = 1.05;
const stepSize = 100;
let scale = 1;

function unScale(value: number) {
    return value / scale;
}

function Canvas() {
    const stageRef = useRef(null);
    const gridLayerRef = useRef(null);

    function drawGrid() {
        if (gridLayerRef.current != null && stageRef.current != null) {
            const stage: Konva.Stage = stageRef.current;
            const grid: Konva.Layer = gridLayerRef.current;
            scale = stage.scaleX();
            const width = window.innerWidth;
            const height = window.innerHeight;

            let stageRect = {
                x1: 0, 
                y1: 0, 
                x2: stage.width(), 
                y2: stage.height(),
                offset: {
                    x: unScale(stage.position().x),
                    y: unScale(stage.position().y),
                }
            },
            // make a rect to describe the viewport
            viewRect = {
                x1: -stageRect.offset.x,
                y1: -stageRect.offset.y,
                x2: unScale(width) - stageRect.offset.x,
                y2: unScale(height) - stageRect.offset.y
            },
            // and find the largest rectangle that bounds both the stage and view rect.
            // This is the rect we will draw on.  
            fullRect = {
                x1: Math.min(stageRect.x1, viewRect.x1),
                y1: Math.min(stageRect.y1, viewRect.y1),
                x2: Math.max(stageRect.x2, viewRect.x2),
                y2: Math.max(stageRect.y2, viewRect.y2)          
            };

            gridOffset = {
                x: Math.ceil(unScale(stage.position().x) / stepSize) * stepSize,
                y: Math.ceil(unScale(stage.position().y) / stepSize) * stepSize,
            };
            gridRect = {
                x1: -gridOffset.x,
                y1: -gridOffset.y,
                x2: unScale(width) - gridOffset.x + stepSize,
                y2: unScale(height) - gridOffset.y + stepSize
            };
            gridFullRect = {
                x1: Math.min(stageRect.x1, gridRect.x1),
                y1: Math.min(stageRect.y1, gridRect.y1),
                x2: Math.max(stageRect.x2, gridRect.x2),
                y2: Math.max(stageRect.y2, gridRect.y2)
            };
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
                <Layer ref={gridLayerRef}>{drawGrid}</Layer>
                <Layer>
                    <Rect width={50} height={50} x={300} y={300} fill='red' perfectDrawEnabled={true} />
                    <Rect width={50} height={50} x={5000} y={300} fill='blue' perfectDrawEnabled={true} />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
