import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native-ui-lib";

const screenWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").width;
const itemMargin = 6;
const numColumns = screenWidth > 500 ? 2 : 1;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const shared = {
  fontFamily: 'Calibri',
  backgroundColor: '#f6c47b',
  cardBg:        '#fff',
  accent:        '#FF8C00',
  lightGrey:     '#D3D3D3',
  borderGrey:    '#DDD',

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
    backgroundColor: "fff",
  },

  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "fff",
  },

  filterText: {
    marginRight: 10,
    fontSize: 16,
    color: "#888",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeFilterText: {
    borderBottomColor: "#f6c47b",
  },

  orderPickerWrapper: {
    minWidth: 100,
    justifyContent: "center",
    marginRight: 10,
    zIndex: 1,
  },

  orderPicker: {
    height: 35,
    width: "80%",
    minWidth: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#555",
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#555",
  },

  dropdownContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    width: "100%",
    maxHeight: height * 0.6,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  activeDropdownItem: {
    backgroundColor: "#FDEBD0",
  },
  activeDropdownItemText: {
    color: "#E67E22",
    fontWeight: "bold",
    height: 40,
    width: "100%",
  },

  // Cooking Mode Styles

  cookingContainerNoRecipe: {
    flex: 1,
    padding: itemMargin,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  cookingModeText: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#2b2b2b",
  },

  cookingModeButton: {
    backgroundColor: "#fc9f5d",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginVertical: 6,
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },

  cookingModeButtonText: {
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

  screen: {
    flex: 1,
    backgroundColor: '#FCF8F0',
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 12,
    fontFamily: shared.fontFamily,
    textAlign: "center"
  },

  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: shared.borderGrey,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontFamily: shared.fontFamily,
  },

  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: shared.borderGrey,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    margin: 12,
    minHeight: 100,
    fontFamily: shared.fontFamily,
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  saveButton: {
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: shared.accent,
  },

  cancelButton: {
    borderRadius: 8,
    backgroundColor: shared.lightGrey,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: shared.fontFamily,
  },
  
  listContainer: {
    paddingHorizontal: itemMargin,
    paddingTop: itemMargin,
  },

  listCard: {
    width: '100%',
    marginBottom: itemMargin * 2,
    backgroundColor: shared.cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

centered: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white'
},

sectionTitle: {
  fontSize: 22,
},

actionButton: {
  width: "90%",
  backgroundColor: "#f6c47b",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  alignSelf: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 20,
  marginHorizontal: 16,
  marginVertical: 8,
  borderRadius: 8,
},

actionButton2: {
  width: "90%",
  backgroundColor: "red",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  alignSelf: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 20,
  marginHorizontal: 16,
  marginVertical: 8,
  borderRadius: 8,
},

scrollContent: {
  paddingVertical: 16,
  paddingBottom: 100,
},

loading: {
  
},

  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  // Create Recipe styles

  createRecipeButton: {
    width: "90%",
    backgroundColor: "#f6c47b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
     marginHorizontal: 16,
     marginVertical: 8,
     borderRadius: 8,
  },

  // Shopping List Styles

  shoppingListItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    maxWidth: 480,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shoppingListText: {
    marginBottom: 15,
    fontFamily: shared.fontFamily,
    fontSize: 16,
  },
  listIngredientText: {
    flexShrink: 1,
    paddingLeft: 12,
    fontFamily: shared.fontFamily,
    fontSize: 16,
  },
  listIngredientPart: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  shoppingListButton: {
    width: "90%",
    backgroundColor: "#f6c47b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  shoppingListButtonText: {
    color: "white",
    fontFamily: shared.fontFamily,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Recipe Detail Styles

  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  innerContentContainer: {
    padding: 15,
    paddingBottom: 30,
  },

  topButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
  },

  button: {
    backgroundColor: "#fc9f5d",
    marginLeft: 10,
    marginRight: 10,
  },

  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 0,
  },

  recipeName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },

  recipeDescription: {
    fontSize: 16,
    color: Colors.grey20,
    marginBottom: 3,
    textAlign: "center",
  },

  createdBy: {
    fontSize: 14,
    color: Colors.grey30,
    marginBottom: 20,
    textAlign: "center",
  },

  ingredientsListSpacing: {
    marginBottom: 10,
  },

  shoppingListSection: {
    marginBottom: 20,
    justifyContent: "center",
  },

  shoppingAddButton: {
    backgroundColor: "#fc9f5d",
    marginLeft: 0,
  },
  buttonText: {
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },

  ingredientsList: {
    marginBottom: 20,
  },

  ingredientText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  instructionCard: {
    backgroundColor: "",
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
  },

  instructionTime: {
    fontSize: 14,
    color: Colors.grey30,
    marginTop: 5,
  },
});
