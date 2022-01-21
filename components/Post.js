import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Button } from 'react-native'
import { COLORS } from '../colors'

const Post = (props) => {
  const [picture, setPicture] = useState(props.data.picture)

  const renderDelayInfo = (delay) => {
    switch (delay) {
      case 0:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.green }]}
            />
            <Text style={styles.textInfo}>In orario</Text>
          </View>
        )
      case 1:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.yellow }]}
            />
            <Text style={styles.textInfo}>In ritardo di pochi minuti</Text>
          </View>
        )
      case 2:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.orange }]}
            />
            <Text style={styles.textInfo}>Ritardo di oltre 15 minuti</Text>
          </View>
        )
      case 3:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.red }]}
            />
            <Text style={styles.textInfo}>Treni soppressi</Text>
          </View>
        )
      default:
        return (
          <View style={styles.info}>
            <View style={[styles.symbolShape, { backgroundColor: 'grey' }]} />
            <Text style={styles.textInfo}>Nessuna informazione</Text>
          </View>
        )
    }
  }
  const renderStatusInfo = (status) => {
    switch (status) {
      case 0:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.green }]}
            />
            <Text style={styles.textInfo}>Situazione ideale</Text>
          </View>
        )
      case 1:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.yellow }]}
            />
            <Text style={styles.textInfo}>Situazione accettabile</Text>
          </View>
        )
      case 2:
        return (
          <View style={styles.info}>
            <View
              style={[styles.symbolShape, { backgroundColor: COLORS.red }]}
            />
            <Text style={styles.textInfo}>Gravi disagi per i passeggeri</Text>
          </View>
        )
      default:
        return (
          <View style={styles.info}>
            <View style={[styles.symbolShape, { backgroundColor: 'grey' }]} />
            <Text style={styles.textInfo}>Nessuna informazione</Text>
          </View>
        )
    }
  }
  const setDefaultPicture = () => {
    const defaultAvatar = Image.resolveAssetSource(
      require('../assets/default_avatar.png'),
    ).uri
    setPicture(defaultAvatar)
  }

  const renderFollowButton = (isAuthorFollowed) => {
    if (isAuthorFollowed) {
      return (
        <Button
          color={COLORS.red}
          title="Segui già"
          onPress={() => props.unfollow(props.data.author)}
        />
      )
    } else {
      return (
        <Button
          color={COLORS.red}
          title="Segui"
          onPress={() => props.follow(props.data.author)}
        />
      )
    }
  }

  const renderDateTime = (datetime) => {
    let parsedDateTime = datetime.slice(0, 10) + 'T' + datetime.slice(11, 19)
    let formattedDateTime = new Date(parsedDateTime).toLocaleString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    return <Text style={styles.dateTimeStyle}>{formattedDateTime}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageUsernameContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: picture }}
          onError={() => setDefaultPicture()}
        />
        <Text style={styles.username}>{props.data.authorName}</Text>
        {renderFollowButton(props.data.followingAuthor)}
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.comment}>{props.data.comment}</Text>
      </View>
      {renderDelayInfo(props.data.delay)}
      {renderStatusInfo(props.data.status)}
      {renderDateTime(props.data.datetime)}
    </View>
  )
}

const styles = StyleSheet.create({
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
  comment: { fontSize: 16 },
  info: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  textInfo: {
    marginStart: 8,
  },
  symbolShape: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
  buttonStyle: {
    justifyContent: 'flex-end',
  },
  dateTimeStyle: {
    marginTop: 4,
    marginBottom: 4,
    marginStart: 16,
    fontStyle: 'italic',
  },
})

export default Post
