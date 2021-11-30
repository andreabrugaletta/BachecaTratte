import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Line = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.lineName}>
        {props.terminus1.sname} - {props.terminus2.sname}
      </Text>
      <TouchableOpacity
        onPress={() => {
          console.log(props.terminus1.did)
          props.navigation.navigate('BoardsScreen', {
            line: props.data,
            terminus: props.terminus1,
          })
        }}
      >
        <Text style={styles.lineDirection}>
          direzione {props.terminus1.sname}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(props.terminus2.did)
          props.navigation.navigate('BoardsScreen', {
            line: props.data,
            terminus: props.terminus2,
          })
        }}
      >
        <Text style={styles.lineDirection}>
          direzione {props.terminus2.sname}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
  },
  lineName: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingVertical: 10,
  },
  lineDirection: { fontSize: 20, paddingVertical: 6 },
})

export default Line
