import React, { useState, useEffect, useContext } from 'react'
import {
  Modal,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native'
import { Header } from '@react-navigation/elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'
import DelayRadioButtons from './DelayRadioButtons'
import StatusRadioButtons from './StatusRadioButtons'
import { COLORS } from '../colors'

const AddModal = (props) => {
  const sid = useContext(SidContext)
  const [networkController] = useState(() => new NetworkController())
  const [username, setUsername] = useState('')
  const [picture, setPicture] = useState(null)
  const [comment, setComment] = useState('')
  const [delay, setDelay] = useState(null)
  const [status, setStatus] = useState(null)
  const [delayRadioButtonIsChecked, setDelayRadioButtonIsChecked] = useState(
    false,
  )
  const [statusRadioButtonIsChecked, setStatusRadioButtonIsChecked] = useState(
    false,
  )

  const setDefaultPicture = () => {
    const defaultAvatar = Image.resolveAssetSource(
      require('../assets/default_avatar.png'),
    ).uri
    setPicture(defaultAvatar)
  }

  useEffect(async () => {
    const base64prefix = 'data:image/png;base64,'
    const response = await networkController.getProfile(sid)
    setPicture(base64prefix + response.picture)
    setUsername(response.name)
  }, [])

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView>
        <Header
          title="Crea post"
          headerStyle={{ backgroundColor: COLORS.red }}
          headerTintColor="white"
          headerLeft={() => (
            <TouchableOpacity
              onPress={() => {
                props.dismiss()
                setDelayRadioButtonIsChecked(false)
                setStatusRadioButtonIsChecked(false)
              }}
            >
              <Icon
                name="close"
                style={{ marginLeft: 8 }}
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
          )}
          headerRight={() => (
            <Button
              color={'white'}
              title="Pubblica"
              disabled={
                (!delayRadioButtonIsChecked &&
                  !statusRadioButtonIsChecked &&
                  comment.length == 0) ||
                comment.length > 100
              }
              onPress={() => {
                console.log('publish post')
                networkController
                  .addPost(sid, props.did, delay, status, comment)
                  .then((r) => props.dismiss())
              }}
            />
          )}
        />
      </SafeAreaView>
      <View style={styles.imageUsernameContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: picture }}
          onError={() => setDefaultPicture()}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.comment}
          multiline={true}
          placeholder="Commento (max 100 caratteri)"
          onChangeText={(comment) => {
            if (comment.length != 0) {
              setComment(comment)
            } else {
              setComment('')
            }
          }}
        ></TextInput>
      </View>
      <Text style={styles.infoText}>Informazioni sul ritardo dei treni</Text>
      <DelayRadioButtons
        delayRadioButtonIsChecked={setDelayRadioButtonIsChecked}
        delay={setDelay}
      />
      <Text style={styles.infoText}>Informazioni sullo stato dei treni</Text>
      <StatusRadioButtons
        statusRadioButtonIsChecked={setStatusRadioButtonIsChecked}
        status={setStatus}
      />
    </Modal>
  )
}

/* style repetion for image, username and comment between post and addmodal? */
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
  infoText: { fontSize: 16, fontWeight: 'bold', paddingHorizontal: 16 },
  commentContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  comment: { fontSize: 16 },
})

export default AddModal
