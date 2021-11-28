import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Line = (props) => {
  return (
    <View style={styles.item}>
      <Text>
        {props.terminus1} - {props.terminus2}
      </Text>
      <Text>direzione {props.terminus1}</Text>
      <Text>direzione {props.terminus2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: 16,
  },
})

export default Line
