import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostsList from '../components/PostsList'
import { SidContext } from '../utils/SidContext'

const BoardsScreen = (props) => {
  const { terminus } = props.route.params
  const sid = useContext(SidContext)
  const GET_POSTS_URL =
    'https://ewserver.di.unimi.it/mobicomp/treest/getPosts.php'
  const [posts, setPosts] = useState({})

  const getPosts = async () => {
    try {
      const response = await fetch(GET_POSTS_URL, {
        method: 'POST',
        body: JSON.stringify({ sid: sid, did: terminus.did }),
      })
      const json = await response.json()
      setPosts(json.posts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPosts()
    return () => {
      setPosts({})
    }
  }, [])

  return <PostsList posts={posts} />
}

export default BoardsScreen
