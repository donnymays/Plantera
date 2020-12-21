import { TOGGLE_FAVORITE, ADD_PLANT, WATER_PLANT } from '../actions/plants'
import PLANTS from '../../data/seed-data';
import Plant from '../../models/plant';
import { format } from  'date-fns';


const initialState = {
  plants: [], 
  favoritePlants: []
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
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
        ...state,
        plants: state.plants.concat(newPlant)
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

    case WATER_PLANT:
      const plantToBeWatered = state.plants.find(plant => plant.id === action.plantId);
      return {
        ...state,
        plants: {
          ...state.plants,
          [plantToBeWatered]: {
            ...state.plants[plantToBeWatered],
            waterDate: format(new Date(), 'MM/dd/yyy')
          }
        }
      }
    
      default:
      return state;
  }
}


export default plantsReducer;