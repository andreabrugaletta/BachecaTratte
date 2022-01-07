import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput } from 'react-native'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'
import * as ImagePicker from 'expo-image-picker'
import { Snackbar } from 'react-native-paper'

const Profile = (props) => {
  const sid = useContext(SidContext)
  const [showUsername, setShowUsername] = useState(true)
  const [editUsername, setEditUsername] = useState(false)
  const [username, setUsername] = useState('')
  const [picture, setPicture] = useState()
  const [networkController] = useState(() => new NetworkController())
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const base64prefix = 'data:image/png;base64,'

  useEffect(() => {
    console.log('use effect')
    networkController.getProfile(sid).then((response) => {
      console.log(response)
      setUsername(response.name)
      setPicture(base64prefix + response.picture)
    })
  }, [])

  const setDefaultPicture = () => {
    const defaultAvatar = require('../assets/default_avatar.png')
    setPicture(Image.resolveAssetSource(defaultAvatar).uri)
  }

  const pickImageFromGalleryAsync = async () => {
    console.log('launch library')
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    })

    if (!result.cancelled) {
      if (result.base64.length > 137000) {
        console.log('error: large image')
        setSnackbarVisible(true)
      } else {
        setPicture(base64prefix + result.base64)
        networkController.setProfile(sid, username, result.base64)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: picture }}
        onError={() => setDefaultPicture()}
      />
      {showUsername && <Text style={styles.username}>{username}</Text>}
      {editUsername && (
        <TextInput
          style={styles.username}
          placeholder={username}
          onChangeText={setUsername}
        />
      )}
      <View style={styles.buttonsContainer}>
        <Button
          title="modifica nome"
          onPress={() => {
            setEditUsername(true)
            setShowUsername(false)
          }}
        />
        <Button title="modifica foto" onPress={pickImageFromGalleryAsync} />
      </View>
      {editUsername && (
        <Button
          title="Salva"
          onPress={() => {
            setEditUsername(false)
            setShowUsername(true)
            networkController.setProfile(sid, username)
          }}
        />
      )}
      <Snackbar
        style={{ backgroundColor: 'red' }}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          color: 'white',
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(true)
          },
        }}
      >
        L'immagine selezionata è troppo grande.
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 28,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
})

export default Profile
