import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {View, Image, FlatList,Text,StyleSheet, Button,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './utils/constant';

const Sold=({navigation})=> {

  const[sold,setsold]=useState([]);
  

  useEffect(()=>{
axios.get(URL.Url+'Listing/').then(resp =>{
  let array= resp.data.filter( e => e.completed===true)
    setsold(array)
  
});
  },[])





const renderItem = ({item}) => {
    return (
      <View style={styles.ietm}>
          <Image
          style={{width:300,height:250,alignSelf:'center',marginBottom:10}}
          source={{uri:item.image}}
          />
        <Text > Title: {item.title}</Text>
        <Text > Artist: {item.artist}</Text>
        <Text > Starting Price: ${item.start_price}</Text>
        <Button title='Buy Now' onPress={()=>navigation.navigate('Aftersold',{item})} />
        
      </View>
    );
  };


  
    return (
      <View style={styles.container}>
         <TouchableOpacity
        style={{padding: 20}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image
          source={require('./images/menu.png')}
          style={{
            height: 30,
            width: 30,
            resizeMode: 'contain',
            tintColor: 'white',
          }}></Image>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_header}>SOLD PRODUCTS</Text>
        
        <Text
          style={{
            fontStyle: 'italic',
            color: '#fff',
            fontSize: 20,
            marginTop: 5,
          }}>
          A platform where you can sell and buy your desired artworks!
        </Text>
      </View>
      <View style={styles.footer}>
         <FlatList style={styles}
         ListHeaderComponent={()=>(<View>


      <View style={styles.header}>

      </View>
    

         </View>)}
        data={sold} 

        renderItem={renderItem} />
</View>
      </View>
    );
  }
  

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#009387',
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 4,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 50,
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
    },ietm: {
      marginTop: 10,
      paddingVertical: 30,
      paddingHorizontal: 10,
      backgroundColor: '#009387',
      fontSize: 15,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  export default Sold;
