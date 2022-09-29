import { createSlice } from '@reduxjs/toolkit';

export const changeSlice = createSlice({
  name: 'change',
  initialState: true,
  reducers: {
    changeOption: (state, action) => {
        return !state;
      }
    
  }
})

export const { changeOption } = changeSlice.actions;

export default changeSlice.reducer;