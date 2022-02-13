import {elements, elementsList} from './base'

export const clearRes=()=>{
  elements.recipe_contain.innerHTML=""
}



export const getServings=()=>{
  const curr = parseInt(document.querySelector('.servings').innerHTML.replace(' Servings',''))
  return curr
}



export const updateServing=(curr, upd)=>{
  let newServ
  if (upd === 'minus'){
    newServ = curr - 1  
  }else if(upd === 'add'){
    newServ = curr + 1
  }
  document.querySelector('.servings').innerHTML = newServ + " Servings"
}


export const formatCount=(numb)=>{
  let str = numb.toString()
  if (str.includes('.')){
  
    let newnum = numb.toFixed(2)
    return newnum
  }else return numb
}


export const ingred=(recipe)=>{
  let ingr = '';
  for(let i = 0; i < recipe.ingredients.length; i++){
      ingr += `<li class="recipe__item">${formatCount(recipe.ingredients[i].count)} ${recipe.ingredients[i].ingredient}</li>`;
  }
return ingr
}


export const vegs = (recipe)=>{
    let vees = ''
  if(recipe.vegan){
    vees = `<img src="https://img.icons8.com/ios-glyphs/30/4F917C/vegetarian-mark.png" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" title="Vegan safe" class="m-3"/>`
    if(recipe.vegetarian){
      vees = `<img src="https://img.icons8.com/ios-glyphs/30/4F917C/vegetarian-mark.png" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" title="Vegan safe" class="m-3"/> <img src="https://img.icons8.com/metro/30/4F917C/vegetarian-food.png" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" title="Vegetarian safe" class="m-3"/>`
    }
  }else{
    if(recipe.vegetarian){
      vees = `<img src="https://img.icons8.com/metro/30/4F917C/vegetarian-food.png" data-bs-custom-class="custom-tooltip" data-bs-toggle="tooltip" title="Vegetarian safe" class="m-3"/>`
    }else{
      vees =''
    }
  }

  return  vees
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
            <p  style="float:left"><img src="https://img.icons8.com/material-outlined/24/000000/alarm-clock.png">${recipe.timing} Minutes</span></p>
            </div>
            
            <br>
           <br>
          <div class="container servs" style:"float:left">

            <span ><img src="https://img.icons8.com/android/24/000000/user.png">
            <span class="servings" id="serve" >${recipe.serving} Servings</span>
            <span type="button" class="button_minus" ><img src="https://img.icons8.com/material-sharp/24/000000/minus.png"></span>
            <span type="button" class="button_plus" ><img src="https://img.icons8.com/material-sharp/24/000000/plus.png"></span>
            ${recipe.hearts}
            
                    
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
              <div>
              ${vegs(recipe)}
              </div>
              
              <br>

        </div>
        `
        elements.recipe_contain.insertAdjacentHTML('beforeend', markup1)


}





