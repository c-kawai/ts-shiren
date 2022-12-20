import { Injectable } from '@nestjs/common';
import { CreateReadStreamOptions } from 'fs/promises';
import { InputCardDto } from './dto/input-card.dto';

interface strongInterface{
    judgeStrong(yakuResults): Record<string, boolean>;
  }
  
@Injectable()
export class UsersStrongService implements strongInterface{

  judgeStrong(yakuResults){
    let strongNumber:number;
    let strongNumbers: Record<string, number> = {}
    let strongResult:boolean
    let judgeResult: Record<string, boolean> = {}

    //役に数字を割り当てる
    for(const requestId in yakuResults){
      if (yakuResults[requestId] === 'ハイカード'){
        strongNumber = 1
      } else if (yakuResults[requestId] === 'ワンペア'){
        strongNumber = 2
      } else if (yakuResults[requestId] === 'ツーペア'){
        strongNumber = 3
      } else if (yakuResults[requestId] === 'スリー・オブ・ア・カインド'){
        strongNumber = 4
      } else if (yakuResults[requestId] === 'ストレート'){
        strongNumber = 5
      } else if (yakuResults[requestId] === 'フラッシュ'){
        strongNumber = 6
      } else if(yakuResults[requestId] === 'フルハウス'){
        strongNumber = 7
      } else if (yakuResults[requestId] === 'フォー・オブ・ア・カインド'){
        strongNumber = 8
      } else if (yakuResults[requestId] === 'ストレートフラッシュ'){
        strongNumber = 9
      } else {
        strongNumber = 10
      }
      strongNumbers[requestId] = strongNumber;
    }

    
    // 一番強いのか判定
    for(const requestId in strongNumbers){
        const arrStorngNubers = Object.values(strongNumbers)
        if (strongNumbers[requestId] === Math.max(...arrStorngNubers) ){
          strongResult = true
        } else {
          strongResult = false
        }
        judgeResult[requestId] = strongResult
    }
    return judgeResult;
  }
}