import axios from 'axios';
import {API, cAPI, mURL,mURL2, proxy} from './../config'
import {elements} from './../views/base'

export default class Search {
    constructor(query){
        this.query = query
    }

    async getRecipe(){

        try{
    
            const gtapi = await axios(`${proxy}${mURL}/search?key=${cAPI}&q=${this.query}`)
            //const getapi = await axios(`${proxy}${mURL2}/?i=${this.query}`)
    
            this.recipees = gtapi.data.recipes
            //this.recipees = getapi.data.results
            
            //console.log(this.recipees)
    
            } catch(err){
                console.log(err)
            } 
    
    }


}
