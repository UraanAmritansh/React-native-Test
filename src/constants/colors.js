import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();
export default {
    black: colorScheme=='dark'?'#ffffff':'#000000',
    white: colorScheme=='dark'?'#000000':'#ffffff',
    themeBlue:'#4267B2',
    themeGray:'#898F9C',
    gray:'#7E7E7E',
    offwhite:'#F1F1F1',
    lightGray:colorScheme=='dark'?'#65676b':'#F2F4F5',
    darkGrey: '#53525A',
}