import { Component, h } from "preact";

import { DOMTree } from "./components/dom/DOMTree";
import { DOMTreeNode } from "./components/dom/DOMTreeNode";
import { TreeNode } from "./model/abstract/TreeNode";

const data = new TreeNode("root", "root");
const first = new TreeNode("first", "first");
const second = new TreeNode("second", "second");
const third = new TreeNode("third", "third");
const firstFirst = new TreeNode("firstFirst", "firstFirst");
const firstSecond = new TreeNode("firstSecond", "firstSecond");
const thirdFirst = new TreeNode("thirdFirst", "thirdFirst");
const thirdSecond = new TreeNode("thirdSecond", "thirdSecond");

data.appendChild(first);
data.appendChild(second);
data.appendChild(third);
first.appendChild(firstFirst);
first.appendChild(firstSecond);
third.appendChild(thirdFirst);
third.appendChild(thirdSecond);

export class Dashboard extends Component {
    public render() {
        return (
            <DOMTree
                value={data}
                nodeRenderer={value => value}
                TreeNodeComponent={DOMTreeNode}
            />
        );
    }
}
