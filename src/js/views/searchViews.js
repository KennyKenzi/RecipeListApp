import {elements} from './base'
import uuid from 'uuid/v4'

export const getInput=()=>{
    return elements.input.value
}
export const clearInput=()=>{
    return elements.input.value=""
}

export const clearsearch=()=>{
    elements.search_contain.innerHTML=""
}



export const renderSearch=(recipe)=>{

    const entrySearch=(recipe)=>{

        //creating a list for missed ingredients to insert into html
        let missedIngr = ``
        recipe.missedIngredients.forEach(el => {
            missedIngr += `<li><em>${el.originalName}</em></li>`
            return missedIngr
        });

        //creating a list for unused ingredients to insert into html
        let unusedIngr = ``
        recipe.unusedIngredients.forEach(el => {
            unusedIngr += `<li><em>${el.originalName}</em></li>`
            return unusedIngr
        });

 
        const markup =`
        
        <a class="card ingredient-ind" href="#${recipe.id}">
            <span class="dot my-2">
              <div class="likes" id="likes"> ${recipe.likes} </div> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            </span>
            <img class="card-img-top cardImage" style="border-radius: 50%; margin: auto; width: 50%"  src="${recipe.image}" alt="${recipe.title}">
            <div class="card-body" >
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text cd-text">
            <object><a href=# data-bs-toggle="popover" data-bs-html="true" data-bs-trigger="hover" title="Missed Ingredients"  data-bs-content="<ul>${missedIngr}</ul>" tabindex="-1">${recipe.missedIngredientCount}</a></object>
                more ingredients needed
                </p>
                <p class="card-text">
                <object><a href=# data-bs-toggle="popover" data-bs-html="true" data-bs-trigger="hover" title="Unused Ingredients"  data-bs-content="<ul>${unusedIngr}</ul>" tabindex="-1">${recipe.unusedIngredients.length}</a></object>
                unused ingredients
                </p>
            </div>
        </a> 
        `

        elements.search_contain.insertAdjacentHTML('beforeend', markup)
    }

    recipe.forEach(el => {
        entrySearch(el)
    });


}

export const renderFavourites=(recipe)=>{

    const entrySearch=(recipe)=>{

        const markup =`
        
        <a class="card ingredient-ind" href="#${recipe.id}">
            <span class="dot my-2">
              <div class="likes" id="likes"> ${recipe.healthScore} </div> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            </span>
            <img class="card-img-top cardImage" style="border-radius: 50%; margin: auto; width: 50%"  src="${recipe.image}" alt="${recipe.title}">
            <div class="card-body" >
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text cd-text">
                </p>
            </div>
        </a> 
        `

        elements.search_contain.insertAdjacentHTML('beforeend', markup)
    }

    recipe.forEach(el => {
        entrySearch(el)
    });


}


