import axios from 'axios';
import {API,cAPI, mURL,mURL2, proxy} from './../config'
import {elements} from './../views/base'


export default class Recipe {
    constructor(id){
        this.id = id
    }

    async getRec(){

        try{
    
            const getapi = await axios(`${proxy}${mURL}/get?key=${cAPI}&rId=${this.id}`)
            //const getapi = await axios(`${proxy}${mURL2}/?i=${this.query}`)
    
            //this.recipees = gtapi.data.recipes
            const recipees = getapi.data.recipe
            this.ingredients = recipees.ingredients
            this.title= recipees.title
            this.publisher= recipees.publisher
            this.image= recipees.image_url
            this.rank= recipees.social_rank

        //    console.log(recipees)
    
            } catch(err){
                console.log(err)
            }
    
    }

    formatIng(){ 

        let newIngred= this.ingredients.map(el =>{
           
            
                const fin= el.split(" ")
             
                    
                const stuff={}
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

}