import { Stage, Layer, Rect } from 'react-konva';
import "./Canvas.css"
import { useState, useEffect } from 'react';

interface Point {
    x: number;
    y: number;
}

const scaleBy = 1.01;

function getDistance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function Canvas() {


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
