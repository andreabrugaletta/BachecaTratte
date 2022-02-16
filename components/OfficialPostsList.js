import React from 'react'
import { FlatList } from 'react-native'
import OfficialPost from './OfficialPost'
import ItemSeparator from './ItemSeparator'

const OfficialPostsLists = (props) => {
  return (
    <FlatList
      data={props.officialPosts}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <OfficialPost
          data={item}
          // navigation={props.navigation}
          setOfficialPostVisibility={props.setOfficialPostVisibility}
          setTitle={props.setTitle}
          setTimestamp={props.setTimestamp}
          setDescription={props.setDescription}
        />
      )}
      keyExtractor={(item, index) => item.timestamp}
    />
  )
}

export default OfficialPostsLists
