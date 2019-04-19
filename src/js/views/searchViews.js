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


    const entrySerach=(recipe)=>{
        
        // const markup =`
        // <a class="card ingredient-ind" href="#${uuid()}">
    
        //     <img class="card-img-icon" src="${recipe.thumbnail}">
        //     <div class="card-body">
        //         <h5 class="card-title">${recipe.title}</h5>
        //         <p class="card-text">${recipe.href}</p>
        //     </div>
        // </a> 
        // `
        const cutnumb=(numb)=>{
            return Math.trunc(numb)
        }
        const markup =`
        
        <a class="card ingredient-ind" href="#${recipe.recipe_id}">
            <span class="dot">${cutnumb(recipe.social_rank)}</span>
                <img class="card-img-icon"  src="${recipe.image_url}" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.publisher}</p>
                </div>
        </a> 
        `
        elements.search_contain.insertAdjacentHTML('beforeend', markup)
    }

    recipe.forEach(el => {
        entrySerach(el)
    });


}


