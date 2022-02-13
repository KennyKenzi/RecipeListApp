import "../css/style.css";
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import{elements, elementsList,renderLoader,removeLoader} from './views/base';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import * as listViews from './views/listViews';
import {displaySelectedRecipe } from './../js/config'





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

        //triggering tooltip/popover from her because it doesn't work in the index.html for some reason
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
        })

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

    // display list of favourites
    const displayList=async()=>{
        //get the list run through it
        
        var favouritesList = JSON.parse(localStorage.getItem('likes'))



       if(favouritesList.length > 0){
        let display =[]
        //clearsearch list if anything is there
        searchViews.clearsearch()
         //prep UI
        renderLoader(elements.search_contain)

        
        for(const el of favouritesList){
            var tempRec =  await displaySelectedRecipe(el)       
            display.push(tempRec.data)   
        }

    //     await favouritesList.forEach(async el => {
    //        var tempRec =  await displaySelectedRecipe(el)       
    //         display.push(tempRec.data)   
    //    })
    
        removeLoader(elements.search_contain)

        searchViews.renderFavourites(display)
        //display in search box

       }

      

    }

    document.querySelector(`.${elementsList.like_list}`).addEventListener("click", displayList)





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

                state.rec.formatIng()

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
        
        }else if(e.target.matches(`.like_btn, .like_btn *`)){

          //  myStorage = window.localStorage;

            //storing favourite's id in local storage
            var currentId = state.rec.id

            var tempArray = []

            //if local storage doesnt have a "likes" entry, push currentRecipe Id into temp array and store in local storage
            if(localStorage.getItem('likes') === null){
                tempArray.push(currentId)
                localStorage.setItem('likes', JSON.stringify(tempArray))
            }else{
            //if local storage has a "likes" entry, 
            
                //get it, store it in temp array 
                tempArray = JSON.parse(localStorage.getItem('likes'))

                //check if current is already stored inside tempArray
                if(tempArray.includes(currentId)){
                    tempArray.splice(tempArray.indexOf(currentId), 1)
                    localStorage.setItem('likes', JSON.stringify(tempArray))

                }else{
                    //modify it by pushing new recipeID into array list
                    tempArray.push(currentId)
                    //then store it in local storage
                    localStorage.setItem('likes', JSON.stringify(tempArray))
                }

              
            }

            state.rec.checkFavourites(currentId)
            recipeViews.clearRes() 
            recipeViews.renderRec(state.rec)
        }
        // else if(e.target.matches(`.like_list, .like_list *`)){
        //     displayList()

        // }




    
    })




    elements.shop_contain.addEventListener('click', e=>{

            if(e.target.matches(`${elementsList.close}, ${elementsList.close} *`)){
                
                const ids  = e.target.closest(`${elementsList.close}, ${elementsList.close} *`).parentElement.id
                console.log(ids)
                state.list.deleteItem(ids)
                listViews.deleteItem(ids)

            }else if(e.target.matches(`${elementsList.clear_btn},${elementsList.clear_btn}`)){
                
                
                state.list.item.forEach(el => {
                   
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

    state.rec.ingredients.forEach(el => {
        
        const item = state.list.addItem(el.count, el.ingredient, el.id)
        listViews.renderList(item)
    });
}else{
   // console.log('statelist', state.list.item)
    state.rec.ingredients.forEach(el=>{
    // for(const el of state.rec.ingredients){

        //var item =[]
        var alreadyExist = false
        var lists = state.list.item

        for(const list of lists){  
            if(el.id === list.id){
               alreadyExist = true;   
               break
            }
           
        }
        if(alreadyExist){
            state.list.updateItem(el)
            listViews.updateList(el)
            

        }else{
             const item = state.list.addItem(el.count, el.ingredient, el.id)
             listViews.renderList(item)

        }
        //render new updated list
        
    })

  
}

//add to shoppinglist


}

