import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const BoardsScreen = (props) => {
  const { line, terminus } = props.route.params

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        Hai selezionato la linea {line.terminus1.sname} - {line.terminus2.sname}
      </Text>
      <Text style={styles.text}>
        Lungo la tratta in direzione {terminus.sname}
      </Text>
      <Text style={styles.text}>L'id della bacheca è {terminus.did} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: { padding: 16 },
  text: { fontSize: 20, paddingVertical: 6 },
})

export default BoardsScreen
