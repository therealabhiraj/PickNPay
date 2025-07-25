import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from '../../config'; 

export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/api/common/feature/delete/${imageId}` 
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting feature image:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to delete feature image.");
    }
  }
);


export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/common/feature/get`); 
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
      const response = await axios.post(`${BASE_API_URL}/api/common/feature/add`, formData, { 
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
    
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.featureImageList.push(action.payload.data);
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.meta.arg
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default commonSlice.reducer;