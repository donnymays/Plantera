export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id }
};

export const ADD_PLANT = 'ADD_PLANT';

export const addPlant = (plant) => {
  const { id, name, type, imageUrl, dateReceived, waterDate, notes } = plant
  return async dispatch => {
    const response = await fetch('https://plantera-46325-default-rtdb.firebaseio.com/plants.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify((
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      ))
    });
  

    const resData = await response.json()
    console.log(resData);

  
    dispatch({ 
      type: ADD_PLANT, 
      plantData: { 
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
