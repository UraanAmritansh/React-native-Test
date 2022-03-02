import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Dimensions, StyleSheet, TextInput, Platform, Image, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import { getData } from '../../Api';
import { locales } from '../../constants/locales';
import RenderCard from './renderDetails';
import config from '../../../env.json';

const DetailRepo=props=>{
    const {data,userNotExist,username}=props.route.params;
    const [userThumbnailUrl,setUserThumbnailUrl] = useState('https://wallpaperaccess.com/full/1732235.jpg');
    const [userDetails,setUserDetails]=useState(null);
    const [loading,setLoading]=useState(false);
    const [onRefreshloading,setOnRefreshloading]=useState(false);
    const [repoData,setRepoData]=useState(data);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        console.log('data',data);
        // setLoading(true);
        getData(`${config.base_url}/users/${username}`)
        .then(res=>{
            // setLoading(false);
            setUserDetails(res);
            console.log('user detail res',res);
        })
        .catch(err=>{
            // setLoading(false);
            setUserDetails(null);
            console.log('user detail err.res',err.response);
        })
    },[])

    const getRepoFromApi=(refresh)=>{
        getData(`${config.base_url}/users/${username}/repos?per_page=10&page=${refresh?1:page+1}`)
        .then(res=>{
            if(refresh){
                console.log('user refresh res',res);
            }else{
                console.log('user loadmore res',res);
            }
            if(res.length){
                if(refresh){
                    setPage(1);
                    setRepoData(res);
                }else{
                    setPage(page+1);
                    setRepoData([...repoData,...res]);
                }
            }
            setLoading(false);
            setOnRefreshloading(false);
        })
        .catch(err=>{
            setLoading(false);
            console.log('err.res',err.response);
        })
    }


    const loadmore=()=>{
        if(repoData.length==(page*10)){
            setLoading(true);
            getRepoFromApi();
        }
    }

    const onRefresh=()=>{
        setOnRefreshloading(true);
        getRepoFromApi(true);
    }

    const onRepoCardPress=(data)=>{
        props.navigation.navigate('ReadMe',{data:data})
    }

    return(
        <View style={styles.container}>
            <Header
                leftIcon
                title={`${username}'s repositories`}
                onLeftIconPress={()=>{
                    props.navigation.goBack();
                }}
            />
            
            <View style={styles.innerContainer}>
                {userDetails?
                    <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',width:'80%',marginVertical:20}}>
                        <Image
                        style={styles.userDp}
                        source={{
                            uri:userDetails?.avatar_url||userThumbnailUrl,
                        }} />
                        <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',height:70}}>
                            <Text numberOfLines={1} style={styles.userTitle}>
                                {userDetails?.name||userDetails?.login}
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                <TouchableOpacity>
                                    <Text numberOfLines={1} style ={styles.followDetail}>
                                        {'Followers: '+userDetails?.followers}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text numberOfLines={1} style ={styles.followDetail}>
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
                            contentContainerStyle ={styles.repoContainer}
                            showsVerticalScrollIndicator={false}
                            style={{flex:1,marginBottom:0}}
                            onEndReached={loadmore}
                            data={repoData}
                            ListEmptyComponent={<Text style ={styles.noDataFound}>{locales.global.noRepoFound}</Text>}
                            horizontal={false}
                            renderItem={({item}) =>{
                                return(
                                <RenderCard
                                    navigation={props.navigation}
                                    data={item} 
                                    onRepoCardPress={onRepoCardPress}
                                />
                                )
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={onRefreshloading}
                                    onRefresh={onRefresh}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </>
                }
                {loading?
                    <View style={{position:'absolute',bottom:0}}>
                        <ActivityIndicator color={colors.black} size={'small'} />
                    </View>
                :null}
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
        alignItems:'center',
        width:'100%',
        backgroundColor:colors.white,
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
    repoContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    userDp:{
        width:70,
        height:70,
        borderRadius:50,
    },
    userTitle: {
        fontSize:18,
        fontWeight:'500',
        color: colors.black,
        textTransform: 'uppercase',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    followDetail:{
        fontSize: 14,
        fontWeight:'500',
        color: colors.black,
        paddingLeft: 10,
        textDecorationLine:'underline',
    },
})