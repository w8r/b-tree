const { assert } = require('chai');
const BTree = require('../dist/btree.umd');

const vars = [1,3,7,10,11,13,14,15,18,16,19,24,25,25,26,21,4,5,20,22,2,17,12,6];

describe('B-Tree', () => {

  it ('should insert and sort', () => {
    const t = new BTree(3);
    for (let i = 0; i < vars.length; i++) t.insert(vars[i]);

    const res = t.keys();

    assert.equal(res.length, vars.length);
    assert.deepEqual(res, vars.slice().sort((a, b) => a - b));
  });

  it ('should remove keys', () => {
    const t = new BTree(3);
    for (let i = 0; i < vars.length; i++) t.insert(vars[i]);

    t.remove(16);
    assert.notInclude(t.keys(), 16);
  });

  it ('traverse', () => {
    const t = new BTree();
    const keys = new Array(100).fill(0).map((_, i) => i);
    const values = keys.slice().reverse();

    for (let i = 0; i < keys.length; i++) t.insert(keys[i], values[i]);

    let i = 0;
    t.traverse((k, v) => {
      assert.equal(k, keys[i]);
      assert.equal(v, values[i]);
      i++;
    });
  });


  it ('duplicate keys', () => {
    const t = new BTree();
    const keys = new Array(100).fill(0).map((_, i) => i);
    const values = keys.slice().reverse();

    for (let i = 0; i < keys.length; i++) t.insert(keys[i], values[i]);
  });
});
