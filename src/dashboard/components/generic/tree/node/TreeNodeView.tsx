import {
    Component,
    ComponentChild,
    ComponentChildren,
    Fragment,
    h,
    JSX,
} from "preact";

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
            <Fragment>
                <span onClick={clickHandler}>{children && this.getFolderIcon(expanded)}</span>
                {
                    expanded
                        ? <div>{this.getExpandedContent(value, children)}</div>
                        : <div>{this.getCollapsedContent(value)}</div>
                }
            </Fragment>
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
