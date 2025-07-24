


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // --- NEW ASYNC THUNK FOR DELETING IMAGE ---
// export const deleteFeatureImage = createAsyncThunk(
//   "common/deleteFeatureImage",
//   async (imageId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `/api/common/feature/delete/${imageId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting feature image:", error);
//       return rejectWithValue(error.response?.data?.message || "Failed to delete feature image.");
//     }
//   }
// );
// // --- END NEW ASYNC THUNK ---

// export const getFeatureImages = createAsyncThunk(
//   "common/getFeatureImages",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/common/feature/get");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching feature images:", error);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch feature images.");
//     }
//   }
// );

// export const addFeatureImage = createAsyncThunk(
//   "common/addFeatureImage",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/common/feature/add", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error adding feature image:", error);
//       return rejectWithValue(error.response?.data?.message || "Failed to add feature image.");
//     }
//   }
// );

// const commonSlice = createSlice({
//   name: "common",
//   initialState: {
//     featureImageList: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // getFeatureImages
//       .addCase(getFeatureImages.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getFeatureImages.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.featureImageList = action.payload.data;
//       })
//       .addCase(getFeatureImages.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // addFeatureImage
//       .addCase(addFeatureImage.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addFeatureImage.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // Add the newly added image to the list
//         state.featureImageList.push(action.payload.data);
//       })
//       .addCase(addFeatureImage.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // --- NEW EXTRA REDUCERS FOR DELETING IMAGE ---
//       .addCase(deleteFeatureImage.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteFeatureImage.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // Filter out the deleted image from the list
//         // The action.meta.arg contains the imageId passed to the thunk
//         state.featureImageList = state.featureImageList.filter(
//           (image) => image._id !== action.meta.arg
//         );
//       })
//       .addCase(deleteFeatureImage.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//       // --- END NEW EXTRA REDUCERS ---
//   },
// });

// export default commonSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from '../../config'; // <--- ADD THIS LINE (2 levels up from common-slice to src/config)

// --- NEW ASYNC THUNK FOR DELETING IMAGE ---
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/api/common/feature/delete/${imageId}` // <--- CHANGE THIS LINE
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting feature image:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to delete feature image.");
    }
  }
);
// --- END NEW ASYNC THUNK ---

export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/common/feature/get`); // <--- CHANGE THIS LINE
      return response.data;
    } catch (error) {
      console.error("Error fetching feature images:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch feature images.");
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/common/feature/add`, formData, { // <--- CHANGE THIS LINE
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding feature image:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to add feature image.");
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState: {
    featureImageList: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFeatureImages
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // addFeatureImage
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the newly added image to the list
        state.featureImageList.push(action.payload.data);
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // --- NEW EXTRA REDUCERS FOR DELETING IMAGE ---
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Filter out the deleted image from the list
        // The action.meta.arg contains the imageId passed to the thunk
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.meta.arg
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      // --- END NEW EXTRA REDUCERS ---
  },
});

export default commonSlice.reducer;