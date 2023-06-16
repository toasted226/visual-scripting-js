import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"
import { useRef } from 'react';
import { event } from '@tauri-apps/api';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

const scaleBy = 1.01;

function getDistance(p1: Vector2d, p2: Vector2d) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: Vector2d, p2: Vector2d) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function Canvas() {
    const stageRef = useRef(null);
    let lastCenter = null;
    let lastDist = 0;

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
            const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({ x: newScale, y: newScale });
            const newPos = {
                x: pointerPos.x - mousePointTo.x * newScale,
                y: pointerPos.y - mousePointTo.y * newScale,
            }
            stage.position(newPos);
            stage.batchDraw();
        }
    }

    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight} draggable ref={stageRef} onWheel={zoomStage}>
                <Layer>
                    <Rect width={50} height={50} x={300} y={300} fill='red' />
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;
