// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   addressList: [],
// };

// export const addNewAddress = createAsyncThunk(
//   "/addresses/addNewAddress",
//   async (formData) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/shop/address/add",
//       formData
//     );

//     return response.data;
//   }
// );

// export const fetchAllAddresses = createAsyncThunk(
//   "/addresses/fetchAllAddresses",
//   async (userId) => {
//     const response = await axios.get(
//       `http://localhost:5000/api/shop/address/get/${userId}`
//     );

//     return response.data;
//   }
// );

// export const editaAddress = createAsyncThunk(
//   "/addresses/editaAddress",
//   async ({ userId, addressId, formData }) => {
//     const response = await axios.put(
//       `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
//       formData
//     );

//     return response.data;
//   }
// );

// export const deleteAddress = createAsyncThunk(
//   "/addresses/deleteAddress",
//   async ({ userId, addressId }) => {
//     const response = await axios.delete(
//       `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
//     );

//     return response.data;
//   }
// );

// const addressSlice = createSlice({
//   name: "address",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addNewAddress.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addNewAddress.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })
//       .addCase(addNewAddress.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(fetchAllAddresses.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllAddresses.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.addressList = action.payload.data;
//       })
//       .addCase(fetchAllAddresses.rejected, (state) => {
//         state.isLoading = false;
//         state.addressList = [];
//       });
//   },
// });

// export default addressSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from '../../../config'; // <--- ADD THIS LINE (3 levels up from address-slice to src/config)

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/shop/address/add`, // <--- CHANGE THIS LINE
      formData
    );

    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${BASE_API_URL}/api/shop/address/get/${userId}` // <--- CHANGE THIS LINE
    );

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${BASE_API_URL}/api/shop/address/update/${userId}/${addressId}`, // <--- CHANGE THIS LINE
      formData
    );

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${BASE_API_URL}/api/shop/address/delete/${userId}/${addressId}` // <--- CHANGE THIS LINE
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;