import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style/headertab.style';
import React from 'react'

export default function HeaderButton(props) {
  return (
    <TouchableOpacity style = {{
        backgroundColor: props.text === props.activeTab ? 'black' : 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
    }}
    onPress = {() => props.setActiveTab(props.text)}>
        <Text style = {{
            color: props.text === props.activeTab ? 'white' : 'black',
            fontWeight: 'bold'
        }}>{props.text}</Text>
    </TouchableOpacity>
  )
}