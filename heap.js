const type = {
  MAX: "MAX",
  MIN: "MIN",
};

class Heap {
  constructor(arr, type) {
    this.heap = Array.isArray(arr) ? [...arr] : [arr]; // Clone array to avoid modifying original
    this.type = type;
    this.createHeap();
  }

  createHeap() {
    if (!this.heap || !this.type) {
      throw new Error("No data to heapify");
    }
    const startIndex = Math.floor(this.heap.length / 2) - 1;
    for (let i = startIndex; i >= 0; i--) {
      this.heapify(i);
    }
  }

  parent(index) {
    return index > 0 ? Math.floor((index - 1) / 2) : null;
  }

  left(index) {
    const position = 2 * index + 1;
    return position < this.heap.length ? position : null;
  }

  right(index) {
    const position = 2 * index + 2;
    return position < this.heap.length ? position : null;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  heapify(index) {
    let parent = index;
    const left = this.left(index);
    const right = this.right(index);

    if (this.type === type.MAX) {
      if (left !== null && this.heap[left] > this.heap[parent]) {
        parent = left;
      }
      if (right !== null && this.heap[right] > this.heap[parent]) {
        parent = right;
      }
    } else {
      if (left !== null && this.heap[left] < this.heap[parent]) {
        parent = left;
      }
      if (right !== null && this.heap[right] < this.heap[parent]) {
        parent = right;
      }
    }

    if (parent !== index) {
      this.swap(index, parent);
      this.heapify(parent);
    }
  }

  insert(value) {
    this.heap.push(value);
    let index = this.heap.length - 1; 
    let parent = this.parent(index);

    while (
      parent !== null &&
      ((this.type === type.MAX && this.heap[index] > this.heap[parent]) ||
        (this.type === type.MIN && this.heap[index] < this.heap[parent]))
    ) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }

  delete() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return root;
  }
}

// TESTING THE CODE
const arr = [1, 2, 3, 5, 4, 6, 2, 1, 1, 3];
const heap = new Heap(arr, type.MAX);