import { ArrayMaxSize, ArrayMinSize, ArrayNotContains, ArrayNotEmpty, IsArray, IsString, max, min } from "class-validator";

export class InputCardDto {
  readonly "hands": string[];
}
