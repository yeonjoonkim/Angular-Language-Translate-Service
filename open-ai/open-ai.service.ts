import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OpenAiService {
  //API
  private readonly openAiUrl: string = 'https://api.openai.com/v1/completions';
  private readonly apiKey: string = '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';

  //API DEFAULT PARAM
  private readonly defaultParams = {
    model: "text-davinci-003",
    temperature: 0.4,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  //API DEFAULT HEADER
  private readonly headers =  {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey
  }

  constructor() {}

  /**This function is trigger api to receive answer from open ai */
  public async receiveResult(command: string): Promise<string>{
    //Set api request
    let param = { ...this.defaultParams, ...{prompt: command}};
    let requestOptions = this.setReqeustOptions(param);

    //fetch api with request
    let response = await fetch(this.openAiUrl, requestOptions);

    //retreive response
    let data = await response.json();
    let apiResult: string = data.choices[0].text;

    return apiResult;
  }

  /**Set open ai api reqeust option */
  private setReqeustOptions(param: {}): {}{
    let requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(param)
    };

    return requestOptions;
  }

}

