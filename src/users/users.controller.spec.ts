import { yakuInterface } from './users.yakuservice';


class TestYakuService implements yakuInterface {
    constructor(){}
    judgeYaku(card: string): string {}
}

//オブジェクトを生成
const testDate = new TestYakuService()



describe('正常系', () => {
    describe('ロイヤルストレート', () =>{
        it('ロイヤルストレートが入ったときに、ロイヤルストレートが勝つこと', () => {
            expect(testDate).toBe('フラッシュ');
        })
        // it('ロイヤルストレートフラッシュが入ってきたときに、ロイヤルストレートフラッシュになること', () => {
        //     expect("h1,h10,h11,h12,h13").toBe(true);    
        // })
        // it('ストレートフラッシュが入ってきたときに、ロイヤルストレートフラッシュになること', () => {
        //     expect("c7,c6,c5,c4,c3").toBe(true);    
        // })
    })

})

//userscontroller
//入出力をみるのであれば、エラー判定という目的とはまた少し違いそう
//エラー判定が出ているのは異常系？

//上記だと仮定するなら、テストは３種類？
//異常系は、配列全体エラーと、配列要素エラー
  //それぞれの中に、想定しているエラーの種類をitで入れていく？
//正常系は、全てうまくいったとき