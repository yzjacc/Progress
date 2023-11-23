import {useState} from "react"
import {View, Switch, StyleSheet} from "react-native"


export default function App(){
  const [isOn, setIsOn] = useState(false)

  return (
    <View style={styles.container}>
      <Switch 
        value={isOn}
        onValueChange={() => setIsOn(!isOn)}
        trackColor={{
          false : "red",
          true : "green"
        }}
        thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});