import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
    return (
        <View>
            <View  style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, }}>Welcome, Khan</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <FontAwesome style={styles.icon} name="bell" size={18} />
                    <FontAwesome style={styles.icon} name="search" size={18} />
                </View>

            </View>
            {/* <View style={{  flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <TextInput placeholder='Search here' style={styles.input} placeholderTextColor={"grey"} selectionColor={"#f00"} />
                </View>

            </View> */}
             <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search here"
        placeholderTextColor="gray"
      />
    </View>
        </View>

    );
};

const styles = StyleSheet.create({

    textInputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
      },
      textInput: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
      },


    container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 54,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 8,
  },
    
    searchContainer: {
        height: 70,
        width: "100%",
        backgroundColor: 10,
        alignItems: 'center'
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        backgroundColor: "grey",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 10,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default Header;