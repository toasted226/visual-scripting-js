export interface NodeDetails {
    label: string;
    nodeType: NodeType;
    inputs: Input[];
    outputs: Output[];
}

export interface Input {
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
}