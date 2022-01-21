import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

const Line = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props.terminus1.sname)
        props.navigation.navigate('BoardsScreen', {
          // terminus: props.terminus1,
          index: props.index,
          swapLine: props.swapLine,
          getLine: props.getLine,
        })
      }}
    >
      <View style={styles.item}>
        <Entypo name={'flow-line'} size={48} />
        <View style={styles.textContainer}>
          <Text style={styles.terminusName}>{props.terminus1.sname}</Text>
          <Text style={styles.terminusName}>{props.terminus2.sname}</Text>
        </View>
        <TouchableOpacity onPress={() => props.swapLine(props.index)}>
          <Ionicons name={'swap-horizontal'} size={32} />
        </TouchableOpacity>
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
  imageButton: {
    height: 44,
    width: 44,
    tintColor: '#474747',
  },
})

export default Line
