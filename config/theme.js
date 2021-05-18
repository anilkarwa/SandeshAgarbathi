import {configureFonts, DefaultTheme} from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Lato-Regular',
    },
    medium: {
      fontFamily: 'Lato-Bold',
    },
    light: {
      fontFamily: 'Lato-Light',
    },
    thin: {
      fontFamily: 'Lato-Thin',
    },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

export const theme = {
  ...DefaultTheme,
  roundness: 10,
  elevation: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3859CD',
    accent: '#22B5D2',
    background: '#FFFFFF',
    error: '#E74C3C',
    text: '#232A43',
    placeholder: '#5D6273',
    divider: '#EBEFF5',
    success: '#31C290',
    warning: '#EDB248',
    warning_red: '#DF5C57',
    primaryDark: '#143197',
    primaryLight: '#F0F3FE',
  },
  fonts: configureFonts(fontConfig),
};
