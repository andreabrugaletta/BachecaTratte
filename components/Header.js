import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Header = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 42, paddingTop: 24, paddingLeft: 16, fontWeight: 'bold' },
})

export default Header
