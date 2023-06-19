export interface Node {
    [key: string]: string;
    name: string;
    nodeType: NodeType;
}

export enum NodeType {
    FunctionCall,
    VariableDeclaration,
    MathematicalOperator,
    LogicalOperator,
    ComparisonOperator,
}