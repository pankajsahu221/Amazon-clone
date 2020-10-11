export const initialState = {
    basket : [],
    user: null,
};

//SELECTOR
//to know more about array.reduce(), search for it.
export const getBasketTotal = (basket) =>{
    return basket?.reduce((amount,item) => item.price + amount , 0);
}

const reducer = (state, action)=> {
    // console.log(action);
    
    switch (action.type){
        //to add the item
       case "ADD_TO_BASKET":
            return {
                ...state, basket: [...state.basket, action.item],
            };

        //to empty basket
       case "EMPTY_BASKET":
            return {
                ...state, basket: [] ,
            };

         //to remove the item
       case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex( basketItem => {  //returns 1st index having equal id
                return basketItem.id === action.id ;
                } 
            )
            let newBasket = [...state.basket];

            if(index >= 0){  //if the item present in basket then will delete it 
                newBasket.splice(index, 1) //remove only one item at index 
            }else{
                console.warn(`can't delete the item with id = ${action.id} as it's not in basket`);
            }
            return {
                ...state, basket: newBasket,
            }

         case "SET_USER":
            return{
                ...state, user: action.user,
            }

         default: return state;

    }
}

export default reducer;