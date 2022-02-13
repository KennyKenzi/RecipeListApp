import { elements } from "./base";

export const renderList=(item)=>{


    const markup = `
    <li class="shopping__item" id="${item.id}">  
        <input class="shp_lst mr-1" type="number" value=${item.count}></input>
        <p style="width: 60%; margin-left: 5%" class="text-start" >${item.ingredient}</p>
        <button type="button" class="btn-close close close-recipe" aria-label="Close" >
        </button>
    </li>
    `
  elements.shop_list.insertAdjacentHTML('beforeend', markup)
}

export const updateList=(item)=>{


    const container = document.getElementById(item.id).children[0].value
    document.getElementById(item.id).children[0].value = Number(container) + Number(item.count)



}

export const deleteItem=(ID)=>{
    const itemID = document.getElementById(ID)
    itemID.parentElement.removeChild(itemID)

}