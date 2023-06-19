export interface Node {
    type: NodeType;
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