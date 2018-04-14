import Nightmare from 'nightmare'
import assert from 'assert'

describe('じゃんけんアプリ', () => {
  const nightmare = Nightmare({show: false})

  it('アクセスすると「じゃんけんぽん！」と表示されている', (done) => {
    nightmare
    .goto('http://localhost:8080/')
    .evaluate(() => {
      return document.querySelector('h1').innerText
    })
    .then((title => {
      assert.equal(title, 'じゃんけんぽん！')
      done()
    }))
  })
})
