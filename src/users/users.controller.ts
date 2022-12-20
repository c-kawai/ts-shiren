import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';
import { InputCardDto } from './dto/input-card.dto';
import { UsersStrongService } from './users.strongservice';
import { UsersYakuService } from './users.yakuservice';
import { resourceLimits } from 'worker_threads';
import { first } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersYakuService: UsersYakuService,
        private readonly usersStrongService: UsersStrongService
        ){}
    
    @Post()
    // create(@Body('hands', ParseIntPipe) hands: string[]){
      create(@Body() inputCards: InputCardDto[]){
        
////////////////////////////////////////////////////////////////////////////////////////////配列全体のエラー分岐
        const firstErrorMessages: string[] = []; 
        if (Array.isArray(inputCards["hands"]) === false){
          firstErrorMessages.push("手札は配列で入力してください。")
        }
        if (inputCards["hands"].length !== 4){
          firstErrorMessages.push("手札は4セット入力してください。")
        }

        //配列全体のエラーと正常値を分ける
        let firstCheckedCards: string[];
        if (firstErrorMessages.length === 0){
          firstCheckedCards = inputCards["hands"];
        } else {
          return firstErrorMessages;
        }
/////////////////////////////////////////////////////////////////////////////////////////////配列の中身のエラー分岐
        const cards: Record<string, string> = {}

        cards["01-00002-01"] = firstCheckedCards[0];
        cards["01-00002-02"] = firstCheckedCards[1];
        cards["01-00002-03"] = firstCheckedCards[2];
        cards["01-00002-04"] = firstCheckedCards[3];

      
        
      
        let okCards: Record<string, string> = {};
        let errorCards:Record<string, string> = {};
        let error: Record<string, string> = {};
        let errors: Record<string, string>[] = [];
        let yakuResults: Record<string, string> = {};
        let strongResults: Record<string, boolean> = {};
        let result: {} = {};
        let results: Record<string, string>[] = [];
        

        for(const requestId in cards) {
          // TODO: エラー判定
          //本当はもう少し細かくエラーを見たい。時間があったらやる
          const pattern = /^[chsd]([1-9]|1[0-3])\,[chsd]([1-9]|1[0-3])\,[chsd]([1-9]|1[0-3])\,[chsd]([1-9]|1[0-3])\,[chsd]([1-9]|1[0-3])$/g
          if (pattern.test(cards[requestId]) === true){
            okCards[requestId] = cards[requestId];
          }else {
            errorCards[requestId] = cards[requestId];
            // TODO: エラー返却値組み立て
            error = {
              "requestId": requestId,
              "cards": cards[requestId],
              "errorMessage": "カードの値が正常に入力されていません"
            }
            errors.push(error);
          }
        }
/////////////////////////////////////////////////////////////////////////////////////////////役・強さ判定とその結果
        // TODO: 役判定
        for(const requestId in okCards){
          const yakuResult = this.usersYakuService.judgeYaku(okCards[requestId]);
          yakuResults[requestId]= yakuResult;
        }
        
        
        //TODO: 強さ判定
        strongResults = this.usersStrongService.judgeStrong(yakuResults);

        
        for(const requestId in okCards){
         // TODO: 正当な返却値組み立て
         result = {
           "requestId": requestId,
           "cards": okCards[requestId],
           "yaku": yakuResults[requestId],
           "strongest": strongResults[requestId]
           }
         results.push(result)

        }
// //////////////////////////////////////////////////////////////////////////////////////////返却値組み立て
        const response = {
          "results": results,
          "errors": errors
        }
        return response;
    }
}
