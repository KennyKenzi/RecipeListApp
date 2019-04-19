import { elements } from "./base";

export const renderList=(item)=>{


    const markup = `
    <li class="shopping__item" id="${item.id}">  
    <input class="shp_lst" type="number" value=${item.count}></input>
    <p>${item.ingredient}</p>
    <button type="button" class="close close-recipe" aria-label="Close" >
        <span aria-hidden="true">&times;</span>
    </button>
  </li>
  `
  elements.shop_list.insertAdjacentHTML('beforeend', markup)
}

export const deleteItem=(id)=>{

    const itemID = document.querySelector(`#${id}`)
    itemID.parentElement.removeChild(itemID)

}