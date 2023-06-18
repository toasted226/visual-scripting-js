import { Stage, Layer, Rect, Line } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import "./Canvas.css";

const scaleBy = 1.05;
const gridStep = 100;

function Canvas() {
    const stageRef = useRef(null);
    const gridLayerRef = useRef(null);

    function drawGrid() {
        if (gridLayerRef.current != null) {
            const grid: Konva.Layer = gridLayerRef.current;

            const xSize = window.innerWidth;
            const ySize = window.innerHeight;
            const xStep = Math.round(xSize / gridStep);
            const yStep = Math.round(ySize / gridStep);


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
