export interface Node {
    id: number;
    details: NodeDetails;
    connections: Connection[];
}

export interface Connection {
    id: string;
    from: Node;
    to: string;
}

export interface NodeDetails {
    label: string;
    nodeType: NodeType;
    inputs: Input[];
    outputs: Output[];
    description: string;
    code: string;
    position: Position;
}

export interface Position {
    x: number;
    y: number;
}

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

export enum NodeTypeEnum {
    FunctionCall,
    VariableDeclaration,
    MathematicalOperator,
    LogicalOperator,
    ComparisonOperator,
    Conditional,
}
