import uniqid from 'uniqid';


export default class List {
    constructor(){
        this.item = []
    }

    addItem(count, ingredient){

        const content ={
            id : uniqid(),
            count,
            ingredient
        }

        this.item.push(content)
        return content
    }

    deleteItem(id){
        const itemIndex = this.item.findIndex(el => {
            el.id === id
        })

        this.item.splice(itemIndex, 1)
    }

}