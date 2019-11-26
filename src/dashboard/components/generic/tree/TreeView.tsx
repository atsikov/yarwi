import { Component, ComponentChild, h } from "preact";

import { TreeNode } from "../../../model/abstract/TreeNode";

import { TreeNodeViewCtor } from "./node/TreeNodeView";

interface TreeViewProps<T> {
    value: TreeNode<T>;
    nodeRenderer: (value: T) => ComponentChild;
    TreeNodeComponent: TreeNodeViewCtor<T>;
}

export class TreeView<T> extends Component<TreeViewProps<T>> {
    public render() {
        return <div>
            {this.getChildren(this.props.value)}
        </div>;
    }

    private getChildren(root: TreeNode<T> | undefined): ComponentChild {
        if (!root) {
            return null;
        }

        const { TreeNodeComponent } = this.props;

        const node: TreeNode<T> = root;
        if (node.hasChildren()) {
            const children: ComponentChild[] = [];
            let childNode = node.getFirstChild();

            // tslint:disable-next-line: no-conditional-assignment
            while (childNode) {
                children.push(this.getChildren(childNode));
                childNode = childNode.getAdjacentChild();
            }
            return <TreeNodeComponent key={node.key} value={node.value}>{children}</TreeNodeComponent>;
        } else {
            return <TreeNodeComponent key={node.key} value={node.value} />;
        }

    }
}
