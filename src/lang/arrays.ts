export function rangeFromTo(from, to){
  if (to < from) {
    return [];
  }
  return range(from, to - from);
}

export function range(startAt, size) {
  const array = [];
  for (let i = startAt; i < startAt + size; ++i) {
    array.push(i)
  }
  return array
}
