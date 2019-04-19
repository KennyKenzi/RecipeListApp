
export const elements={
    search_btn: document.querySelector('.search__btn'),
    search_contain: document.querySelector('.search__container'),
    input: document.querySelector('.form-control'),
    recipe: document.querySelector('.ingredient-ind'),
    recipe_contain: document.querySelector(".recipe__contain"),
    recipe_list: document.querySelector(".recipe__ingredient-list"),
    card_contain: document.querySelector(".card_contain"),
    minus: document.querySelector("p.button_minus"),
    plus: document.querySelector(".button_plus"),
    servings: document.querySelector(".servings"),
    servingid: document.querySelector("#serve"),
    servContain: document.querySelector(".servs"),
    shopping_btn: document.querySelector(".add_shopping list")
}
export const elementsList={
    minus: ".button_minus",
    plus: ".button_plus"
}

export const renderLoader = (parent)=>{
    const markup= `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `
    parent.insertAdjacentHTML('beforeend', markup)
}
export const removeLoader = (parent)=>{
    parent.innerHTML=""
}