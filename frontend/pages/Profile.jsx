import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/ProfileComponents/LoginForm';

export default function Profile() {
  const { user, error } = useContext(UserContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const userId = user?.id;
  
  useEffect(() => {
    if (!userId) return;
    setHasFetched(true);
  }, [userId]);

  useEffect(() => {
    if (!userId || !hasFetched) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setMyRecipes([]); 
      setIsLoading(false);
    }, 500);
  }, [userId, hasFetched]);

  const handleAddRecipe = () => {
  };

  if (!user) {
    return (
      <View flex backgroundColor="#FFFFFF" centerV centerH>
        <LoginForm />
        {error ? <Text text80 red10 marginT-10>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text text80 marginB-12>Favourite recipes</Text>
          <View style={styles.emptyBox}>
            <Text text90>No favourites yet</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text text80 marginB-12>My recipes</Text>
          {!hasFetched ? (
            <Button
            label="Load my recipes"
            backgroundColor="blue"
            style={styles.button}
            onPress={() => setHasFetched(true)}
            accessibilityRole="button"
            />
          ) : (
            <>
            <Button
            label="Add recipe"
            backgroundColor="blue"
            style={styles.button}
            onPress={handleAddRecipe}
            accessibilityRole="button"
            />
            
            {isLoading ? (
              <ActivityIndicator size="large" style={{ marginTop: 24 }} />
            ) : myRecipes.length === 0 ? (
            <Text text90>No recipes yet</Text>
            ) : (
              myRecipes.map((recipe) => (
              <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() =>
              Alert.alert('Recipe tapped', recipe.recipe_name)
              }
              accessibilityRole="button"
              accessibilityLabel={`Open recipe ${recipe.recipe_name}`}
              >
              <Text text90>{recipe.recipe_name}</Text>
              </TouchableOpacity>
                ))
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
  },
  emptyBox: {
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 12,
    marginBottom: 16,
  },
  recipeCard: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
});
