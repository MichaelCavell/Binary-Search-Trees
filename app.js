export class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
}

export class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      if (array.length === 0) {
        return null;
      }
  
      const middleIndex = Math.floor(array.length / 2);
      const rootNode = new Node(array[middleIndex]);
  
      rootNode.left = this.buildTree(array.slice(0, middleIndex));
      rootNode.right = this.buildTree(array.slice(middleIndex + 1));
  
      return rootNode;
    }

    insert(value) {
        this.root = this.insertRec(this.root, value);
    }
    
    insertRec(node, value) {
        if (node === null) {
            return new Node(value);
        }
    
        if (value < node.data) {
            node.left = this.insertRec(node.left, value);
        } else if (value > node.data) {
            node.right = this.insertRec(node.right, value);
        }
    
        return node;
      }    

    delete(value) {
        this.root = this.deleteRec(this.root, value);
    }
    
    deleteRec(node, value) {
        if (node === null) {
            return null;
        }
        
        if (value < node.data) {
          node.left = this.deleteRec(node.left, value);
        } else if (value > node.data) {
          node.right = this.deleteRec(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            
            node.data = this.getMinValue(node.right);
            node.right = this.deleteRec(node.right, node.data);
        }

        return node;
    }

    find(value) {
        return this.findRec(this.root, value);
    }
    
    findRec(node, value) {
        if (node === null || node.data === value) {
            return node;
        }
    
        if (value < node.data) {
          return this.findRec(node.left, value);
        } else {
          return this.findRec(node.right, value);
        }
    }
    
    levelOrder(callback) {
        const result = [];
        const queue = [this.root];
    
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (callback) {
                callback(current);
            } else {
                result.push(current.data);
            }
            
            if (current.left !== null) {
                queue.push(current.left);
            }
            
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        
        return result;
    }   
    
    inOrder(callback) {
        const result = [];
        
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                if (callback) {
                    callback(node);
                } else {
                    result.push(node.data);
                }
                traverse(node.right);
            }
        };
        
        traverse(this.root);
        return result;
    }
    
    preOrder(callback) {
        const result = [];
        
        const traverse = (node) => {
            if (node !== null) {
                if (callback) {
                    callback(node);
                } else {
                    result.push(node.data);
                }
                traverse(node.left);
                traverse(node.right);
            }
        };
        
        traverse(this.root);
        return result;
    }
    
    postOrder(callback) {
        const result = [];
    
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                if (callback) {
                    callback(node);
                } else {
                    result.push(node.data);
                }
            }
        };
    
        traverse(this.root);
        return result;
    }   
    
    height(node = this.root) {
        if (node === null) {
          return -1;
        }
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    }  
    
    depth(node) {
        return this.depthRec(this.root, node);
    }
    
    depthRec(current, target, currentDepth = 0) {
        if (current === null) {
            return -1; // Node not found
        }

        if (current === target) {
            return currentDepth;
        }

        const leftDepth = this.depthRec(current.left, target, currentDepth + 1);
        const rightDepth = this.depthRec(current.right, target, currentDepth + 1);

        return Math.max(leftDepth, rightDepth);
    }  
    
    isBalanced() {
        return this.checkBalanced(this.root);
    }
    
    checkBalanced(node) {
        if (node === null) {
            return true;
        }
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        if (Math.abs(leftHeight - rightHeight) <= 1 &&
        this.checkBalanced(node.left) &&
        this.checkBalanced(node.right)) {
            return true;
        }
    
        return false;
    }

    rebalance() {
        const values = this.inOrder();
        this.root = this.buildTree(values);
      }
    
    getMinValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
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