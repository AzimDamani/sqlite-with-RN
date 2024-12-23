import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { cacheProducts, getCachedProducts, initializeDB } from '../database/storeDb';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const FakeStore = () => {
    const [prodData, setData] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
    const fetchProducts = async () => {
        try{
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            // console.log(data);
            data.map((d: any) => {
                cacheProducts(d);
                // console.log(d);
            });
            setData(data);

        } catch(err) {
            console.log('Err', err);
        }
    };
    const fetchData = () => {
        getCachedProducts((cachedData: any) => {
            if(cachedData.length > 1){
                console.log('Loding from cachedData');
                // console.log(cachedData);
                setData(cachedData);
            } else {
                console.log('No data in cache');
                fetchProducts();
            }
        });
    };

    useEffect(() => {
        initializeDB()
            .then(() => fetchData())
            .catch(err => console.error('DB Initialization failed:', err));

        NetInfo.fetch().then(state => {
            setConnectionStatus(state.isConnected);
        });
    }, []);
    useFocusEffect(
        useCallback(() => {
            fetchData();
            NetInfo.fetch().then(state => {
                setConnectionStatus(state.isConnected);
            });
        }, [])
    );
  return (
    <View style={styles.container}>
        <View style={styles.internet}>
            <Text style={styles.internetTxt}>{connectionStatus === true ? 'Online 🟢' : 'Offline 🔴'}</Text>
        </View>
      <FlatList
      data={prodData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}: {item: any}) => (
        <TouchableOpacity style={styles.productCart}>
            <Image source={{uri: item.image}} style={styles.prodImg} />
            <Text>{item.title}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  );
};

export default FakeStore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#1f2224',
        // backgroundColor: 'gray',
    },
    productCart: {
        backgroundColor:'rgba(255, 255, 255, 0.87)',
        padding: 10,
        borderRadius: 20,
        margin: 10,
        elevation: 5,

    },
    prodImg : {
        height: 200,
        width: 200,
        borderRadius: 10,
        margin: 'auto',
    },
    internet: {
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        width: 110,
        position: 'absolute',
        zIndex: 3,
        top: '0%',
        right: '0%',
        backgroundColor: 'black',
        padding:5,
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',

    },
    internetTxt: {
        color: 'white',
        fontWeight: 800,
        fontSize: 20,
    },
});
