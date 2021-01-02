import Plant from "../../models/plant";
import { format } from "date-fns";


export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const ADD_PLANT = "ADD_PLANT";
export const SET_PLANTS = "SET_PLANTS";
export const UPDATE_PLANT = 'UPDATE_PLANT'
export const WATER_PLANT = 'WATER_PLANT'
export const DELETE_PLANT = 'DELETE_PLANT';


export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id };
};

export const fetchPlants = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://plantera-46325-default-rtdb.firebaseio.com/plants/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedPlants = [];

      for (const key in resData) {
        loadedPlants.push(
          new Plant(
            key,
            resData[key].name,
            resData[key].type,
            resData[key].image,
            resData[key].dateReceived,
            resData[key].waterDate,
            resData[key].notes
          )
        );
      }
      dispatch({ type: SET_PLANTS, plants: loadedPlants });
    } catch (err) {
      throw err;
    }
  };
};

export const deletePlant = plantId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://plantera-46325-default-rtdb.firebaseio.com/plants/${plantId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PLANT, pid: plantId });
  };
};

export const addPlant = (name, type, image, dateReceived, waterDate, notes) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
      `https://plantera-46325-default-rtdb.firebaseio.com/plants/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          image,
          dateReceived,
          waterDate,
          notes
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_PLANT,
      plantData: {
        id: resData.name,
        // id,
        name,
        type,
        image,
        dateReceived,
        waterDate,
        notes
      },
    });
  };
};

export const updatePlant = (
  id,
  name,
  type,
  image,
  dateReceived,
  waterDate,
  notes
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://plantera-46325-default-rtdb.firebaseio.com/plants/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          image,
          dateReceived,
          waterDate,
          notes,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PLANT,
      pid: id,
      plantData: {
        name,
        type,
        image,
        dateReceived,
        waterDate,
        notes,
      },
    });
  };
};

export const waterPlant = (id, name, type, image, dateReceived, notes) => {
  const updatedWaterDate = format(new Date(), "MM/dd/yyyy");
  return {
    type: WATER_PLANT,
    pid: id,
    plantData: {
      name,
      type,
      image,
      dateReceived,
      waterDate: updatedWaterDate,
      notes
    }
  }
}

// export const waterPlant = (id) => {
//   const updatedWaterDate = format(new Date(), "MM/dd/yyyy");
//   return async (dispatch) => {
//     const response = await fetch(
//       `https://plantera-46325-default-rtdb.firebaseio.com/plants/${id}.json`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           waterDate,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }

//     dispatch({
//       type: UPDATE_PLANT,
//       pid: id,
//       planttData: {
//         waterDate: updatedWaterDate,
//       },
//     });
//   };
// };