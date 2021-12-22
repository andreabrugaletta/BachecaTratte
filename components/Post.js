import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const Post = (props) => {
  console.log(props.data)

  // return (
  //   <View style={styles.textContainer}>
  //     <Text style={styles.text}>author: {props.data.author}</Text>
  //     <Text style={styles.text}>authorName: {props.data.authorName}</Text>
  //     <Text style={styles.text}>comment: {props.data.comment}</Text>
  //     <Text style={styles.text}>datetime: {props.data.datetime}</Text>
  //     <Text style={styles.text}>delay: {props.data.delay}</Text>
  //     <Text style={styles.text}>
  //       followingAuthor: {props.data.followingAuthor}
  //     </Text>
  //     <Text style={styles.text}>pversion: {props.data.pversion}</Text>
  //     <Text style={styles.text}>status: {props.data.status}</Text>
  //   </View>
  // )
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('../assets/default_avatar.png')}
      />
      <Text style={styles.username}>{props.data.authorName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  profileImage: {
    height: 44,
    width: 44,
  },
  username: { fontSize: 20, fontWeight: 'bold' },
})

export default Post
