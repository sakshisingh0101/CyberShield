import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Hotspot {
  cluster_score: number;
  atm_count: number;
  coordinates: [number, number];
}

interface Alert {
  atm_id: string;
  action: string;
}

interface PredictionState {
  hotspots: Hotspot[];
  atms: any[];
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PredictionState = {
  hotspots: [],
  atms: [],
  alerts: [],
  isLoading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setPredictionData: (state, action: PayloadAction<{ hotspots: Hotspot[]; atms: any[]; alerts: Alert[] }>) => {
      state.hotspots = action.payload.hotspots;
      state.atms = action.payload.atms;
      state.alerts = action.payload.alerts;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearPredictions: (state) => {
      state.hotspots = [];
      state.atms = [];
      state.alerts = [];
      state.error = null;
    },
  },
});

export const { setPredictionData, setLoading, setError, clearPredictions } = predictionSlice.actions;
export default predictionSlice.reducer;
