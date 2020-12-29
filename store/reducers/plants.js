import { TOGGLE_FAVORITE, ADD_PLANT, WATER_PLANT, SET_PLANTS, UPDATE_PLANT, DELETE_PLANT } from '../actions/plants'
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
      };
    case ADD_PLANT:
      const newPlant = new Plant(
        new Date().toString(),
        action.plantData.name,
        action.plantData.type,
        action.plantData.image,
        action.plantData.dateReceived,
        action.plantData.waterDate,
        action.plantData.notes
      );
      return {
        ...state,
        plants: state.plants.concat(newPlant),
        favoritePlants: state.favoritePlants
      };
    
    case UPDATE_PLANT:
      const plantIndex = state.plants.findIndex(
        plant => plant.id === action.pid
      );
      
      const updatedPlant = new Plant(
        action.pid,
        action.plantData.name,
        action.plantData.type,
        action.plantData.image,
        action.plantData.dateReceived,
        action.plantData.waterDate,
        action.plantData.notes
      );
    
      const updatedPlants = [...state.plants];
      updatedPlants[plantIndex] = updatedPlant;
      console.log('updatedPlants');
      return {
        ...state,
        plants: updatedPlants,
        favoritePlants: state.favoritePlants
      };
    case WATER_PLANT:
      const wateredPlantIndex = state.plants.findIndex(
        plant => plant.id === action.pid
      );
      const wateredPlant = new Plant(
        action.pid,
        state.plants[wateredPlantIndex].name,
        state.plants[wateredPlantIndex].type,
        state.plants[wateredPlantIndex].image,
        state.plants[wateredPlantIndex].dateReceived,
        action.plantData.waterDate,
        state.plants[wateredPlantIndex].notes
      );
      const updatedWateredPlants = [...state.plants];
      updatedWateredPlants[wateredPlantIndex] = wateredPlant;
      return {
        ...state,
        plants: updatedWateredPlants,
        favoritePlants: state.favoritePlants
      }
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
    case DELETE_PLANT:
      return {
        ...state,
        plants: state.plants.filter(
          plant => plant.id !== action.pid
        )
      };
      default:
        return state;
  }
}

export default plantsReducer;