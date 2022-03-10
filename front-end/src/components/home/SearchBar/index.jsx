import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import styles from "./style/searchBar.style";
import React from "react";

export default function SearchBar(props) {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{key: "AIzaSyB77rLQorMj8IlLsLw-1zE-utEUk29-_2s"}}
        styles={{
          textInput: {
            backgroundColor: "#e6e6e6",
            borderRadius: 20,
            fontWeight: "bold",
            height: 40
          },
        }}
        placeholder="Search"
      />
    </View>
  );
}
