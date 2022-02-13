import axios from 'axios';
import {displaySelectedRecipe} from './../config'
import {elements} from './../views/base'
import {recipe, search} from './../../test'


export default class Recipe {
    constructor(id){
        this.id = id
    }
 
    async getRec(){

        try{
            
            const recipees = await displaySelectedRecipe(this.id)
           // const recipees = recipe
            

            this.ingredients = recipees.data.extendedIngredients
            this.title= recipees.data.title
            this.publisher= recipees.data.creditsText
            this.image= recipees.data.image
            this.rank= recipees.data.healthScore
            this.timing = recipees.data.readyInMinutes
            this.serving = recipees.data.servings
            this.vegetarian = recipees.data.vegetarian
            this.vegan = recipees.data.vegan
            this.id = recipees.data.id
            
    
            } catch(err){
                console.log(err)
            }

        this.checkFavourites(this.id)
    
    }

    formatIng(){ 

        let newIngred= this.ingredients.map(el =>{
           
            
                const fin= el.original.split(" ")
             
                    
                const stuff={}
                stuff.id = el.id

                //if first is a number
                 if(parseInt(fin[0])){
                    stuff.count = fin[0]
                    stuff.ingredient = fin.slice(1,fin.length).join(' ')
                
                    //if first is a fraction
                    if(fin[0].includes("/")){
                
                        if(fin[0].includes("-")){
                            const swap = fin[0].replace("-", "+")
                            stuff.count = eval(swap)
                        }else{
                            stuff.count = eval(fin[0])
                        }
                        stuff.ingredient = fin.slice(1,fin.length).join(' ')
                        }
                    //if second is a number
                    if(parseInt(fin[1])){
                        if(fin[1].includes("/")){
                            stuff.count = eval(fin[0])+ eval(fin[1])
                            stuff.ingredient = fin.slice(1,fin.length).join(' ')
                        }else{
                            console.log("lemme see")
                        }
                
                    }else{
                        stuff.ingredient =fin.slice(1,fin.length).join(' ')
                    }
                
                    //if first is not a number
                    }else {
                        stuff.count="";
                        stuff.ingredient= fin.join(" ")
                    }
                        
                    return stuff
    
              

        });
          this.ingredients= newIngred
          //stuff.count= this.count

    }


    updateIngredient(curr, upd){
        
        let newcurr

        if(upd=="minus"){
           newcurr = curr-1
        }else if(upd==="add"){
            newcurr = curr+1
        }

        let newcount = this.ingredients.map(el=>{
            if(el.count !==  ""){
                const test = (parseFloat(el.count)/curr)*newcurr
                return test 
            }else return ""
            
        })
       
        
        for(var i=0; i<this.ingredients.length; i++){
            this.ingredients[i].count = newcount[i]
            
        }  

    }


    checkFavourites(id){

        let storageStuff = JSON.parse(localStorage.getItem('likes'))

        
        var hearts
      
        if(storageStuff == null){
          hearts = `<img class="like_btn" style="float:right" src="https://img.icons8.com/material/24/000000/hearts-filled.png"></img>`

        }else if(storageStuff.includes(id)){
          hearts = `<img class="like_btn" style="float:right" src="https://img.icons8.com/material/24/4F917C/hearts-filled.png"></img>`

        }else{
           hearts = `<img class="like_btn" style="float:right" src="https://img.icons8.com/material/24/000000/hearts-filled.png"></img>`

        }
      
        this.hearts = hearts
        // document.querySelector(elementsList.plus).src = hearts

    }

}