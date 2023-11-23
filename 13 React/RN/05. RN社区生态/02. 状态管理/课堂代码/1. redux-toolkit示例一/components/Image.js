import {View, Text, Image, StyleSheet} from "react-native"

export default function App(){
  return (
    <View style={styles.container}>
      <Image source={require("./assets/ok.png")} style={[styles.image,{resizeMode:'cover'}]}/>
      <Text style={styles.text}>cover</Text>
      <Image source={require("./assets/ok.png")} style={[styles.image,{resizeMode:'contain'}]}/>
      <Text style={styles.text}>contain</Text>
      <Image source={require("./assets/ok.png")} blurRadius={6} style={[styles.image,{resizeMode:'stretch'}]}/>
      <Text style={styles.text}>stretch</Text>
      <Image source={require("./assets/ok.png")} style={[styles.image,{resizeMode:'repeat'}]}/>
      <Text style={styles.text}>repeat</Text>
      <Image source={require("./assets/ok.png")} style={[styles.image,{resizeMode:'center'}]}/>
      <Text style={styles.text}>center</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  image: {
      width: 140,
      height: 110,
      backgroundColor: 'red'
  },
  text: {
      justifyContent: 'center',
      fontSize:24
  }
});