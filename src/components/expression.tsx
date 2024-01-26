import React from "react";

interface ExpressionProps {
    condition: boolean;
    children: React.ReactNode;
}

const Expression: React.FC<ExpressionProps> = ({
    condition,
    children,
}) => (condition ? <>{children}</> : <></>);

export { Expression };