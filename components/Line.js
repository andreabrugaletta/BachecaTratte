import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const Line = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.terminus1.sname)
        props.navigation.navigate('BoardsScreen', {
          terminus: props.terminus1,
        })
      }}
    >
      <View style={styles.item}>
        <Image style={styles.image} source={require('../assets/nodes.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.terminusName}>{props.terminus1.sname}</Text>
          <Text style={styles.terminusName}>{props.terminus2.sname}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
  },
  image: {
    height: 48,
    width: 48,
    transform: [{ rotate: '-45deg' }],
    tintColor: '#474747',
  },
  textContainer: {
    flexDirection: 'column',
  },
  terminusName: { fontSize: 20 },
})

export default Line
