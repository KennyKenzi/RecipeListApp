import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import{elements, elementsList,renderLoader,removeLoader} from './views/base';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import * as listViews from './views/listViews';




const state= {};
focus(elements.input)
 
//SEARCH CONTROL
const controlSearch = async () =>{

    //clear UI
    
    searchViews.clearsearch()

    //get Input
    const query = searchViews.getInput()
    searchViews.clearInput()
    //make call
    if(query){
        state.res = new Search(query)

        //prep UI
        renderLoader(elements.search_contain)
        //get Results 
        const re  = await state.res.getRecipe()

        removeLoader(elements.search_contain)

        if(state.res.recipees.length > 0){
        //render Results
        searchViews.renderSearch(state.res.recipees)
        }else{
            
            alert('No recipes matched your search')
        }
        
    }else{
        alert('No search criteria, please enter an ingredient')
    }
   

}

    elements.search_btn.addEventListener("click", controlSearch)
    elements.input.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { 
            controlSearch()
        }
    });




// console.log(window.location.hash)


//RECIPE CONTROLLER

    const recipeFunc=async ()=>{

    //get id
    const id =window.location.hash.replace("#", "")
    
     if(id){
        //renderLoader
            recipeViews.clearRes()
            renderLoader(elements.recipe_contain)   

        //get recipe
                state.rec = new Recipe(id)
                await state.rec.getRec()
               // console.log('before', state.rec)

        //calc time @ 5minites per ingredient

                state.rec.formatIng()
              //  console.log('after',state.rec)
        //remove Loader
            removeLoader(elements.recipe_contain)

        //renderRecipes
            recipeViews.renderRec(state.rec)

          }
          
}



window.addEventListener("hashchange", recipeFunc)

    
elements.recipe_contain.addEventListener('click', e=>{

    const curr = recipeViews.getServings()

    if (e.target.matches(`${elementsList.minus}, ${elementsList.minus} *`)) {

            //get curr serving
        if (curr>1){
            recipeViews.clearRes()            
            state.rec.updateIngredient(curr ,'minus')
    
            recipeViews.renderRec(state.rec)
            recipeViews.updateServing(curr, 'minus')
                
        }
            

    }else if(e.target.matches(`${elementsList.plus}, ${elementsList.plus} *`)){
           
            recipeViews.clearRes()
            state.rec.updateIngredient(curr ,'add')
           
            recipeViews.renderRec(state.rec)
            recipeViews.updateServing(curr, 'add')

    }else if (e.target.matches(`${elementsList.shopping_btn}, ${elementsList.shopping_btn} *`)) {
            moveToShopping()
    
    }
    })
    elements.shop_contain.addEventListener('click', e=>{

            if(e.target.matches(`${elementsList.close}, ${elementsList.close} *`)){
                
                const ids  = e.target.closest(`${elementsList.close}, ${elementsList.close} *`).parentElement.parentElement.id
                state.list.deleteItem(ids)
                listViews.deleteItem(ids)
            }else if(e.target.matches(`${elementsList.clear_btn},${elementsList.clear_btn}`)){
                
                console.log('here',state.list.item)
                
                state.list.item.forEach(el => {
                   
                   console.log(el.id)
                    elements.shop_list.innerHTML =""
                    state.list.item = []
                    
                    
                });
            }
        }
    )



//SHOPPING LIST CONTROLLER

const moveToShopping = ()=>{


//add list to state
if (!state.list){
    state.list = new List
}

state.rec.ingredients.forEach(el => {

    const item = state.list.addItem(el.count, el.ingredient)
    listViews.renderList(item)
});
//add to shoppinglist


}

