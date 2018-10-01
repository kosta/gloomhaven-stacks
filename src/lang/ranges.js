export function rangeFromTo(from, to) {
  if (to < from) {
    return [];
  }
  return range(from, to - from);
}

export function range(startAt, size) {
  return [...Array(size).keys()].map(i => i + startAt);
}
