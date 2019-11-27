import * as classnames from "classnames";
import { ComponentChild, ComponentChildren, h } from "preact";

import { TreeNodeView } from "../generic/tree/node/TreeNodeView";

import * as styles from "./DOMTreeNode.css";

export class DOMTreeNode extends TreeNodeView<string> {
    protected getFolderIcon(expanded: boolean): ComponentChild {
        const expandableClassNames = classnames(
            styles.expandableArrow,
            {
                [styles.expanded]: expanded,
            },
        );
        return <div className={expandableClassNames} />;
    }

    protected getCollapsedContent(value: string): ComponentChild {
        return <div className={styles.header}>{value}</div>;
    }

    protected getExpandedContent(value: string, children: ComponentChildren): ComponentChild {
        return (
            <div className={styles.expandedContainer}>
                {`<${value}>`}
                <div className={styles.content}>
                    <div className={styles.outline} />
                    {children}
                </div>
                {`</${value}>`}
            </div>
        );
    }
}
