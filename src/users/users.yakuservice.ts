import { Injectable } from '@nestjs/common';
import { CreateReadStreamOptions } from 'fs/promises';
import { InputCardDto } from './dto/input-card.dto';


export interface yakuInterface{
  judgeYaku(card: string): string
}




@Injectable()
export class UsersYakuService implements yakuInterface {
  
    judgeYaku(card: string){
        
        //配列から数字だけ取り出して、昇順に並べる
        const numbers: number[] = card.match(/\d+/g).map(Number);
        const sortedNumbers: number[] = numbers.sort(function(a, b){
        return a-b;
        });

        //配列からスートだけ取り出して、重複を消す
        const symbols = card.replace(/[^a-z]/g, '').split('')
        const setSymbols = Array.from(new Set(symbols))

        
        

        //ストレートかどうか（数字が連続しているかどうか）
        let straight: boolean;
        if(
        (sortedNumbers[4] === sortedNumbers[3] + 1 && sortedNumbers[3] === sortedNumbers[2] + 1 && sortedNumbers[2] === sortedNumbers[1] + 1 &&sortedNumbers[1] === sortedNumbers[0] + 1) || sortedNumbers == [1, 10, 11, 12, 13]
        ){
        straight = true;
        }else{
        straight = false;
        }

        //フラッシュかどうか（スートが全て同じかどうか）
        let flash: boolean;
        if(setSymbols.length == 1){
        flash = true;
        }else{
        flash = false;
        }

        //数字の同じセットがいくつあるかどうか
        const setNumbers = Array.from(new Set(sortedNumbers));
        const countBox = [];
        for(const uniqueNumber of setNumbers){
        countBox.push (sortedNumbers.filter((sortedNumber)=> {return sortedNumber === uniqueNumber}).length);
        }
        

        //役判定
        const sortedCountBox: number[] = countBox.sort(function(a, b){
        return a-b;
        });

        
        if (sortedCountBox === [1, 4]){
        yakuResult = 'フォー・オブ・ア・カインド';
        } else if (sortedCountBox === [2, 3]) {
        yakuResult = 'フルハウス';
        } else if (sortedCountBox === [1, 1, 3]){
        yakuResult = 'スリー・オブ・ア・カインド';
        } else if (sortedCountBox === [1, 2, 2]){
        yakuResult = 'ツーペア';
        } else if (sortedCountBox === [1, 1, 1, 2]){
        yakuResult = 'ワンペア';
        } else{
        if (sortedNumbers === [1, 10, 11, 12, 13] && flash === true){
            yakuResult = 'ロイヤルストレートフラッシュ';
        } else if(straight === true && flash === true){
            yakuResult = 'ストレートフラッシュ' ;
        } else if (flash === true){
            yakuResult = 'フラッシュ';
        } else if (straight === true){
            yakuResult = 'ストレート';
        } else {
            yakuResult = 'ハイカード';
        }
        }
        return yakuResult
    }
}

