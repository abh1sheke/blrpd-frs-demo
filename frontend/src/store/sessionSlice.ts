import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

interface MatchData {
  FaceId: {
    Item: {
      RekognitionId: {
        S: string;
      };
      FullName: {
        S: string;
      };
      Filename: {
        S: string;
      };
    };
  };
  Match: {
    Similarity: number;
  };
  MatchFile: string;
}
export interface ImageData {
  returnData?: {
    data: {
      id: number;
      image: string;
    };
    matches: MatchData[];
  };
  blob?: string;
  filename?: string;
  tab: "upload" | "webcam";
}

export interface SessionState {
  imageData: ImageData;
}

const initialState: SessionState = {
  imageData: {
    returnData: undefined,
    blob: undefined,
    filename: undefined,
    tab: "upload",
  },
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setImageData(state, action) {
      state.imageData = action.payload;
    },
    setReturnData(state, action) {
      state.imageData.returnData = action.payload;
    },
  },
});

export const { setImageData, setReturnData } = sessionSlice.actions;
export const selectImageState = (state: AppState) => state.session.imageData;

export default sessionSlice.reducer;
