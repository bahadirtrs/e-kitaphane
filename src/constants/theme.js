import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");


export const COLORS ={
    primary:             "#1d3557",
    textColor:           '#fff',
    textColorLight:      '#ffffff',
    white:               '#ffffff',
    borderLine:          '#f1f1f1',
    shadow:              '#000000',
    border:              '#dddddd',
    opacityBlack:        '#00000050',
    backgroundColor:     '#f1f1f1',
    backgroundWhite:     '#ffffff',
    backgroundDark :     '#1d3557',
    programsBar :        '#118ab2',
    networkError:        '#e63946',
    iconColor:           '#118ab2',
    customSupportColor:  '#40916c',
    systemSupportColor:  '#919191',
    pending           :  '#ffb703',
    writing           :  '#e63946',
}
export const COLORSLIGHT = {
  dark: false,
  colors:{
    primary: '#1d3557',
    background: '#F1F1F1',
    card: '#f8f8f8',
    text: '#333',
    border: '#ddd',
    notification: 'rgb(255, 69, 58)',

    textColor:           '#333333',
    textColorLight:      '#ffffff',
    white:               '#ffffff',
    borderLine:          '#f1f1f1',
    shadow:              '#000000',
    opacityBlack:        '#00000050',
    backgroundColor:     '#f1f1f1',
    backgroundWhite:     '#ffffff',
    backgroundDark :     '#1d3557',
    programsBar :        '#118ab2',
    networkError:        '#e63946',
    iconColor:           '#118ab2',
    customSupportColor:  '#40916c',
    systemSupportColor:  '#919191',
    pending           :  '#ffb703',
    writing           :  '#e63946',
  }
};

export const COLORSDARK = {
   dark: true,
   colors:{
    primary: '#1d3557',
    background: '#121212',
    card: '#181818',
    text: '#ccc',
    border: '#222',
    notification: 'rgb(255, 69, 58)',

    textColor:           '#333333',
    textColorLight:      '#ffffff',
    white:               '#ffffff',
    borderLine:          '#f1f1f1',
    shadow:              '#000000',
    opacityBlack:        '#00000050',
    backgroundColor:     '#f1f1f1',
    backgroundWhite:     '#ffffff',
    backgroundDark :     '#1d3557',
    programsBar :        '#118ab2',
    networkError:        '#e63946',
    iconColor:           '#118ab2',
    customSupportColor:  '#40916c',
    systemSupportColor:  '#919191',
    pending           :  '#ffb703',
    writing           :  '#e63946',
   }
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,
    largeTitle: 50,
    h1: 27,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "GoogleSans-Regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    bold: {fontFamily: "GoogleSans-Bold"},
    medium:{fontFamily: "GoogleSans-Medium"},
    regular:{ fontFamily: "GoogleSans-Regular",},
};

const appTheme = { COLORS, COLORSDARK, COLORSLIGHT, SIZES, FONTS };

export default appTheme;