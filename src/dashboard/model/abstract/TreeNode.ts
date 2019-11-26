export class TreeNode<T> {
    public readonly value: T;
    public readonly key: string | undefined;

    private parent: TreeNode<T> | undefined;
    private readonly children: Array<TreeNode<T>> = [];

    constructor(value: T, key?: string) {
        this.value = value;
        this.key = key;
    }

    public hasChildren(): boolean {
        return !!this.children.length;
    }

    public getFirstChild(): TreeNode<T> | undefined {
        return this.children[0];
    }

    public getChildAt(i: number): TreeNode<T> | undefined {
        return this.children[i];
    }

    public getAdjacentChild(): TreeNode<T> | undefined {
        if (!this.parent) {
            return undefined;
        }

        const index = this.parent.children.indexOf(this);
        return this.parent.children[index + 1];
    }

    public getParent(): TreeNode<T> | undefined {
        return this.parent;
    }

    public attach(parent: TreeNode<T>) {
        if (this.parent) {
            this.detach();
        }

        this.parent = parent;
        parent.children.push(this);
    }

    public appendChild(child: TreeNode<T>): TreeNode<T> {
        if (child.parent) {
            child.detach();
        }

        this.children.push(child);
        child.parent = this;

        return child;
    }

    public appendChildAt(child: TreeNode<T>, index: number): TreeNode<T> {
        if (child.parent) {
            child.detach();
        }

        this.children.splice(index, 0, child);
        child.parent = this;

        return child;
    }

    public detach() {
        if (!this.parent) {
            return;
        }

        const parentChildren = this.parent.children;
        const index = parentChildren.indexOf(this);
        if (index > -1) {
            parentChildren.splice(index, 1);
        }

        this.parent = undefined;
    }

    public removeChild(child: TreeNode<T>): TreeNode<T> {
        const index = this.children.indexOf(child);
        this.removeChildAt(index);

        return child;
    }

    public removeChildAt(index: number): TreeNode<T> | undefined {
        if (index < 0 || index > this.children.length) {
            return undefined;
        }

        const child = this.children.splice(index, 1)[0];
        child.parent = undefined;

        return child;
    }
}
