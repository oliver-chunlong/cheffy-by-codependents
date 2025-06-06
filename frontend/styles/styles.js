import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemMargin = 6;
const numColumns = screenWidth > 500 ? 2 : 1;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const shared = {
  fontFamily: 'Calibri',
  backgroundColor: '#f6c47b',
};

const isMobile = Dimensions.get('window').width < 400;

export const styles = StyleSheet.create({
container: {
    padding: itemMargin,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    },
card: {
    margin: itemMargin,
    width: itemWidth,
    maxWidth: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
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
    flexDirection: 'row',
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
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: shared.backgroundColor,
    minHeight: 100,
    paddingHorizontal: 16,
},
profileButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    justifyContent: 'center',
    height: 28,
    width: 28,
    alignItems: 'center',
},
titleText: {
    fontSize: 40,
    color: 'white',
    fontFamily: shared.fontFamily,
},
searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: shared.backgroundColor,
    width: '100%',
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  searchIconImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: 'white',
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
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 80,
    elevation: 16, // Android shadow needs a separate setting
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: 'hidden', // fixes iOS clipping apparently?
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isMobile ? 30 : 10,
  },
  
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  

});
