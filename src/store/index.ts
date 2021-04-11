import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyDescriptor {
  id: number;
  name: string;
}

interface AppState {
  isMenuOpened: boolean;
  selectedCompany: number;
  companies: Array<CompanyDescriptor>;
}

const initialState: AppState = {
  isMenuOpened: false,
  selectedCompany: 1,
  companies: [
    {
      id: 1,
      name: 'Viljatootja AS'
    },
    {
      id: 2,
      name: 'Tartu Agro OÜ'
    }
  ]
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpened = !state.isMenuOpened;
    },
    selectCompany: (state, action: PayloadAction<number>) => {
      state.selectedCompany = action.payload;
      state.isMenuOpened = false;
    }
  }
});

export const { toggleMenu, selectCompany } = app.actions;

const store = configureStore({
  reducer: {
    app: app.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
