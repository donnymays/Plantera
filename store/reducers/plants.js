import { TOGGLE_FAVORITE, ADD_PLANT } from '../actions/plants'
import PLANTS from '../../data/seed-data';
import Plant from '../../models/plant';

const initialState = {
  plants: [], 
  favoritePlants: []
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLANT:
 
      const newPlant = new Plant(
        "1",
        action.plant.name,
        action.plant.type,
        action.plant.imageUrl,
        action.plant.dateReceived,
        action.plant.waterDate,
        action.plant.notes
      )
      
      state.plants.push(newPlant)
      // console.log(newState);
      return  state;
      
       
        
      
    
    // case TOGGLE_FAVORITE:
    //   const existingIndex = state.favoritePlants.findIndex(
    //     plant => plant.id === action.plantId
    //   );
    // if (existingIndex >= 0) {
    //   const updatedFavPlants = [...state.favoritePlants];
    //   updatedFavePlants.splice(existingIndex, 1);
    //   return { ...state, favoritePlants: updatedFavPlants };
    // } else {
    //   const plant = state.plants.find(plant => plant.id === action.plantId);
    //   return { ...state, favoritePlants: state.favoritePlants.concat(plant) };
    // }
    default:
      return state;
  }
}


export default plantsReducer;