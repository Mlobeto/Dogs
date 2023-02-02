const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
    details:[]
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload,
            }
        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                dogs: action.payload,
            }
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            }
        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'GET_DOGS_BY_BREED':
            const allDogs = state.allDogs
            if (action.payload === 'all') return allDogs
            return {
                ...state,
                dogs: action.payload,
                
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ?
                state.allDogs.filter(el => el.createdInDB === true) :
                state.allDogs.filter(el => !el.createdInDB);
            return {
                ...state,
                dogs: createdFilter,
            }
        case 'ORDER_BY_NAME':
            let sortedArray = state.dogs
            
            if (action.payload === "asc") {
             sortedArray = state.dogs.sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                })   
                
            } if (action.payload === "desc") {
                sortedArray = state.dogs.sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            } 
                
            return {
                ...state,
                dogs: sortedArray
            }
        case 'ORDER_BY_WEIGHT':
            const sortedWeight = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return 1 }
                    if (b.weight_min < a.weight_min) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return -1; }
                    if (b.weight_min < a.weight_min) { return 1; }
                    return 0;
                })
            return {
                ...state,
               dogs: sortedWeight
            }
        case 'FILTER_BY_MAX_WEIGHT':
            const everyDog = state.dogs
            const weightMAXFiltered = action.payload === 'all' ?
                everyDog :
                everyDog.filter(el => el.weight_max <= action.payload)
            return {
                ...state,
                dogs: weightMAXFiltered
            }
        case 'FILTER_BY_MIN_WEIGHT':
            const allDoguis = state.dogs
            const weightMINFiltered = action.payload === 'all' ?
                allDoguis :
                allDoguis.filter(el => el.weight_min >= action.payload)
            return {
                ...state,
                dogs: weightMINFiltered
            }
        case 'POST_DOG':
            return {
                ...state
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }

            case 'DELETE_DETAILS':
            return{
                ...state,
                details: []
            }
        case 'DELETE_ELEMENT_BY_ID':
            return{
                ...state,
                allDogs: []
            }
            
        default:
            return state
    
}}

export default rootReducer;