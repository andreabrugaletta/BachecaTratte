import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import PostsList from '../components/PostsList'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'
import {
  LogBox,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import StorageManager from '../utils/StorageManager'
import MapModal from '../components/MapModal'
import AddModal from '../components/AddModal'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const BoardsScreen = (props) => {
  const index = props.route.params.index
  const getLine = props.route.params.getLine
  const swapLine = props.route.params.swapLine
  const sid = useContext(SidContext)
  const [mapVisibility, setMapVisibility] = useState(false)
  const [addPostVisibility, setAddPostVisibility] = useState(false)
  const [posts, setPosts] = useState()
  const [networkController] = useState(() => new NetworkController())
  const [storageManager] = useState(() => new StorageManager())

  const fetchPictureFromServerAndUpdateDbAsync = async (post) => {
    const base64prefix = 'data:image/png;base64,'
    const authorPic = await networkController.getUserPicture(sid, post.author)

    post.picture = base64prefix + authorPic

    const user = {
      id: post.author,
      username: post.authorName,
      picture: post.picture,
      pversion: post.pversion,
    }
    storageManager.insertUserAsync(user)
  }

  const getPosts = (did) => {
    networkController.getPosts(sid, did).then(async (posts) => {
      posts.sort((a, b) => b.followingAuthor - a.followingAuthor)
      const postsWithPic = await Promise.all(
        posts.map(async (post) => {
          const author = post.author
          const isInDb = await storageManager.isUserInDbAsync(author)
          if (isInDb) {
            //user is in db
            const pversion = await storageManager.getPictureVersionAsync(author)
            if (pversion == post.pversion) {
              const authorPic = await storageManager.getUserPictureAsync(author)
              post.picture = authorPic
            } else {
              await fetchPictureFromServerAndUpdateDbAsync(post)
            }
          } else {
            //user is not in db
            await fetchPictureFromServerAndUpdateDbAsync(post)
          }
          return post
        }),
      )
      setPosts(postsWithPic)
    })
  }

  const dismissMapModal = () => {
    setMapVisibility(false)
  }
  const dismissAddModal = () => {
    setAddPostVisibility(false)
    getPosts(getLine(index).terminus1.did)
  }
  const follow = (author) => {
    networkController
      .follow(sid, author)
      .then(() => getPosts(getLine(index).terminus1.did))
  }
  const unfollow = (author) => {
    networkController
      .unfollow(sid, author)
      .then(() => getPosts(getLine(index).terminus1.did))
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title:
        getLine(index).terminus1.sname + ' - ' + getLine(index).terminus2.sname,
      headerTintColor: 'white',
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => {
              console.log('swap board')
              swapLine(index)
              getPosts(getLine(index).terminus1.did)
              props.navigation.setOptions({
                title:
                  getLine(index).terminus1.sname +
                  ' - ' +
                  getLine(index).terminus2.sname,
              })
            }}
          >
            <MaterialIcon name="swap-horiz" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('plus board')
              setAddPostVisibility(true)
            }}
          >
            <FeatherIcon name="plus" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('map board')
              setMapVisibility(true)
            }}
          >
            <FeatherIcon name="map" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    storageManager.createUserTable()
    getPosts(getLine(index).terminus1.did)
    return () => {
      setPosts({})
    }
  }, [])

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <MapModal
        visible={mapVisibility}
        dismiss={dismissMapModal}
        did={getLine(index).terminus1.did}
      />
      <AddModal
        visible={addPostVisibility}
        dismiss={dismissAddModal}
        did={getLine(index).terminus1.did}
      />
      <PostsList posts={posts} follow={follow} unfollow={unfollow} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageButton: {
    height: 32,
    width: 32,
    tintColor: '#474747',
  },
  headerButtons: {
    flexDirection: 'row',
  },
})

export default BoardsScreen
