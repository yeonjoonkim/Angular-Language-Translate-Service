import { Injectable } from '@angular/core';
import { OpenAiService } from '../open-ai/open-ai.service';
import { TextTransformService } from '../text-transform/text-transform.service';

export interface ILanguageTranslateResult{
  english: string;
  japanese: string;
  chinese: string;
  korean: string;
}

@Injectable({
  providedIn: 'root'
})

export class LanguageTranslateService {
  private readonly language = {
    english: 'English',
    korean: 'Korean',
    traditionalChinese: 'Traditional Chinese',
    japanese: 'Japanese'
  };
  private readonly correctGrammer: string = 'Correct grammar '
  private readonly translateTo: string = 'Translate to ';
  private readonly returnAs: string = 'return as ';
  private readonly singleString: string = 'a single String Value.';

  //command
  private readonly correctGrammerThenTranslateTo: string = this.correctGrammer + " and " +this.translateTo;
  private readonly returnAsSingleString: string = this.returnAs + this.singleString;
  private readonly convertJSON: string = " convert into JSON file";
  private readonly allLanguage: string = this.language.english + "," + this.language.korean + "," + this.language.traditionalChinese + "," + this.language.japanese;
  private readonly jsonFormat: string = 'as {"english":"translatedValue","korean":"translatedValue","chinese":"translatedValue","japanese":"translatedValue"}';

  constructor(private openAi: OpenAiService, private textTransform: TextTransformService) {
  }


  /** This will trigger open ai api to retreive the translate the sentence to all languages as a JSON format*/
  public async getTranslatedSentenceAllLanguages(sentence: string): Promise<ILanguageTranslateResult>{
    let commandFormat = this.textTransform.setCommandSentenceFormat(sentence);
    let command = this.correctGrammerThenTranslateTo + this.allLanguage + this.convertJSON + this.jsonFormat + commandFormat;
    let response: string = await this.openAi.receiveResult(command);
    let jsonFormat: ILanguageTranslateResult = this.setLanguageTranslateResult(response);

    return jsonFormat;
  }


  /** This will trigger open ai api to retreive the translate the sentence to English */
  public async getTranslateToEnglish(sentence: string): Promise<string>{
    //initial command prompt
    let commandSentence = this.textTransform.setCommandSentenceFormat(sentence);
    let command = this.correctGrammerThenTranslateTo + this.language.english + commandSentence + this.returnAsSingleString;
    let response = await this.openAi.receiveResult(command);
    let result: string = this.textTransform.deleteSpacesString(response);

    return result;
  }


  /** This will trigger open ai api to retreive the translate the sentence to Korean */
  public async getTranslateToKorean(sentence: string): Promise<string>{
    //initial command prompt
    let commandSentence = this.textTransform.setCommandSentenceFormat(sentence);
    let command = this.correctGrammerThenTranslateTo + this.language.korean + commandSentence + this.returnAsSingleString;
    let response = await this.openAi.receiveResult(command);
    let result: string = this.textTransform.deleteSpacesString(response);

    return result;
  }


  /** This will trigger open ai api to retreive the translate the sentence to Traditional Chinese */
  public async getTranslateToTraditionalChinese(sentence: string): Promise<string>{
    //initial command prompt
    let commandSentence = this.textTransform.setCommandSentenceFormat(sentence);
    let command = this.correctGrammerThenTranslateTo + this.language.traditionalChinese + commandSentence + this.returnAsSingleString;
    let response = await this.openAi.receiveResult(command);
    let result: string = this.textTransform.deleteSpacesString(response);

    return result;
  }


  /** This will trigger open ai api to retreive the translate the sentence to Japanese*/
  public async getTranslateToJapanese(sentence: string): Promise<string>{
    //initial command prompt
    let commandSentence = this.textTransform.setCommandSentenceFormat(sentence);
    let command = this.correctGrammerThenTranslateTo + this.language.japanese + commandSentence + this.returnAsSingleString;
    let response = await this.openAi.receiveResult(command);
    let result: string = this.textTransform.deleteSpacesString(response);

    return result;
  }


  /** This will return result if it occured an error, will receive empty value else return response as JSON format*/
  private setLanguageTranslateResult(response: string): ILanguageTranslateResult{
    let result: ILanguageTranslateResult = {
      english: '',
      japanese: '',
      korean: '',
      chinese: '',
    };

    try{
      result = JSON.parse(response)
    }
    catch(err){
      //Todo: Please modify the error message to be notification or alert user.
      console.log(err)
    }
    return result;
  }

}
