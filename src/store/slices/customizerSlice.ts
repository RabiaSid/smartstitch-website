import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customization, Size } from '@/types';
interface CustomizerState { customization: Customization; step: number; previewUrl: string | null; isGeneratingPreview: boolean; }
const defaultCustomization: Customization = { productId: '', color: 'White', colorHex: '#FFFFFF', size: 'M', quantity: 1, printType: 'none', designPosition: { x: 50, y: 35, scale: 1 }, customText: '', textFont: 'DM Sans', textColor: '#000000', embroidery: false };
const customizerSlice = createSlice({
  name: 'customizer',
  initialState: { customization: defaultCustomization, step: 1, previewUrl: null, isGeneratingPreview: false } as CustomizerState,
  reducers: {
    setColor(state, action: PayloadAction<{ name: string; hex: string }>) { state.customization.color = action.payload.name; state.customization.colorHex = action.payload.hex; },
    setSize(state, action: PayloadAction<Size>) { state.customization.size = action.payload; },
    setQuantity(state, action: PayloadAction<number>) { state.customization.quantity = Math.max(1, action.payload); },
    setPrintType(state, action: PayloadAction<Customization['printType']>) { state.customization.printType = action.payload; },
    setDesignUrl(state, action: PayloadAction<string>) { state.customization.designUrl = action.payload; },
    setCustomText(state, action: PayloadAction<string>) { state.customization.customText = action.payload; },
    setTextColor(state, action: PayloadAction<string>) { state.customization.textColor = action.payload; },
    toggleEmbroidery(state) { state.customization.embroidery = !state.customization.embroidery; },
    setStep(state, action: PayloadAction<number>) { state.step = action.payload; },
    nextStep(state) { state.step++; },
    prevStep(state) { if (state.step > 1) state.step--; },
    setPreviewUrl(state, action: PayloadAction<string | null>) { state.previewUrl = action.payload; },
    resetCustomizer(state) { state.customization = defaultCustomization; state.step = 1; state.previewUrl = null; },
  },
});
export const { setColor, setSize, setQuantity, setPrintType, setDesignUrl, setCustomText, setTextColor, toggleEmbroidery, setStep, nextStep, prevStep, setPreviewUrl, resetCustomizer } = customizerSlice.actions;
export default customizerSlice.reducer;
