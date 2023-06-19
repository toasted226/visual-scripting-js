export interface Node {
    key: string;
    name: string;
    [key in NodeType]: boolean;
}

export enum NodeType {
    FunctionCall,
    VariableDeclaration,
    MathematicalOperator,
    LogicalOperator,
    ComparisonOperator,
}