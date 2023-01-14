export function rangeFromTo(from: number, to: number): Array<number> {
  if (to < from) {
    return []
  }
  return range(from, to - from)
}

export function range(startAt: number, size: number): Array<number> {
  const array = []
  for (let i = startAt; i < startAt + size; ++i) {
    array.push(i)
  }
  return array
}
