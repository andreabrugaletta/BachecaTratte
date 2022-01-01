import React from 'react'
import { Text, StyleSheet, View, Image, Button } from 'react-native'

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageUsernameContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/default_avatar.png')}
        />
        <Text style={styles.username}>{props.data.authorName}</Text>
        <Button title="Segui" />
      </View>
      <View style={styles.commentContainer}>
        <Text>{props.data.comment}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoSymbol} />
        <Text style={styles.textInfo}>{props.data.delay}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoSymbol} />
        <Text style={styles.textInfo}>{props.data.status}</Text>
      </View>
      <Text style={styles.dateTimeStyle}>{props.data.datetime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  imageUsernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileImage: {
    height: 44,
    width: 44,
    marginTop: 8,
  },
  username: { fontSize: 20, fontWeight: 'bold', marginStart: 8 },
  commentContainer: { paddingHorizontal: 16, paddingVertical: 4 },
  comment: { fontSize: 18 },
  info: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  textInfo: {
    marginStart: 8,
  },
  infoSymbol: {
    width: 16,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 16,
  },
  buttonStyle: {
    justifyContent: 'flex-end',
  },
  dateTimeStyle: { marginTop: 4, marginBottom: 4, marginStart: 16 },
})

export default Post
