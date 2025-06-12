// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Button } from "react-native";
// import * as Speech from "expo-speech";

// export default function EnglishVoicesList() {
//   const [englishVoices, setEnglishVoices] = useState([]);

//   useEffect(() => {
//     const fetchVoices = async () => {
//       const voices = await Speech.getAvailableVoicesAsync();
//       const english = voices.filter(
//         (voice) => voice.language.startsWith("en") // en, en-US, en-GB, etc.
//       );
//       setEnglishVoices(english);
//     };

//     fetchVoices();
//   }, []);

//   const speakWithVoice = (voice) => {
//     Speech.speak("Let's get cooking!", {
//       voice: voice.identifier,
//       pitch: 1.0,
//     });
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
//         English TTS Voices
//       </Text>
//       <FlatList
//         data={englishVoices}
//         keyExtractor={(item) => item.identifier}
//         renderItem={({ item }) => (
//           <View style={{ marginBottom: 10 }}>
//             <Text>
//               {item.name} ({item.language})
//             </Text>
//             <Button title="Test Voice" onPress={() => speakWithVoice(item)} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }
