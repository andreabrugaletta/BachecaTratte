import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
import PostsList from '../components/PostsList'
import NetworkController from '../utils/NetworkController'
import { SidContext } from '../utils/SidContext'
import { LogBox, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import StorageManager from '../utils/StorageManager'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const BoardsScreen = (props) => {
  const index = props.route.params.index
  const getLine = props.route.params.getLine
  const swapLine = props.route.params.swapLine
  const sid = useContext(SidContext)
  const [posts, setPosts] = useState({})
  const [networkController] = useState(() => new NetworkController())
  const [storageManager] = useState(() => new StorageManager())

  /* TODO: make it more READABLE! */
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title:
        getLine(index).terminus1.sname + ' - ' + getLine(index).terminus2.sname,
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => {
              console.log('swap board')
              swapLine(index)
              const did = getLine(index).terminus1.did
              networkController.getPosts(sid, did, (posts) => {
                setPosts(posts)
              })
              props.navigation.setOptions({
                title:
                  getLine(index).terminus1.sname +
                  ' - ' +
                  getLine(index).terminus2.sname,
              })
            }}
          >
            <Image
              style={styles.imageButton}
              source={require('../assets/swap.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('plus board')}>
            <Image
              style={styles.imageButton}
              source={require('../assets/plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('map board')}>
            <Image
              style={styles.imageButton}
              source={require('../assets/map.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    storageManager.createUserTable()

    networkController.getPosts(sid, getLine(index).terminus1.did, (posts) => {
      console.log('setting posts')
      setPosts(posts)
    })
    return () => {
      setPosts({})
    }
  }, [])

  return <PostsList posts={posts} />
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
