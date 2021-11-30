import React from 'react'
import { FlatList } from 'react-native'
import Post from './Post'

const PostsList = (props) => {
  return (
    <FlatList
      data={props.posts}
      renderItem={({ item }) => <Post data={item} />}
      keyExtractor={(item, index) => item.datetime}
    />
  )
}

export default PostsList
