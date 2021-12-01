import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Post = (props) => {
  console.log(props.data)

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>author: {props.data.author}</Text>
      <Text style={styles.text}>authorName: {props.data.authorName}</Text>
      <Text style={styles.text}>comment: {props.data.comment}</Text>
      <Text style={styles.text}>datetime: {props.data.datetime}</Text>
      <Text style={styles.text}>delay: {props.data.delay}</Text>
      <Text style={styles.text}>
        followingAuthor: {props.data.followingAuthor}
      </Text>
      <Text style={styles.text}>pversion: {props.data.pversion}</Text>
      <Text style={styles.text}>status: {props.data.status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: { padding: 16 },
  text: { fontSize: 18 },
})

export default Post
