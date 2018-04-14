import Nightmare from 'nightmare'
import assert from 'assert'

Nightmare.action('getTexts', function(selector, done) {
  this.evaluate_now((selector) => {
    console.log('hoge');
    return [].slice.call(document.querySelectorAll(selector)).map((e) => e.innerText)
  }, done, selector)
})

describe('じゃんけんアプリ', () => {
  const nightmare = Nightmare({show: false})
  const URL = 'http://localhost:8080/'

  it('グーをクリックすると対戦が行われ、対戦結果が表示される', (done) => {
    nightmare
    .goto(URL)
    .click('#btn-guu')
    .getTexts('tbody td')
    .then((texts) => {
      console.log(texts);
      const [, human, computer, judgement] = texts
      assert.equal(human, 'グー')
      assert.ok(computer.match(/^(グー|チョキ|パー)$/))
      assert.ok(judgement.match(/^(勝ち|引き分け|負け)$/))
      done()
    })
  })
})
