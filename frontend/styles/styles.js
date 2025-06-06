import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemMargin = 6;
const numColumns = screenWidth > 500 ? 2 : 1;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const shared = {
  fontFamily: 'Calibri',
  backgroundColor: '#f6c47b',
};

export const styles = StyleSheet.create({
container: {
    padding: itemMargin,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    },
card: {
    margin: itemMargin / 2,
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
    height: itemWidth * 0.6,
    resizeMode: 'cover',
  },
  textWrapper: {
    padding: 6,
  },
  title: {
    fontFamily: shared.fontFamily,
    fontSize: 22,
    color: "#2b2b2b",
  },
  description: {
    fontFamily: shared.fontFamily,
    fontSize: 12,
    color: "#8c8c8c",
  },

  // Navbar styles
  header: {
    backgroundColor: shared.backgroundColor,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: shared.backgroundColor,
    minHeight: 100,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: shared.fontFamily,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: shared.backgroundColor,
    width: '100%',
    paddingHorizontal: 8,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
    color: 'white',
    fontFamily: shared.fontFamily,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 36,
    flex: 1,
    fontFamily: shared.fontFamily,
  },
  profileButton: {
    marginRight: 12,
  },
  profileIcon: {
    width: 28,
    height: 28,
  },
  homeButton: {
    marginRight: 12,
    fontFamily: shared.fontFamily,
  },
});
