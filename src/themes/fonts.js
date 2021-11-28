import GeneralWOFF from "../assets/fonts/GeneralSans-Regular.woff";
import GeneralSemiBoldWOFF from "../assets/fonts/GeneralSans-Semibold.woff";
import GeneralItalicWOFF from "../assets/fonts/GeneralSans-Italic.woff";
import ClashMediumWOFF from "../assets/fonts/ClashDisplay-Medium.woff";

const general = {
  fontFamily: "General",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
		local('GeneralSans'),
		local('GeneralSans-Regular'),
		url(${GeneralWOFF}) format('woff')
	`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const generalSemiBold = {
  fontFamily: "General",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 600,
  src: `
		local('GeneralSans-SemiBold'),
		local('GeneralSans-SemiBold'),
		url(${GeneralSemiBoldWOFF}) format('woff')
	`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const generalItalic = {
  fontFamily: "General",
  fontStyle: "italic",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
		local('GeneralSans-Italic'),
		local('GeneralSans-Italic'),
		url(${GeneralItalicWOFF}) format('woff')
	`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const clash = {
  fontFamily: "Clash",
  fontStyle: "italic",
  fontDisplay: "swap",
  fontWeight: 500,
  src: `
		local('ClashDisplay-Medium'),
		local('ClashDisplay-Medium'),
		url(${ClashMediumWOFF}) format('woff')
	`,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const fonts = [general, generalSemiBold, generalItalic, clash];

export default fonts;
