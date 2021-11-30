import ClashMediumWOFF from "../assets/fonts/ClashDisplay-Medium.woff";

const general = {
  fontFamily: "Sk-Modernist",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
		url(./assets/fonts/Sk-Modernist-Regular.otf)
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
    url(./assets/fonts/Sk-Modernist-Regular.otf)
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
    url(./assets/fonts/Sk-Modernist-Regular.otf)
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
