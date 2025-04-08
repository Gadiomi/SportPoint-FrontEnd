import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditProfileState {
  selectedSports: string[];
  selectedSocial: Array<{ name: string; url: string }>;
  selectedWorks: string[];
  selectedCity: string | null;
  text: string;
  avatar: File | null;
  selectedAvatar: string | null;
  certificates: File[];
}

const initialState: EditProfileState = {
  selectedSports: [],
  selectedSocial: [],
  selectedWorks: [],
  selectedCity: null,
  text: '',
  avatar: null,
  selectedAvatar: null,
  certificates: [],
};

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setSelectedSports: (state, action: PayloadAction<string[]>) => {
      state.selectedSports = action.payload;
    },
    setSelectedSocial: (
      state,
      action: PayloadAction<Array<{ name: string; url: string }>>,
    ) => {
      state.selectedSocial = action.payload;
    },
    setSelectedWorks: (state, action: PayloadAction<string[]>) => {
      state.selectedWorks = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setAvatar: (state, action: PayloadAction<File | null>) => {
      state.avatar = action.payload;
    },
    setSelectedAvatar: (state, action: PayloadAction<string | null>) => {
      state.selectedAvatar = action.payload;
    },
    addCertificates: (state, action: PayloadAction<File[]>) => {
      state.certificates = [...state.certificates, ...action.payload];
    },
    resetEditProfile: () => initialState,
  },
});

export const {
  setSelectedSports,
  setSelectedSocial,
  setSelectedWorks,
  setSelectedCity,
  setText,
  setAvatar,
  setSelectedAvatar,
  addCertificates,
  resetEditProfile,
} = editProfileSlice.actions;

export const editProfileReducer = editProfileSlice.reducer;
