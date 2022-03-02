import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Dimensions, StyleSheet, TextInput, Platform, Image } from 'react-native';
import Header from '../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToastMessage from '../../components/toast';
import colors from '../../constants/colors';
import { getData } from '../../Api';
import { locales } from '../../constants/locales';
import RenderCard from './renderDetails';
import config from '../../../env.json';

const DetailRepo=props=>{
    const {data,userNotExist,username}=props.route.params;
    const [notesThumbnailUrl,setNotesThumbnailUrl] = useState('https://wallpaperaccess.com/full/1732235.jpg');
    const [userDetails,setUserDetails]=useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        console.log('data',data);
        setLoading(true);
        getData(`${config.base_url}/users/${username}`)
        .then(res=>{
            setLoading(false);
            setUserDetails(res);
            console.log('user detail res',res);
        })
        .catch(err=>{
            setLoading(false);
            setUserDetails(null);
            console.log('user detail err.res',err.response);
        })
    },[])


    const loadmore=()=>{
        setLoading(true);
        setUserNotExist(false);
        getData(`${config.base_url}/users/${keyword}/repos?per_page=10&page=${page}`)
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


    const onNotesCardPress=(data)=>{
        console.log('onNotesCardPress');
        props.navigation.navigate('ReadMe',{data:data})
    }

    return(
        <View style={styles.container}>
            <Header
                leftIcon
                title={'Repos'}
                onLeftIconPress={()=>{
                    props.navigation.goBack();
                }}
            />
            
            <View style={styles.innerContainer}>
                {userDetails?
                    <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',width:'80%'}}>
                        <Image
                        style={styles.userDp}
                        source={{
                            uri:userDetails?.avatar_url||notesThumbnailUrl,
                        }} />
                        <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',height:70}}>
                            <Text numberOfLines={1} style={styles.notesTitle}>
                                {userDetails?.name||userDetails?.login}
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                <TouchableOpacity>
                                    <Text numberOfLines={1} style ={styles.subject}>
                                        {'Followers: '+userDetails?.followers}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text numberOfLines={1} style ={styles.subject}>
                                        {'Followings: '+userDetails?.following}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                :null}
                {
                    userNotExist?
                    <Text style ={styles.noDataFound}>{locales.global.userNotExist}</Text>
                    :
                    <>
                        <FlatList
                            contentContainerStyle ={styles.notesContainer}
                            showsVerticalScrollIndicator={false}
                            style={{flex:1,marginBottom:0}}
                            // showsVerticalScrollIndicator={false}
                            // onEndReached={isFilterApplied?filterDataEndReach:loadMore}
                            data={data}
                            ListEmptyComponent={<Text style ={styles.noDataFound}>{locales.global.noRepoFound}</Text>}
                            horizontal={false}
                            // numColumns={2}
                            renderItem={({item}) =>{
                                return(
                                <RenderCard
                                    navigation={props.navigation}
                                    data={item} 
                                    onNotesCardPress={onNotesCardPress}
                                />
                                )
                            }}
                            // refreshControl={
                            //     <RefreshControl
                            //     refreshing={loading}
                            //     // onRefresh={onRefresh}
                            //     onRefresh={onRefreshWholePage}
                            //     />
                            // }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </>
                }
            </View>

        </View>
    )
}

export default DetailRepo;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        width:'100%'
    },
    innerContainer:{
        flex:1,
        // backgroundColor:'red',
        alignItems:'center',
        // justifyContent:'center',
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
    noDataFound:{
        fontWeight:'bold',
        fontSize:14,
        color:colors.darkGrey,
        marginTop:20,
        alignSelf:"center"
    },
    overlay:{
        position:'absolute',
        height:'100%',
        width:'100%',
        zIndex:1,
        backgroundColor:'rgba(126,126,126,0.5)'
    },
    notesContainer:{
        // flexDirection:'column',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        // bottom:100,
        // marginTop:60
        // // top:10
        paddingBottom:90
    },
    image:{
        width:200,
        height:150,
        // borderRadius:50,
    },
    userDp:{
        width:70,
        height:70,
        borderRadius:50,
    },
    notesTitle: {
        fontSize:18,
        color: colors.black,
        textTransform: 'uppercase',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    subject:{
        fontSize: 14,
        color: colors.black,
        paddingLeft: 10,
        textDecorationLine:'underline',
    },
})