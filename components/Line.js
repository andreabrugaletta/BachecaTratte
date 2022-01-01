import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

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
        <Image style={styles.image} source={require('../assets/nodes.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.terminusName}>{props.terminus1.sname}</Text>
          <Text style={styles.terminusName}>{props.terminus2.sname}</Text>
        </View>
        <TouchableOpacity onPress={() => props.swapLine(props.index)}>
          <Image
            style={styles.imageButton}
            source={require('../assets/swap.png')}
          />
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
