import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export default {
  platformStyle,
  platform,

  //Android
  androidRipple: true,
  androidRippleColor: "rgba(256, 256, 256, 0.3)",
  androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
  btnUppercaseAndroidText: true,

  // Badge
  badgeBg: "#ED1727",
  badgeColor: "#fff",
  badgePadding: platform === "ios" ? 3 : 0,

  // Button
  btnFontFamily: platform === "ios" ? "System" : "Roboto_medium",
  btnDisabledBg: "#b5b5b5",
  buttonPadding: 6,
  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return platform === "ios" ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: "#fff",
  cardBorderColor: "#ccc",

  // CheckBox
  CheckboxRadius: platform === "ios" ? 13 : 0,
  CheckboxBorderWidth: platform === "ios" ? 1 : 2,
  CheckboxPaddingLeft: platform === "ios" ? 4 : 2,
  CheckboxPaddingBottom: platform === "ios" ? 0 : 5,
  CheckboxIconSize: platform === "ios" ? 21 : 16,
  CheckboxIconMarginTop: platform === "ios" ? undefined : 1,
  CheckboxFontSize: platform === "ios" ? 23 / 0.9 : 17,
  DefaultFontSize: 17,
  checkboxBgColor: "#039BE5",
  checkboxSize: 20,
  checkboxTickColor: "#fff",

  // Color
  brandPrimary: platform === "ios" ? "#007aff" : "#3F51B5",
  brandInfo: "#62B1F6",
  brandSuccess: "#5cb85c",
  brandDanger: "#d9534f",
  brandWarning: "#f0ad4e",
  brandDark: "#000",
  brandLight: "#f4f4f4",

  // Font
  fontFamily: platform === "ios" ? "System" : "Roboto",
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: isIphoneX ? 89 : 55,
  footerDefaultBg: platform === "ios" ? "#fff" : "#fff",
  footerPaddingBottom: isIphoneX ? 34 : 0,

  // FooterTab
  tabBarTextColor: platform === "ios" ? "#bfc6ea" : "#bfc6ea",
  tabBarTextSize: platform === "ios" ? 11 : 11,
  activeTab: platform === "ios" ? "#fff" : "#fff",
  sTabBarActiveTextColor: "#007aff",
  tabBarActiveTextColor: platform === "ios" ? "#fff" : "#fff",
  tabActiveBgColor: platform === "ios" ? "#e64e37" : "#e64e37",

  // Header
  toolbarBtnColor: platform === "ios" ? "#fff" : "#fff",
  toolbarDefaultBg:  "#fff",
  toolbarHeight: platform === "ios" ? (isIphoneX ? 94 : 70) : 56,
  toolbarSearchIconSize: platform === "ios" ? 20 : 23,
  toolbarInputColor: platform === "ios" ? "#fff" : "#fff",
  searchBarHeight: platform === "ios" ? 30 : 40,
  searchBarInputHeight: platform === "ios" ? 30 : 50,
  toolbarBtnTextColor: platform === "ios" ? "#000" : "#000",
  iosStatusbar: "dark-content",
  toolbarDefaultBorder: platform === "ios" ? "#e64e37" : "#e64e37",
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: "Ionicons",
  iconFontSize: platform === "ios" ? 30 : 28,
  iconHeaderSize: platform === "ios" ? 24 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: "#D9D5DC",
  inputSuccessBorderColor: "#2b8339",
  inputErrorBorderColor: "#ed2f2f",
  inputHeightBase: 50,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return "#575757";
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: platform === "ios" ? 20 : 24,

  // List
  listBg: "transparent",
  listBorderColor: "#c9c9c9",
  listDividerBg: "#f4f4f4",
  listBtnUnderlayColor: "#DDD",
  listItemPadding: platform === "ios" ? 10 : 12,
  listNoteColor: "#808080",
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: "#E4202D",
  inverseProgressColor: "#1A191B",

  // Radio Button
  radioBtnSize: platform === "ios" ? 23 : 23,
  radioSelectedColorAndroid: "##e64e37",
  radioBtnLineHeight: platform === "ios" ? 24 : 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  segmentBackgroundColor: platform === "ios" ? "#e64e37" : "#e64e37",
  segmentActiveBackgroundColor: platform === "ios" ? "#fff" : "#fff",
  segmentTextColor: platform === "ios" ? "#fff" : "#fff",
  segmentActiveTextColor: platform === "ios" ? "#e64e37" : "#e64e37",
  segmentBorderColor: platform === "ios" ? "#fff" : "#fff",
  segmentBorderColorMain: platform === "ios" ? "#e64e37" : "#e64e37",

  // Spinner
  defaultSpinnerColor: "#45D56E",
  inverseSpinnerColor: "#1A191B",

  // Tab
  tabDefaultBg:  "#FFF",
  topTabBarTextColor: "#666",
  topTabBarActiveTextColor:  "#000",
  topTabBarBorderColor: platform === "ios" ? "#fff" : "#fff",
  topTabBarActiveBorderColor: platform === "ios" ? "#e64e37" : "#e64e37",

  // Tabs
  tabBgColor: "#e64e37",
  tabFontSize: 15,

  // Text
  textColor: "#000",
  inverseTextColor: "#fff",
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: platform === "ios" ? "System" : "Roboto_medium",
  titleFontSize: platform === "ios" ? 17 : 19,
  subTitleFontSize: platform === "ios" ? 12 : 14,
  subtitleColor: platform === "ios" ? "#fff" : "#fff",
  titleFontColor: platform === "ios" ? "#fff" : "#fff",

  // Other
  borderRadiusBase: platform === "ios" ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: "#414142",
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30
};
