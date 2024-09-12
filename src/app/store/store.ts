import { create } from "zustand";

interface StepIdProp {
  stepId: number;
  increase: () => void;
  decrease: () => void;
  setStepId: (val: number) => void;
}

interface PersonalInfoProp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  panCard: string;
  about?: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
  image: File | null;
  setPersonalInfo: (
    info: Partial<Omit<PersonalInfoProp, "setPersonalInfo">>
  ) => void;
}

export const useStepIdStore = create<StepIdProp>((set) => ({
  stepId: 1,
  increase: () => set((state) => ({ stepId: Math.min(state.stepId + 1, 3) })),
  decrease: () => set((state) => ({ stepId: Math.max(state.stepId - 1, 1) })),
  setStepId: (val: number) => set(() => ({ stepId: val })),
}));

export const usePersonalInfoState = create<PersonalInfoProp>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  panCard: "",
  about: "",
  country: "",
  city: "",
  state: "",
  pinCode: "",
  image: null,
  setPersonalInfo: (info) => set((state) => ({ ...state, ...info })),
}));

interface AccountDetailsProp {
  bankName: string;
  ifscCode: string;
  branchName: string;
  accountNumber: string;
  bankType: string;
  isPrimaryBank: boolean;
  setAccountDetails: (
    info: Partial<Omit<AccountDetailsProp, "setAccountDetailsProp">>
  ) => void;
}

export const useAccountDetailsState = create<AccountDetailsProp>((set) => ({
  bankName: "",
  ifscCode: "",
  branchName: "",
  accountNumber: "",
  bankType: "",
  isPrimaryBank: false,
  setAccountDetails: (info) => set((state) => ({ ...state, ...info })),
}));

interface PreferencesProp {
  bookInAdvance: boolean;
  paymentMethod: string;
  budget: number;
  preferredLocation: string;
  tripDuration: number;
  travelGroup: string;
  setPreferences: (
    info: Partial<Omit<PreferencesProp, "setPreferences">>
  ) => void;
}

export const usePreferencesState = create<PreferencesProp>((set) => ({
  bookInAdvance: false,
  paymentMethod: "",
  budget: 0,
  preferredLocation: "",
  tripDuration: 0,
  travelGroup: "",
  setPreferences: (info) => set((state) => ({ ...state, ...info })),
}));
