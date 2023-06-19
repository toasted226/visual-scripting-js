export type Node = {
    [key in NodeType]: boolean;
};

export enum NodeType {
    FunctionCall,
    VariableDeclaration,
    MathematicalOperator,
    LogicalOperator,
    ComparisonOperator,
}