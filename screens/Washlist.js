import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {URL} from './utils/constant';

const Washlist = () => {
  const navigation = useNavigation();
  const [product, setproduct] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const url = URL.Url + `Watchlist/?user=`;
  const filterurl = URL.Url+'Listing/';
  const auth = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  useEffect(async () => {
    await axios.get(url + auth.user.user_id).then(resp => {
      setproduct(resp.data);
      let array = product.map(e => e.listing);
      axios.get(filterurl).then(response => {
        setfilterproduct(response.data);
        let array2 = response.data.filter(e => array.includes(e.id));
        setfilterproduct(array2);
      });
    });
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    await axios.get(url + auth.user.user_id).then(resp => {
      setproduct(resp.data);
      console.log(product, '1st attmpt');
      let array = product.map(e => e.listing);
      console.log(array, '2nd console');
      axios.get(filterurl).then(response => {
        setfilterproduct(response.data);
        console.log(filterproduct, '3rd console');
        let array2 = response.data.filter(e => array.includes(e.id));
        setfilterproduct(array2);
        setRefreshing(false);
        console.log(array2, '4th consloe');
      }).catch((error)=>{
        console.log(error);
      })
    });
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.ietm}>
        <Image style={{width: 300, height: 250}} source={{uri: item.image}} />
        <Text> TITLE: {item.title}</Text>
        <Text> DESCRIPTION: {item.description}</Text>
        <Text> STARTING PRICE: ${item.start_price}</Text>
        <Button
          title="Buy Now"
          onPress={() => navigation.navigate('ProductDetails', {item})}
        />
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
        <Text style={styles.text_header}>My WISHLIST</Text>
        
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
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={['#9Bd35A', '#689F38']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <FlatList
      ListHeaderComponent={()=>(<View>
        
    
      </View>)}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={filterproduct}
        renderItem={item => renderItem(item)}
      />
    </ScrollView>
    </View>
    </View>
  );
};
export default Washlist;

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
  ietm: {
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#009387',
    fontSize: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});