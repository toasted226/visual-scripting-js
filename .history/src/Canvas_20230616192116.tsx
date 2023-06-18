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
            console.log("rendering grid");

            grid.clear();
            grid.destroyChildren();
            grid.clipWidth(0);

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
            };

            let gridOffset = {
                x: Math.ceil(unScale(stage.position().x) / stepSize) * stepSize,
                y: Math.ceil(unScale(stage.position().y) / stepSize) * stepSize,
            };
            let gridRect = {
                x1: -gridOffset.x,
                y1: -gridOffset.y,
                x2: unScale(width) - gridOffset.x + stepSize,
                y2: unScale(height) - gridOffset.y + stepSize
            };
            let fullRect = {
                x1: Math.min(stageRect.x1, gridRect.x1),
                y1: Math.min(stageRect.y1, gridRect.y1),
                x2: Math.max(stageRect.x2, gridRect.x2),
                y2: Math.max(stageRect.y2, gridRect.y2)
            };

            // set clip function to stop leaking lines into non-viewable space.
            grid.clip({
                x: viewRect.x1,
                y: viewRect.y1,
                width: viewRect.x2 - viewRect.x1,
                height: viewRect.y2 - viewRect.y1
            });
            
            const 
                // find the x & y size of the grid
                xSize = (fullRect.x2 - fullRect.x1),
                ySize = (fullRect.y2 - fullRect.y1), 
                
                // compute the number of steps required on each axis.
                xSteps = Math.round(xSize/ stepSize), 
                ySteps = Math.round(ySize / stepSize);
            
            // draw vertical lines
            for (let i = 0; i <= xSteps; i++) {
                grid.add(
                    new Konva.Line({
                        x: fullRect.x1 + i * stepSize,
                        y: fullRect.y1,
                        points: [0, 0, 0, ySize],
                        stroke: 'rgba(0, 0, 0, 0.2)',
                        strokeWidth: 1,
                    })               
                );
            }
            //draw Horizontal lines
            for (let i = 0; i <= ySteps; i++) {
                grid.add(
                    new Konva.Line({
                        x: fullRect.x1,
                        y: fullRect.y1 + i * stepSize,
                        points: [0, 0, xSize, 0],
                        stroke: 'rgba(0, 0, 0, 0.2)',
                        strokeWidth: 1,
                    })
                );
            }
            
            grid.batchDraw();
        }
    }
    drawGrid();

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
                <Layer ref={gridLayerRef}></Layer>
                <Layer>
                    <Rect width={50} height={50} x={300} y={300} fill='red' perfectDrawEnabled={true} />
                    <Rect width={50} height={50} x={5000} y={300} fill='blue' perfectDrawEnabled={true} />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
