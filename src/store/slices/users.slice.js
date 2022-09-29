import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: "",
  reducers: {
    sendUser: (state, action) => {
      const user=action.payload
      return user;
    }

  }
})

export const { sendUser } = usersSlice.actions;

export default usersSlice.reducer;