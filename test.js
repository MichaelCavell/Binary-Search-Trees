import { Tree, Node, prettyPrint } from "./app.js";

function generateRandomNumbers(count) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100));
    }
    return randomNumbers;
}  
const initialRandomNumbers = generateRandomNumbers(10);
const initialBinaryTree = new Tree(initialRandomNumbers);
  
prettyPrint(initialBinaryTree.root);

console.log("Is the initial tree balanced?", initialBinaryTree.isBalanced());
  
console.log("\nInitial tree elements:");
console.log("Level order:", initialBinaryTree.levelOrder());
console.log("Pre order:", initialBinaryTree.preOrder());
console.log("Post order:", initialBinaryTree.postOrder());
console.log("In order:", initialBinaryTree.inOrder());
  
initialBinaryTree.insert(110);
initialBinaryTree.insert(120);
initialBinaryTree.insert(130);  
prettyPrint(initialBinaryTree.root);
console.log("\nIs the tree balanced?", initialBinaryTree.isBalanced());
  
initialBinaryTree.rebalance(); 
prettyPrint(initialBinaryTree.root);
console.log("\nIs the tree balanced after rebalancing?", initialBinaryTree.isBalanced());
  
console.log("\nRebalanced tree elements:");
console.log("Level order:", initialBinaryTree.levelOrder());
console.log("Pre order:", initialBinaryTree.preOrder());
console.log("Post order:", initialBinaryTree.postOrder());
console.log("In order:", initialBinaryTree.inOrder());