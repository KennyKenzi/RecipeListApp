import {elements} from './base'
import { parse } from 'path';

export const clearRes=()=>{
  elements.recipe_contain.innerHTML=""
}

export const getServings=()=>{

  const curr = parseInt(document.querySelector(".servings").innerHTML.replace(' Servings',''))
  
  return curr
}

export const updateServing=(curr, upd)=>{

  let newServ

  if (upd === 'minus'){
    newServ = curr - 1
    
  }else if(upd === 'add'){
    newServ = curr + 1
  }
  document.querySelector(".servings").innerHTML = newServ + " Servings"
}

export const timing=(recipe)=>{
//at 4minutes per ingredient
const time = (recipe.ingredients.length)* 4
return time
}

export const ingred=(recipe)=>{
  let ingr = '';
  for(let i = 0; i < recipe.ingredients.length; i++){
      ingr += `<li class="recipe__item">${recipe.ingredients[i].count} ${recipe.ingredients[i].ingredient}</li>`;
}
return ingr
}


export const renderRec=(recipe)=>{

  

        const markup1=`
        <img class="img-top" src="${recipe.image}" alt="${recipe.title}">
                  
        <div class="container rounded">                 
       
          <div class="container" >
            <h1 class="recipe__item">
                <span>${recipe.title}</span>
            </h1>
            
            <div class="timing">
            <p  style="float:left"><img src="https://img.icons8.com/material-outlined/24/000000/alarm-clock.png">${timing(recipe)} Minutes</span></p>
            </div>
            
            <br>
           <br>
          <div class="container servs" style:"float:left">

            <span ><img src="https://img.icons8.com/android/24/000000/user.png">
            <span class="servings" id="serve" >4 Servings</span>
            <span type="button" class="button_minus" ><img src="https://img.icons8.com/material-sharp/24/000000/minus.png"></span>
            <span type="button" class="button_plus" ><img src="https://img.icons8.com/material-sharp/24/000000/plus.png"></span>
            <img style="float:right" src="https://img.icons8.com/material/24/000000/hearts-filled.png">
           
            
            </span>

           </div> 
           
          </div>
          <br>
          <br>
          <div class="recipe__ingredients"></div>
              <ul class="recipe__ingredient-list">
              ${ingred(recipe)} 
                </ul>
              <div type= "button" class="add_shopping list">
                  Add to Shopping List
                  <img src="https://img.icons8.com/material-rounded/24/000000/shopping-cart.png" alt="shopping cart">
              </div>
              <br>

        </div>
        `
        elements.recipe_contain.insertAdjacentHTML('beforeend', markup1)


}





