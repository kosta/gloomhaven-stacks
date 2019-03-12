// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
export function shuffle<T>(array: Array<T>): Array<T> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function removeFromArray<T>(array: Array<T>, v: T): void {
  while (true) {
    let i = array.indexOf(v);
    if (i === -1) {
      return;
    }
    array.splice(i, 1);
  }
}

export function partition<T>(partitionSize: number, array: Array<T>): Array<Array<T>> {
  const partitions = [];
  let nextPartitionStart = 0;
  let nextPartitionEnd = partitionSize;

  while (nextPartitionStart < array.length) {
    partitions.push(array.slice(nextPartitionStart, nextPartitionEnd));
    nextPartitionStart += partitionSize;
    nextPartitionEnd += partitionSize;
  }

  return partitions;
}

export function unique<T>(array: Array<T>): Array<T> {
  return [...new Set(array)];
}