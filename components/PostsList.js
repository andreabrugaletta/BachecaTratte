import React from 'react'
import { FlatList } from 'react-native'
import Post from './Post'
import ItemSeparator from './ItemSeparator'
import { SafeAreaView } from 'react-native-safe-area-context'

const PostsList = (props) => {
  return (
    <FlatList
      data={props.posts}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Post data={item} follow={props.follow} unfollow={props.unfollow} />
      )}
      keyExtractor={(item, index) => item.datetime}
    />
  )
}

export default PostsList
