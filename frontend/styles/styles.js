import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemMargin = 6;
const numColumns = screenWidth > 500 ? 2 : 1;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const shared = {
  fontFamily: "Calibri",
  backgroundColor: "#f6c47b",
};

const isMobile = Dimensions.get("window").width < 400;

export const styles = StyleSheet.create({
  container: {
    padding: itemMargin,
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    width: "100%",
  },
  card: {
    margin: itemMargin,
    width: itemWidth,
    maxWidth: 180,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  textWrapper: {
    padding: 6,
  },
  recipeTitle: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#2b2b2b",
  },
  description: {
    fontFamily: shared.fontFamily,
    fontSize: 12,
    color: "#8c8c8c",
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },

  recipeAuthor: {
    fontFamily: shared.fontFamily,
    fontSize: 8,
    color: "#000",
  },

  recipeImage: {
    height: 300,
    width: 300,
    borderRadius: 20,
    },

recipeDetailsContainer: {
  marginTop: 20,
    alignItems: "center",
}, 

recipeIngredientsList: {
  paddingTop: 30,
  paddingBottom: 0,
  paddingLeft: 30,
},

recipeKeyInfoContainer: {
// flex: 1,
margin: 10,
},

shoppingListContainer: {
paddingTop: 0, 
paddingLeft: 30,
},

favouriteContainer: {
padding: 30,
},

  // Navbar styles
  header: {
    backgroundColor: shared.backgroundColor,
    height: 120,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  titleWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: shared.backgroundColor,
    minHeight: 100,
    paddingHorizontal: 16,
  },
  profileButton: {
    // position: "absolute",
    // right: 16,
    // top: "50%",
    justifyContent: "center",
    // height: 28,
    // width: 28,
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    color: "white",
    fontFamily: shared.fontFamily,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: shared.backgroundColor,
    width: "100%",
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderTopWidth: 0,
    borderColor: "transparent",
  },
  searchIconImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 26,
    width: 350,
    flex: 1,
    fontFamily: shared.fontFamily,
  },
  profileIcon: {
    width: 36,
    height: 36,
  },
  homeButton: {
    marginRight: 12,
    fontFamily: shared.fontFamily,
  },

  //Tabnav styles
  tabBar: {
    // position: "absolute",
    // bottom: 16,
    // left: 16,
    // right: 16,
    backgroundColor: "#fff",
    // borderRadius: 20,
    height: 80,
    elevation: 16, // Android shadow needs a separate setting
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: "hidden", // fixes iOS clipping apparently?
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: isMobile ? 30 : 10,
  },

  iconImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  //filtering bar

  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },

  filterText: {
    marginRight: 20,
    fontSize: 16,
    color: "#888",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeFilterText: {
    borderBottomColor: "#f6c47b",
  },

  orderPickerWrapper: {
    minWidth: 140,
    justifyContent: "center",
  },

  orderPicker: {
    height: 40,
    width: "100%",
  },

  //Cooking Mode Styles

  cookingContainerNoRecipe: {
    flex: 1, // Fill the screen
    padding: itemMargin,
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
    width: "100%",
  },

  cookingModeText: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#2b2b2b",
  },

  cookingModeButton: {
    backgroundColor: "#f6c47b",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginVertical: 6,
    width: "25%",
    alignItems: "center",
    marginTop: 20,
  },
   cookingModeStartButton: {
    backgroundColor: "#f6c47b",
    borderRadius: 20,
    paddingHorizontal: 32,
    marginVertical: 6,
    width: "55%",
    height: 70,
    alignItems: "center",
    marginTop: 5,
  },
    cookingModeStartButtonText: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
    
  shoppingAddButton: {
    backgroundColor: "#f6c47b",
    borderRadius: 20,
    paddingHorizontal: 32,
    marginVertical: 6,
    width: "40%",
    height: 90,
    alignItems: "center",
    marginTop: 5,
  },

  shoppingAddButtonText: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    padding: 5,
  },

  cookingModeContainer: {
    justifyContent: "center", // vertical center
    flexDirection: "column",
    alignItems: "center", // horizontal center
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  cookingModeText: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#2b2b2b",
    justifyContent: "center",
    textAlign: "center",
  },

  cookingModeStepContainer: {
    width: "100%",
    margin: 20,
    alignContent: "center",
    backgroundColor: "#fff",
    borderRadius: 2,
  },

  cookingReadSection: {
    margin: 20,
    alignItems: "center",
  },

  cookingModeStepWrapper: {
    flex: 1,
    alignItems: "center",
  },

  cookingTimerCard: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  timerPlayIcon: {
    color: "#f6c47b",
  },

  speakerPlayIcon: {
    color: "#f6c47b",
  },

  cookingIconButton: {
    backgroundColor: "#fff",
  },

  cookingTimerText: {
    fontFamily: shared.fontFamily,
    fontSize: 96,
    color: "#f6c47b",
    justifyContent: "center",
    textAlign: "center",
  },
});
