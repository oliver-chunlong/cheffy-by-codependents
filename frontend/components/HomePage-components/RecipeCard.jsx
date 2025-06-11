import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../styles/styles';

export default function RecipeCard({ recipe, children }) {
  const navigation = useNavigation();
  
  const imageUri = recipe.recipe_img_url || recipe.image_url;

  return (
    
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe })}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No image</Text>
          </View>
        )}

      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.recipeTitle} numberOfLines={1}>
          {recipe.recipe_name}
        </Text>

        <View style={styles.iconRow}>
          {recipe.is_vegetarian && <Icon name="alpha-v-circle-outline" size={20} color="green" />}
          {recipe.is_vegan && <Icon name="leaf" size={20} color="green" />}
          {recipe.is_gluten_free && <Icon name="barley-off" size={20} color="yellow" />}
          {recipe.is_dairy_free && <Icon name="cow-off" size={20} color="blue" />}
          {recipe.is_nut_free && <Icon name="peanut-off" size={20} color="brown" />}
        </View>
        {children && <View style={styles.actionsRow}>{children}</View>}
      </View>
    </TouchableOpacity>
  );
}