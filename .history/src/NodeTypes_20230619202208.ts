// Important for doing DAG traversal in Rust
export interface Node {
    id: number;
    details: NodeDetails;
    adjacentNodes: Node[];
    visited: boolean;
    inProgress: boolean;
}

// Information about the node for frontend and eventual compilation
export interface NodeDetails {
    label: string;
    nodeType: NodeType;
    inputs: Input[];
    outputs: Output[];
    description: string;
    code: string;
    position: Position;
}

// Position of the node on the canvas
export interface Position {
    x: number;
    y: number;
}

// Input and output types
export interface Input {
    label: string;
    type: string;
}

export interface Output {
    label: string;
    type: string;
}

export type NodeType = {
    [key in NodeTypeEnum]: boolean;
};

// Node types
export enum NodeTypeEnum {
    FunctionCall, // ex. console.log()
    VariableDeclaration, // ex. let x = 5
    MathematicalOperator, // ex. x + 5
    LogicalOperator, // ex. x && y
    ComparisonOperator, // ex. x > y
    Conditional, // ex. if (x > y) { ... }
    Keyword, // ex. return
}
