export interface Node {
    [key in NodeType]: boolean;
    name: string;
}

export enum NodeType {
    FunctionCall,
    VariableDeclaration,
    MathematicalOperator,
    LogicalOperator,
    ComparisonOperator,
}