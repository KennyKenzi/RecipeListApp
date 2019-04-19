import Search from './models/Search';
import{elements, elementsList,renderLoader,removeLoader} from './views/base';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import Recipe from './models/Recipe';


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
 
          console.log('real',state.rec)
}



window.addEventListener("hashchange", recipeFunc)

    
    elements.recipe_contain.addEventListener('click', e=>{

        const curr = recipeViews.getServings()

        if (e.target.matches(`${elementsList.minus}, ${elementsList.minus} *`)) {

            //get curr serving
            if (curr>1){
                recipeViews.clearRes()            
                state.rec.updateIngredient(curr ,'minus')
    
                console.log('second',state.rec)
                recipeViews.renderRec(state.rec)
                recipeViews.updateServing(curr, 'minus')
                
            }
            

        }else if(e.target.matches(`${elementsList.plus}, ${elementsList.plus} *`)){
           
            recipeViews.clearRes()
            state.rec.updateIngredient(curr ,'add')

            console.log('second',state.rec)
            recipeViews.renderRec(state.rec)
            recipeViews.updateServing(curr, 'add')

        }else {
            console.log('none yet')
        }
    
        
    
    })




//SHOPPING LIST CONTROLLER

const moveToShopping = ()=>{

//get list

//add to shoppinglist


}

elements.shopping_btn.addEventListener('click', moveToShopping)