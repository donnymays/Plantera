import { TOGGLE_FAVORITE, ADD_PLANT, WATER_PLANT, SET_PLANTS } from '../actions/plants'
import PLANTS from '../../data/seed-data';
import Plant from '../../models/plant';
import { format } from  'date-fns';


const initialState = {
  plants: [], 
  favoritePlants: []
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        plants: action.plants,
        favoritePlants: state.favoritePlants
      }

    case ADD_PLANT:
      const newPlant = new Plant(
        action.plantData.id,
        action.plantData.name,
        action.plantData.type,
        action.plantData.imageUrl,
        action.plantData.dateReceived,
        action.plantData.waterDate,
        action.plantData.notes
      );
      return {
        plants: state.plants.concat(newPlant),
        favoritePlants: state.favoritePlants
      };
    
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoritePlants.findIndex(
        plant => plant.id === action.plantId
      );
    if (existingIndex >= 0) {
      const updatedFavPlants = [...state.favoritePlants];
      updatedFavePlants.splice(existingIndex, 1);
      return { 
        ...state, 
        favoritePlants: updatedFavPlants 
      };
    } else {
      const plant = state.plants.find(plant => plant.id === action.plantId);
      return { 
        ...state, 
        favoritePlants: state.favoritePlants.concat(plant) 
      };
    };

    // case WATER_PLANT:
    //   const plantToBeWatered = state.plants.findIndex(plant => plant.id === action.plantId);
    //   const {  }
    //   return {
    //     ...state,
    //     plants: {
    //       ...state.plants,
    //       [plantToBeWatered]: {
    //         ...state.plants[plantToBeWatered],
    //         waterDate: format(new Date(), 'MM/dd/yyy')
    //       }
    //     },
    //     favoritePlants: favoritePlants
    //   }
    
      default:
        return state;
  }
}

export default plantsReducer;