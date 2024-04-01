import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "user 0" },
  { id: "1", name: "user 1" },
  { id: "2", name: "user 2" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
          },
        };
      },
    },
  },
});

export const selectAllUsers = (state) => state.users;

export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;
