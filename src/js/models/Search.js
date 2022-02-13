import {searchForRecipe} from './../config'
import { search } from '../../test'


export default class Search {
    constructor(query){
        this.query = query
    }

    async getRecipe(){

        try{

            const gtapi = await searchForRecipe(this.query)
            //API returns maximum of 10 recipes because 10 was set as a parameter below.
            
            this.recipees = gtapi.data
            // return this.recipees = search.data
            // console.log(this.recipees)
        } catch(err){
            console.log(err)
        } 
    
    }


}
