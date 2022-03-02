import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Platform, Image } from 'react-native';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import { getData } from '../../Api';
import { locales } from '../../constants/locales';
import config from '../../../env.json';

const Dashboard=props=>{
    const [keyword,setKeyword]=useState('');
    const [repos,setRepos]=useState([]);
    const [loading,setLoading]=useState(false);
    const [userNotExist,setUserNotExist]=useState(false);

    const onSearch=()=>{
        setLoading(true);
        setUserNotExist(false);
        getData(`${config.base_url}/users/${keyword}/repos`)
        .then(res=>{
            setLoading(false);
            setRepos(res);
            props.navigation.navigate('DetailRepo',{data:res,username:keyword})
        })
        .catch(err=>{
            setUserNotExist(true);
            setLoading(false);
            setRepos([]);
            console.log('err.res',err.response);
        })
    }

    return(
        <View style={styles.container}>
            <Header
                title={'Get Github Repos'}
            />
            
            <View style={styles.innerContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri:'https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png',
                    }} 
                />
                <View style={{margin:10,width:'100%',alignItems:'center',marginTop:100}}>
                    <TextInput
                        style={styles.textInput}
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                        placeholder={'Enter User Name...'}
                        autoCapitalize='none'
                    />
                    <View style={{width:'80%%'}}>
                        {userNotExist?<Text style={{color:'red'}}>{locales.global.userNotExist}</Text>:null}
                    </View>
                    <TouchableOpacity
                        onPress={onSearch}
                        disabled={!keyword.length}
                        style={{backgroundColor:keyword.length?'#80dff2':colors.gray,padding:10,paddingHorizontal:10,width:'80%',marginTop:20,borderRadius:50}}
                    >
                        {loading? 
                            <ActivityIndicator size={'small'} color={colors.themeBlue} />
                            :
                            <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold'}}>{'Search'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Dashboard;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        width:'100%'
    },
    innerContainer:{
        flex:1,
        alignItems:'center',
        width:'100%',
        backgroundColor:colors.white,
        marginTop:50
    },
    textInput:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:colors.black,
        margin:20,
        color:colors.black,
        width:'80%',
        marginVertical:Platform.OS==='ios'?10:0,
        fontSize:18
    },
    image:{
        width:200,
        height:150,
        // borderRadius:50,
    },
})