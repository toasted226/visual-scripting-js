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
    parent: string; // The group this node falls under, ex. console would be the parent of console.log()
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
    type: string; // Should this be necessary for compilation?
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

// These interfaces are going to be used to create objects that will be used to create the AST 
// (should we use an AST or just compile directly from the DAG?)

// We will manually create different kinds of nodes, temporarily as a single array of objects
// Will eventually be a json file that will be read in

export const nodes: NodeDetails[] = [
    {
        parent: "console",
        label: "console log",
        nodeType: {
            [NodeTypeEnum.FunctionCall]: true,
            [NodeTypeEnum.VariableDeclaration]: false,
            [NodeTypeEnum.MathematicalOperator]: false,
            [NodeTypeEnum.LogicalOperator]: false,
            [NodeTypeEnum.ComparisonOperator]: false,
            [NodeTypeEnum.Conditional]: false,
            [NodeTypeEnum.Keyword]: false,
        },
        inputs: [
            {
                label: "input",
                type: "any",
            },
        ],
        outputs: [],
        description: "Prints the input to the console",
        code: "console.log(%input%)",
        position: {
            x: 0,
            y: 0,
        },
    },
    {
        parent: "basic",
        label: "console.log()",
        nodeType: {
            [NodeTypeEnum.FunctionCall]: true,
            [NodeTypeEnum.VariableDeclaration]: false,
            [NodeTypeEnum.MathematicalOperator]: false,
            [NodeTypeEnum.LogicalOperator]: false,
            [NodeTypeEnum.ComparisonOperator]: false,
            [NodeTypeEnum.Conditional]: false,
            [NodeTypeEnum.Keyword]: false,
        },
        inputs: [
            {
                label: "input",
                type: "any",
            },
        ],
        outputs: [],
        description: "Prints the input to the console",
        code: "console.log(%input%)",
        position: {
            x: 0,
            y: 0,
        },
    },
];
