import Plant from '../../models/plant';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_PLANT = 'ADD_PLANT';
export const SET_PLANTS = 'SET_PLANTS';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id }
};

export const fetchPlants = () => {
  return async dispatch => {
    const response = await fetch('https://plantera-46325-default-rtdb.firebaseio.com/plants.json');
    const resData = await response.json();
    
    const loadedPlants = [];

      for (const key in resData) {
        loadedPlants.push(
          new Plant(
            key,
            resData[key].name,
            resData[key].type,
            resData[key].imageUrl,
            resData[key].dateReceived,
            resData[key].waterDate,
            resData[key].notes
          )
        );
      }
    console.log(loadedPlants);
    dispatch({ type: SET_PLANTS, plants: loadedPlants });
  };
};

export const addPlant = (plant) => {
  const { name, type, imageUrl, dateReceived, waterDate, notes } = plant
  return async dispatch => {
    const response = await fetch('https://plantera-46325-default-rtdb.firebaseio.com/plants.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      })
    });
  
    const resData = await response.json();

    dispatch({ 
      type: ADD_PLANT, 
      plantData: { 
        id: resData.name,
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      } 
    });
  };
};