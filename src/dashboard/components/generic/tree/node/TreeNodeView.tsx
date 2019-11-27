import {
    Component,
    ComponentChild,
    ComponentChildren,
    Fragment,
    h,
    JSX,
} from "preact";

import * as styles from "./TreeNodeView.css";

interface TreeNodeViewProps<T> {
    value: T;
}

interface TreeNodeViewState {
    expanded: boolean;
}

export type TreeNodeViewCtor<T> = new(props?: TreeNodeViewProps<T>) => TreeNodeView<T>;

export class TreeNodeView<T> extends Component<TreeNodeViewProps<T>, TreeNodeViewState> {
    public state = {
        expanded: false,
    };

    public render() {
        const { value, children } = this.props;
        const { expanded } = this.state;

        const clickHandler = children ? this.onClick : undefined;

        return (
            <div data-role="tree-node" className={styles.treeNode}>
                <div onClick={clickHandler}>
                    {children && this.getFolderIcon(expanded)}
                </div>
                {
                    expanded
                        ? this.getExpandedContent(value, children)
                        : this.getCollapsedContent(value)
                }
            </div>
        );
    }

    protected getFolderIcon(expanded: boolean): ComponentChild {
        return null;
    }

    protected getCollapsedContent(value: T): ComponentChild {
        return null;
    }

    protected getExpandedContent(value: T, children: ComponentChildren): ComponentChild {
        return <Fragment>{value} -> {children}</Fragment>;
    }

    private onClick = (e: JSX.TargetedEvent) => {
        this.setState(
            ({ expanded }) => ({ expanded: !expanded }),
        );
    }
}
