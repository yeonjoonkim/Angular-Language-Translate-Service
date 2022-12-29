import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextTransformService {

  constructor() {
  }


  /** This will retreive capitalzed word as a single string value.
   * Recommand to use a single string value.
  */
  public getCapitalzedWord(str: string): string{
    let lowcaseValue: string = str.toLowerCase();
    let capitalzedWord: string = str.charAt(0).toUpperCase() + lowcaseValue.slice(1);
    return capitalzedWord;
  }

  /** This will retreive title format string.
   * "eXample exAmple" => "Example Example".
  */
  public getTitleFormat(str: string): string{
    let titleFormat: string = '';
    let words: Array<string> = this.getContainWordList(str);
    words.forEach((word, index) => {
      if(index === 0){
        let capitalzedWord = this.getCapitalzedWord(word);
        titleFormat += capitalzedWord;
      }else{
        let capitalzedWord = this.getCapitalzedWord(word);
        titleFormat += " " + capitalzedWord;
      }
    });

    return titleFormat;
  }

  /** This will retreive sentence format string.
   * "eXample exAmple" => "Example example."
   * "THIS IS SAMPLE" => "This is sample."
  */
  public setSentenceFormat(str: string): string{
    let sentenceFormat: string = '';
    let words: Array<string> = this.getContainWordList(str);
    let includeFinalised: boolean = words.length > 1 ? words[words.length - 1].includes('.') : true;

    words.forEach((word, index) => {
      if(index === 0){
        let capitalzedWord: string = this.getCapitalzedWord(word);
        sentenceFormat += capitalzedWord;
      }
      else{
          let lowercaseWord: string = this.getLowercaseWord(word);
          sentenceFormat += " " + lowercaseWord;
      }
    });

    if(!includeFinalised){
      sentenceFormat += ".";
    }

    return sentenceFormat;
  }

  public setCommandSentenceFormat(sentence: string){
    return '"' + sentence + '"';
  }

  public deleteSpacesString(str: string): string{
    return str.replace(/(\r\n|\n|\r|\"|)/gm,"");
  }

  public getLowercaseWord(str: string): string{
    return str.toLowerCase();
  }

  public getUppercaseWord(str: string): string{
    return str.toUpperCase();
  }

  public getContainWordList(str: string):  Array<string> {
    return str.split(" ").filter(str => str.length > 0);
  }

}
