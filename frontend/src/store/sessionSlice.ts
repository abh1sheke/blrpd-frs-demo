import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface ImageData {
  file?: File;
  blob?: string;
  filename?: string;
}

export interface SessionState {
  imageData?: ImageData;
}

const initialState: SessionState = {
  imageData: undefined,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setImageData(state, action) {
      state.imageData = action.payload;
    },
  },
});

export const { setImageData } = sessionSlice.actions;
export const selectImageState = (state: AppState) => state.session.imageData;

export default sessionSlice.reducer;
