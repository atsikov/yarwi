import { ComponentChild, ComponentChildren, h } from "preact";
import { TreeNodeView } from "../generic/tree/node/TreeNodeView";

export class DOMTreeNode extends TreeNodeView<string> {
    protected getFolderIcon(expanded: boolean): ComponentChild {
        return expanded ? "-" : "+";
    }

    protected getCollapsedContent(value: string): ComponentChild {
        return <span>{value}</span>;
    }

    protected getExpandedContent(value: string, children: ComponentChildren): ComponentChild {
        return (
            <div>
                {`<${value}>`}
                <div style={{ paddingLeft: "10px" }}>{children}</div>
                {`</${value}>`}
            </div>
        );
    }
}
