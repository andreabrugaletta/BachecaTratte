import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper'

const DelayRadioButtons = (props) => {
  const [checked, setChecked] = useState('fifth')

  /* check redundancy of disablePublishButton */
  return (
    <View>
      <View style={styles.radioButton}>
        {console.log('renderDelayRadioButtons')}
        <RadioButton
          value="first"
          status={checked !== 'first' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('first')
            props.delayRadioButtonIsChecked(true)
            props.delay(0)
          }}
        />
        <Text style={{ fontSize: 16 }}>In orario</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="second"
          status={checked !== 'second' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('second')
            props.delayRadioButtonIsChecked(true)
            props.delay(1)
          }}
        />
        <Text style={{ fontSize: 16 }}>In ritardo di pochi minuti</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="third"
          status={checked !== 'third' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('third')
            props.delayRadioButtonIsChecked(true)
            props.delay(2)
          }}
        />
        <Text style={{ fontSize: 16 }}>Ritardo di oltre 15 minuti</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="fourth"
          status={checked !== 'fourth' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('fourth')
            props.delayRadioButtonIsChecked(true)
            props.delay(3)
          }}
        />
        <Text style={{ fontSize: 16 }}>Treni soppressi</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton
          value="fifth"
          status={checked !== 'fifth' ? 'unchecked' : 'checked'}
          onPress={() => {
            setChecked('fifth')
            props.delayRadioButtonIsChecked(false)
          }}
        />
        <Text style={{ fontSize: 16 }}>Nessuna</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 8,
  },
})

export default DelayRadioButtons
