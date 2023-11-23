export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(data) {
        this.root = this.buildTree(data);
    }
    
    buildTree(data) {
        function buildTreeHelper(sortedData, start, end) {
            if (start > end) {
                return null;
            }
            
            const mid = Math.floor((start + end) / 2);
            const node = new Node(sortedData[mid]);
            
            node.left = buildTreeHelper(sortedData, start, mid - 1);
            node.right = buildTreeHelper(sortedData, mid + 1, end);
            
            return node;
        }
        
        const sortedData = this.removeDuplicatesAndSort(data);
        return buildTreeHelper(sortedData, 0, sortedData.length - 1);
    }
    
    removeDuplicatesAndSort(data) {
        const uniqueData = [];
        
        for (const value of data) {
            if (!uniqueData.includes(value)) {
                uniqueData.push(value);
            }
        }
        uniqueData.sort((a, b) => a - b);
        return uniqueData;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
      }
      
    insertNode(root, value) {
        if (root === null) {
            return new Node(value);
        }
        
        if (value < root.data) {
            root.left = this.insertNode(root.left, value);
        } else if (value > root.data) {
            root.right = this.insertNode(root.right, value);
        }
    
        return root;
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (root === null) {
            return null;
        }

        if (value < root.data) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            root.data = this.findMinValue(root.right);
            root.right = this.deleteNode(root.right, root.data);
        }

        return root;
    }

    findMinValue(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node.data;
      }
      
    find(data) {
        let current = this.root

        while(current) {
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            } else {
                return current;
            }
        }
    }

    levelOrder(callback) {
        let queue = [this.root];
        let levelOrderTraverse = []     
        while (queue.length != 0) {
            let node = queue.pop()
            if (callback) {
                callback(node);
            }
            levelOrderTraverse.push(node.data);
            if (node.left) queue.unshift(node.left)
            if (node.right) queue.unshift(node.right)
        }
        return levelOrderTraverse;
    }

    inOrder(callback) {
        const inOrderTraverse = [];
        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                if (callback) callback(node);
                inOrderTraverse.push(node.data);
                traverse(node.right);
            }
        }
        traverse(this.root);

        return inOrderTraverse;
    }

    preOrder(callback) {
        const preOrderTraverse = [];
        const traverse = (node) => {
            if (node) {
                if (callback) callback(node);
                preOrderTraverse.push(node.data);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);

        return preOrderTraverse;
    }

    postOrder(callback) {
        const postOrderTraverse = [];
        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                if (callback) callback(node);
                postOrderTraverse.push(node.data);
            }
        }
        traverse(this.root);

        return postOrderTraverse;
    }

    height(node) {    
        if (node === null) {
            return -1;
        }
        
        const selectedNode = this.find(node);
        let left = selectedNode.left;
        let right = selectedNode.right;
        let lHeight = -1;
        let rHeight = -1;

        if (left) {
            lHeight = this.height(left.data);
        }

        if (right) {
            rHeight = this.height(right.data);
        }
        
        if (lHeight > rHeight) {
            return (lHeight + 1);
        } else {
            return (rHeight + 1);
        }
    }

    depth(node) {
        let current = this.root
        let depthCount = 0;
        while(current) {
            if (node < current.data) {
                current = current.left;
                depthCount++
            } else if (node > current.data) {
                current = current.right;
                depthCount++
            } else {
                return depthCount;
            }
        }
    }

    isBalanced() {
        const current = this.root

        const lNode = (current.left).data
        const rNode = (current.right).data

        const lHeight = this.height(lNode);
        const rHeight = this.height(rNode);

        if (Math.abs(lHeight - rHeight) <= 1) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        const values = this.inOrder();
        this.root = this.buildTree(values);
    }

}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};