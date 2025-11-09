import {ApiResponse} from '../2/types'

export const mocktestapi = (text:string) : Promise<ApiResponse> => {
  console.log("Mock Api response", text);

  const faketerm = text.split(' ')[2] || 'concept';

  const fakeResponse: ApiResponse = {
    summary: `This section was about ${text.slice(0, 20)}...`,
    keyTerms: [ 
      {term: faketerm, definition: "A mock definition for this key term." },
      {term: "Hackathon", definition: "haha"}
    ], 
    simplified: `In simple terms, the professor just said: "${text.slice(0, 30)}..."`
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeResponse);
    }, 1500); //1.5 
  });
};

export const analyzeLecture = (text:string) : Promise<ApiResponse> => {
  //APi stuff
  return mocktestapi(text);
};