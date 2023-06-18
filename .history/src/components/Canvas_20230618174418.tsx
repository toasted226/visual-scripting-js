import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { Html } from 'react-konva-utils';
import "../styles/Canvas.css";

const scaleBy = 1.05;
const stepSize = 100;
let scale = 1;

function unScale(value: number) {
    return value / scale;
}

function Canvas() {
    const stageRef = useRef(null);
    const gridLayerRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
    
        window.addEventListener('resize', handleResize);
    });

    function drawGrid() {
        if (gridLayerRef.current != null && stageRef.current != null) {
            const stage: Konva.Stage = stageRef.current;
            const grid: Konva.Layer = gridLayerRef.current;
            scale = stage.scaleX();

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
                        stroke: '#1f1f1f',
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
                        stroke: '#1f1f1f',
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
            console.log();
        }
    }

    return (
        <div className="canvas">
            <Stage 
            className='stage'
            width={width} 
            height={width} 
            draggable 
            ref={stageRef} 
            onWheel={zoomStage}
            onMouseMove={drawGrid}
            onDragMove={drawGrid}>
                <Layer ref={gridLayerRef}></Layer>
                <Layer>
                    <Group draggable x={300} y={300}>
                        <Rect 
                        width={120} 
                        height={100} 
                        fill='#1f1f1f' 
                        perfectDrawEnabled={false}
                        cornerRadius={10}
                        shadowEnabled={true}
                        shadowColor='black'
                        shadowOffset={{x: 5, y: 5}}
                        shadowBlur={5}
                        shadowOpacity={0.3}
                        stroke='white'
                        strokeEnabled={true}
                        strokeWidth={1} />
                        <Text 
                        text="Log"
                        fill='white'
                        fontSize={20}
                        x={10}
                        y={10} />
                        <Text text="message"/>
                    </Group>
                </Layer>
            </Stage>
        </div>
    )
}

export default Canvas;