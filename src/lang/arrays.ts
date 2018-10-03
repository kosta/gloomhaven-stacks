// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function removeFromArray(a, v) {
  while (true) {
    let i = a.indexOf(v);
    if (i === -1) {
      return;
    }
    a.splice(i, 1);
  }
}

export function partition(size, array) {
  const partitions = [];
  let nextPartitionStart = 0;
  let nextPartitionEnd = size;

  while (nextPartitionStart < array.length) {
    partitions.push(array.slice(nextPartitionStart, nextPartitionEnd));
    nextPartitionStart += size;
    nextPartitionEnd += size;
  }

  return partitions;
}
