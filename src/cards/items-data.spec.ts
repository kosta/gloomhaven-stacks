import { gloomhavenItems } from 'cards/items-data'

test('provide sub path by item id', () => {
  expect(gloomhavenItems.get(1)).toEqual('items/gloomhaven/1-14/gh-001-boots-of-striding.png')
  expect(gloomhavenItems.get(19)).toEqual('items/gloomhaven/15-21/gh-019-weighted-net.png')
})
