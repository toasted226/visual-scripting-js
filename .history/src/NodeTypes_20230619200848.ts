export interface NodeDetails {
    label: string;
    nodeType: NodeType;
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