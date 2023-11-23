// Platform

// import React from 'react';
// import { Platform, StyleSheet, Text, ScrollView } from 'react-native';

// const App = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text>OS</Text>
//       <Text style={styles.value}>{Platform.OS}</Text>
//       <Text>OS Version</Text>
//       <Text style={styles.value}>{Platform.Version}</Text>
//       <Text>isTV</Text>
//       <Text style={styles.value}>{Platform.isTV.toString()}</Text>
//       {Platform.OS === 'ios' && <>
//         <Text>isPad</Text>
//         <Text style={styles.value}>{Platform.isPad.toString()}</Text>
//       </>}
//       <Text>Constants</Text>
//       <Text style={styles.value}>
//         {JSON.stringify(Platform.constants, null, 2)}
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   value: {
//     fontWeight: '600',
//     padding: 4,
//     marginBottom: 8
//   }
// });

// export default App;

// PlatformColor

// import React from 'react';
// import {
//   Platform,
//   PlatformColor,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const App = () => (
//   <View style={styles.container}>
//     <Text style={styles.label}>
//       I am a special label color!
//     </Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   label: {
//     padding: 16,
//     ...Platform.select({
//       ios: {
//         color: PlatformColor('label'),
//         backgroundColor:
//           PlatformColor('systemTealColor'),
//       },
//       android: {
//         color: PlatformColor('?android:attr/textColor'),
//         backgroundColor:
//           PlatformColor('@android:color/holo_blue_bright'),
//       },
//       default: { color: 'black' }
//     })
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

// export default App;

// Apperence 外观偏好

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Appearance,
} from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>外观偏好</Text>
      <Text style={styles.value}>{Appearance.getColorScheme()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontWeight: "600",
    padding: 4,
    marginBottom: 8,
  },
});

export default App;