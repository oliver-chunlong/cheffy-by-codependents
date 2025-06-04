import {useState} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Button, TouchableOpacity} from 'react-native-ui-lib';

export default function Profile() {

  return (
    <View>
      <View
        row
        spread
        centerV
        height={60}
        paddingH-page
        style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
      >
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 12,
            marginBottom: 24,
            padding: 16,
          }}
        >
          <Text text80 marginB-12>Favourite Recipes</Text>
          <View
            style={{
              height: 150,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text text90 >No favourites yet</Text>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12, padding: 16 }}>
          <Text text80 marginB-12>My Recipes</Text>

          <Button
            label="Add Recipe"
            backgroundColor="blue"
            fullWidth
            style={{ borderRadius: 12, marginBottom: 16 }}
            onPress={() => {
            }}
          />

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 8,
              padding: 12,
              alignItems: 'center',
            }}
            onPress={() => {
            }}
          >
            <Text text90>Recipes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        row
        centerV
        centerH
        height={60}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
      </View>
    </View>
  );
}
