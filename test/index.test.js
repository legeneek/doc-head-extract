import extractHead from '../dist/bundle'

test('extract no heading html get empty array', () => {
  let res = extractHead('<p>test</p>')
  expect(res).toEqual([])
})

test('extract multiply heading', () => {
  let res = extractHead(
    `
    <h1 id="h1">heading1</h1>
    <h2>heading 1-1</h2>
    <p>a paragraph</p>
    <h1>heading2</h1>
    `
  )
  expect(res).toEqual(
    [
      {
        name: 'heading1',
        anchor: 'h1',
        depth: 1,
        sub: [
          {
            name: 'heading 1-1',
            anchor: undefined,
            depth: 2,
            sub: []
          }
        ]
      },
      {
        name: 'heading2',
        anchor: undefined,
        depth: 1,
        sub: []
      }
    ]
  )
})
