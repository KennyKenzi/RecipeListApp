import uniqid from 'uniqid';


export default class List {
    constructor(){
        this.item = []
    }

    addItem(count, ingredient, id){
        
        const content ={
            id,
            count,
            ingredient
        }

        this.item.push(content)
        return content
    }

    updateItem(stuff){
        
        this.item.map((el)=>{
           
            if(el.id === stuff.id){
                el.count = Number(el.count) + Number(stuff.count)

                return stuff

            }
            
        })
     
    }

    deleteItem(id){
        const itemIndex = this.item.findIndex(el => {
            el.id === id
        })

        this.item.splice(itemIndex, 1)
    }

}