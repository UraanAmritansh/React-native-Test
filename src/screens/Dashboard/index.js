import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Platform, Image, ScrollView } from 'react-native';
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
        getData(`${config.base_url}/users/${keyword}/repos?per_page=10&page=1`)
        .then(res=>{
            console.log('res',res);
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
            
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <View style={styles.image}>
                    <Image
                        style={{flex:1,width:'100%',height:undefined}}
                        source={{
                            // uri:'https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png',
                            // uri:'https://mpng.subpng.com/20180824/jtl/kisspng-computer-icons-logo-portable-network-graphics-clip-icons-for-free-iconza-circle-social-5b7fe46b0bac53.1999041115351082030478.jpg'
                            uri: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
                        }} 
                    />
                </View>
                <View style={{margin:10,width:'100%',alignItems:'center',marginTop:100}}>
                    <TextInput
                        style={styles.textInput}
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                        placeholder={'Enter User Name...'}
                        placeholderTextColor={colors.themeGray}
                        autoCapitalize='none'
                    />
                    <View style={{width:'80%'}}>
                        {userNotExist?<Text style={{color:'red'}}>{locales.global.userNotExist}</Text>:null}
                    </View>
                    <TouchableOpacity
                        onPress={onSearch}
                        disabled={!keyword.length}
                        style={{backgroundColor:keyword.length?colors.themeBlue:colors.gray,padding:10,paddingHorizontal:10,width:'80%',marginTop:20,borderRadius:50}}
                    >
                        {loading? 
                            <ActivityIndicator size={'small'} color={colors.white} />
                            :
                            <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:colors.white}}>{'Search'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
        // borderBottomWidth:StyleSheet.hairlineWidth,
        // borderBottomColor:colors.black,
        margin:20,
        color:colors.black,
        width:'80%',
        marginVertical:Platform.OS==='ios'?10:0,
        fontSize:18,
        backgroundColor:colors.lightGray,
        borderRadius:20,
        paddingLeft:10
    },
    image:{
        width:200,
        height:150,
        backgroundColor:colors.white
        // borderRadius:50,
    },
})