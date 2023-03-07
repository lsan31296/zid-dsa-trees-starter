  class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }

    insert(key, value) {
      //If the tree is empty, then this key is being inserted at the root node of the tree
      if (this.key == null) {
        this.key = key;
        this.value = value;
      }//Else if the new key is less than the node's key, then:
      else if (key < this.key) {
        //the new node needs to live in the left hand branch and:
        //if existing node doesn't have a left child, then:
        if (this.left == null) {
          //instantiate and insert new node as left child of that node
          this.left = new BinarySearchTree(key, value, this);
        } else {
          //Otherwise, node has existing left child, so recursively call 'insert()' to insert further down tree
          this.left.insert(key, value);
        }
      }//Similarly, if the new key is greater than the node's key, then:
      else {
        //check for right pointer, if none then:
        if (this.right == null) {
          //instantiate and insert new node as right child of that node
          this.right = new BinarySearchTree(key, value, this);
        } else {
          //Otherwise, node has exisiting right child, so recursively call insert() to insert further down tree
          this.right.insert(key, value);
        }
      }
    }

    find(key) {
      //If the item is found at the root, then return that value
      if (this.key == key) {
        console.log(this);
        return this.value;
      }//Otherwise, if item you are looking for is less than root AND there's an existing left child then:
      else if (key < this.key && this.left) {
        //recursively check its left and/or right child until you find the item
        return this.left.find(key);
      }//Otherwise, if item you are looking for is greater than root AND there's an exisiting right child then:
      else if (key > this.key && this.right) {
        //recursively check its left and/or right child until you find the item
        return this.right.find(key);
      }//You have search the tree and the item isn't in the tree
      else {
        throw new Error('Key Not Found');
      }
    }

    remove(key) {
      //if current node key is equal to key to remove, then:
      if (this.key == key) {
        //if node to remove has left and right children, then:
        if (this.left && this.right) {
          const successor = this.right._findMin();//find minimum in the right subtree of node to remove
          this.key = successor.key;//replace values of properties of node to remove with found minimum props
          this.value = successor.value;//replace values of properties of node to remove with found minimum props
          successor.remove(successor.key);//Now there is a duplicate in the right subtree, remove duplicate node
        }
        //If node to remove only has a left child, then:
        else if (this.left) {
          //replace node with its left child
          this._replaceWith(this.left);
        }
        //If the node only has a right child, then:
        else if (this.right) {
          //replace node with its right child
          this._replaceWith(this.right);
        }
        //Otherwise, the node has no children, then:
        else {
          //remove node and any references to it
          this._replaceWith(null);
        }
      }
      //if key to remove is less than current node key and there is a left child, then:
      else if (key < this.key && this.left) {
        //recursively check its left or right child until you find the item
        this.left.remove(key);
      }
      //if key to remove is greater than current node key and there is a right child, then:
      else if (key > this.key && this.right) {
        //recursively check its left or right child until you find the item
        this.right.remove(key);
      }
      //Otherwise, the key cannot be find, so throw an error
      else {
        throw new Error(`Key Not Found`);
      }
    }

    _replaceWith(node) {
      //if the current node has a parent then:
      if (this.parent) {
        //if current node is the left child of its parent, then:
        if (this == this.parent.left) {
          //set the left child of current node's parent to the node we wish to replace with
          this.parent.left = node;
        }
        //else if current node is the right child of its parent, then:
        else if (this == this.parent.right) {
          //set the right child of current node's parent to the node we wish to replace with
          this.parent.right = node;
        }
        //And, if node we wish to replace with exists, then:
        if (node) {
          //set the parent of the node we wish to replace with, to the current node's parent
          node.parent = this.parent;
        }
      }
      //Otherwise, current node is a root node (no parent), then:
      else {
        //if the node we wish to replace with exists, then:
        if (node) {
          //replace all properties with node we wish to replace with's properties, except for parent
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        }
        //else no replacement node exists, nullify current node
        else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }

    _findMin() {
      //if there is no left child to the current node(minimum value in right subtree), then:
      if (!this.left) {
        //return current node as it is the smallest value
        return this;
      }
      //Otherwise, mpve to the left child of current node and recursively check for a left child
      return this.left._findMin();
    }

    //Depth-First Search
    dfsInOrder(values = []) {
      //First, process the left node recursively
      if (this.left) {
        console.log(`Left child: ${this.left.value}`);
        values = this.left.dfsInOrder(values);
      }

      //Next, process the current node
      console.log(`This: ${this.value}`)
      values.push(this.value);

      //Finally, process the right node recursively
      if (this.right) {
        console.log(`Right Child: ${this.right.value}`);
        values = this.right.dfsInOrder(values);
      }
      return values;
    }

    dfsPreOrder(values=[]) {
      // First, process the current node
      values.push(this.value);

      // Next, process the left node recursively
      if (this.left) {
        values = this.left.dfsPreOrder(values);
      }

      // Finally, process the right node recursively
      if (this.right) {
        values = this.right.dfsPreOrder(values);
      }

      return values;
    }

    dfsPostOrder(values = []) {
      // First, process the left node recursively
      if (this.left) {
        values = this.left.dfsPostOrder(values);
      }

      // Next, process the right node recursively
      if (this.right) {
        values = this.right.dfsPostOrder(values);
      }

      // Finally, process the current node
      values.push(this.value);

      return values;
    }

}

const bst = new BinarySearchTree(5, 5);
bst.insert(2, 2);
bst.insert(20, 20);
bst.insert(1, 1);
bst.insert(4, 4);
bst.insert(15, 15);
bst.insert(21, 21);
bst.insert(10, 10);
bst.insert(17, 17);
bst.insert(25, 25);
console.log(bst);
console.log(bst.dfsInOrder());
console.log(bst.dfsPreOrder());
console.log(bst.dfsPostOrder());