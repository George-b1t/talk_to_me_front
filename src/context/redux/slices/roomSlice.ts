import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../../../utils/interfaces";
import { RootState } from "../store";

export interface roomSliceProps {
  currentRoom: null | Room;
}

const initialState: roomSliceProps = {
  currentRoom: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = roomSlice.actions;

export const selectedCurrentRoom = (state: RootState) => state.room.currentRoom;

export default roomSlice.reducer;
