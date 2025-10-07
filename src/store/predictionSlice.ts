// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Hotspot {
//   cluster_score: number;
//   atm_count: number;
//   coordinates: [number, number];
// }

// interface Alert {
//   atm_id: string;
//   action: string;
// }

// interface PredictionState {
//   hotspots: Hotspot[];
//   atms: any[];
//   alerts: Alert[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: PredictionState = {
//   hotspots: [],
//   atms: [],
//   alerts: [],
//   isLoading: false,
//   error: null,
// };

// const predictionSlice = createSlice({
//   name: 'prediction',
//   initialState,
//   reducers: {
//     setPredictionData: (state, action: PayloadAction<{ hotspots: Hotspot[]; atms: any[]; alerts: Alert[] }>) => {
//       state.hotspots = action.payload.hotspots;
//       state.atms = action.payload.atms;
//       state.alerts = action.payload.alerts;
//       state.error = null;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     clearPredictions: (state) => {
//       state.hotspots = [];
//       state.atms = [];
//       state.alerts = [];
//       state.error = null;
//     },
//   },
// });

// export const { setPredictionData, setLoading, setError, clearPredictions } = predictionSlice.actions;
// export default predictionSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ATM {
  Bank_Branch: string;
  lat: number;
  lon: number;
  risk_score: number;
  predicted_count: number;
  top_features: string[];
  cluster_id: number;
}

export interface Hotspot {
  polygon: [number, number][];
  cluster_score: number;
  member_atms: string[];
}

// export interface Alert {
//   atm_id: string;
//   action: string;
// }

export interface Alert {
  atm_id: string;
  risk_score: number;      // added
  cluster_id: number;      // added
  action: string;
  severity: 'LOW' | 'HIGH'; // added
  reason: string;          // added
}

interface PredictionState {
  hotspots: { cluster_score: number; atm_count: number; coordinates: [number, number] }[];
  atms: ATM[]; // kept for lazy loading if needed
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
    setPredictionData: (state, action: PayloadAction<{ hotspots: Hotspot[]; atms: ATM[]; alerts: Alert[]; riskThreshold?: number }>) => {
      const { hotspots, atms, alerts, riskThreshold = 0 } = action.payload;

      // summarize hotspots (store only first coordinate and ATM count)
      state.hotspots = hotspots
        .filter(h => h.cluster_score * 100 >= riskThreshold)
        .sort((a, b) => b.cluster_score - a.cluster_score)
        .slice(0, 100) // store top 100
        .map(h => ({
          cluster_score: h.cluster_score,
          atm_count: h.member_atms.length,
          coordinates: h.polygon[0] || [0, 0], // representative coordinate
        }));

      // store only a reasonable subset of alerts
      state.alerts = alerts.slice(0, 200);

      // don't store all ATMs, only keep empty array or lazy-load when needed
      state.atms = [];

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
    // optional: load ATMs lazily for a specific cluster
    loadATMs: (state, action: PayloadAction<ATM[]>) => {
      state.atms = action.payload;
    },
  },
});

export const { setPredictionData, setLoading, setError, clearPredictions, loadATMs } = predictionSlice.actions;
export default predictionSlice.reducer;
