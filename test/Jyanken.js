import assert from 'assert'
import Jyanken from '../src/Jyanken'

describe('Jyanken', () => {
  const jyanken = new Jyanken()

  describe('勝敗の判定の正しいか', () => {
    describe('コンピューターがグーの場合', () => {
      it('人間がグーなら引き分け', () => {
        jyanken.pon(0, 0)
        assert.equal(jyanken.getScores()[0].judgement, 0)
      })
      it('人間がチョキなら負け', () => {
        jyanken.pon(1, 0)
        assert.equal(jyanken.getScores()[0].judgement, 2)
      })
      it('人間がパーなら勝ち', () => {
        jyanken.pon(2, 0)
        assert.equal(jyanken.getScores()[0].judgement, 1)
      })
    })
  });

})
