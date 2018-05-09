/* Reference: CLRS3 - Chapter 18 - (499-502)
  It is advised to read the material in CLRS before taking a look at the code.
  */

import { Comparator, Key, Value, Visitor } from './types';
import BTreeNode from './btree_node';

const DEFAULT_COMPARATOR:Comparator<Key> = (a:Key, b:Key) => a - b;

export default class BTree<Key,Value> {

  private root?:BTreeNode<Key,Value>;
  private t:number;
  private comparator:Comparator<Key>;

  constructor(t:number = 8, comparator:Comparator<Key> = DEFAULT_COMPARATOR) {
    this.root = null; // Pointer to root node
    this.t = t;  // Minimum degree
    this.comparator = comparator;
  }

  traverse (visitor:Visitor<Key,Value>):BTree<Key,Value> {
    if (this.root !== null) this.root.traverse(visitor);
    return this;
  }

  // function to search a key in this tree
  search (k:Key) {
    return (this.root === null) ? null : this.root.search(k, this.comparator);
  }

  // The main function that inserts a new key in this B-Tree
  insert (k:Key, value:Value):BTree<Key,Value> {
    const t = this.t;
    // If tree is empty
    if (this.root === null) {
      // Allocate memory for root
      this.root = new BTreeNode<Key,Value>(t, true);
      this.root.keys[0] = k;  // Insert key
      this.root.data[0] = value;
      this.root.n = 1;  // Update number of keys in root
    } else { // If tree is not empty
      const root = this.root;
      const comparator = this.comparator;
      // If root is full, then tree grows in height
      if (root.n === 2 * t - 1) {
        // Allocate memory for new root
        const s = new BTreeNode<Key,Value>(t, false);
        // Make old root as child of new root
        s.C[0] = root;

        // Split the old root and move 1 key to the new root
        s.splitChild(0, root, t);

        // New root has two children now.  Decide which of the
        // two children is going to have new key
        let i = 0;
        if (comparator(s.keys[0], k) < 0) i++;
        s.C[i].insertNonFull(k, value, comparator, t);

        // Change root
        this.root = s;
      } else {  // If root is not full, call insertNonFull for root
        root.insertNonFull(k, value, comparator, t);
      }
    }
    return this;
  }

  // The main function that removes a new key in thie B-Tree
  remove (k:Key):BTree<Key,Value> {
    if (this.root === null) {
      throw new Error("The tree is empty");
    }

    // Call the remove function for root
    this.root.remove(k, this.comparator, this.t);

    // If the root node has 0 keys, make its first child as the new root
    //  if it has a child, otherwise set root as NULL
    if (this.root.n === 0) {
      const tmp = this.root;
      if (this.root.leaf) this.root = null;
      else                this.root = this.root.C[0];
    }

    return this;
  }

  keys(): Array<Key>  {
    const keys:Array<Key> = [];
    this.traverse((key:Key) => keys.push(key));
    return keys;
  }


  entries(): Array<Value> {
    const values:Array<Value> = [];
    this.traverse((key:Key, value:Value) => values.push(value));
    return values;
  }
}
