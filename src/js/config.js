import axios from 'axios';


export const aAPI = 'xxxxxxxxxxxxxxxxxx';
export const bAPI = 'xxxxxxxxxxxxxxxxxx';
export const cAPI = 'xxxxxxxxxxxxxxxxxx';
export const eAPI = 'xxxxxxxxxxxxxxxxxx';
export const fAPI = 'xxxxxxxxxxxxxxxxxx';

export const mURL = 'xxxxxxxxxxxxxxxxxx';
export const proxy = 'xxxxxxxxxxxxxxxxxx';

export const API2 = 'xxxxxxxxxxxxxxxxxx';
export const mURL2 = 'xxxxxxxxxxxxxxxxxx';

export const spoonacularURL = 'xxxxxxxxxxxxxxxxxx';
export const spoonacularAPI = 'xxxxxxxxxxxxxxxxxx';
export const spoonacularAPI2 = 'xxxxxxxxxxxxxxxxxx';
export const spoonacularAPI3 = 'xxxxxxxxxxxxxxxxxx'



export const displaySelectedRecipe =(id)=>{

    
    return axios(`${spoonacularURL}/recipes/${id}/information?apiKey=${spoonacularAPI}`) 

}


export const searchForRecipe =(query)=>{
    
    let inputs = query
    let ingredient

    //split ingredients if there are multiple and returns 'ingredient'
    if(inputs.includes(",")){
        const inputsArray = inputs.split(',')
        const arrayNum = inputsArray.length
      
        ingredient = inputsArray[0]
        for (let i= 1; i < inputsArray.length; i++) {
          ingredient += `,+${inputsArray[i].trim()}`
        }

    }else{
        ingredient =  query 
    }

    return axios(`${spoonacularURL}/recipes/findByIngredients?apiKey=${spoonacularAPI}&ingredients=${ingredient}&number=10`)

}