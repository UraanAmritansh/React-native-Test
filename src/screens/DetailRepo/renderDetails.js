import React , { useEffect, useState } from 'react';
import{View,Text ,Image , TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {cloudFrontUrl, s3Bucket} from '../../../config/API';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';

const RenderCard=props=>{
    const [notesThumbnailUrl,setNotesThumbnailUrl] = useState('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/620bd6d655f2044afa28bff4_glassmorphism.jpeg')
    const {
        data,
        onNotesCardPress,
        // setItemData,
        // openOptionModal,
        setModalAppears,
        setClicked
    } = props;
    // const colorScheme = Appearance.getColorScheme();
    
    // useEffect(()=>{
    //     if(data&&data.logoThumbnailPath&&data.logoThumbnailPath.startsWith(cloudFrontUrl)){
    //         setNotesThumbnailUrl(data.logoThumbnailPath)
    //     }
    //     else if(data&&data.logoThumbnailPath){
    //         if(data.logoThumbnailPath.includes(s3Bucket+'/notes/notesthumbnail/')){
    //             let newUrl = cloudFrontUrl+data.logoThumbnailPath.split(s3Bucket + '/').pop();
    //             setNotesThumbnailUrl(newUrl)
    //         }
    //     }
    // })    

    return(
        <TouchableOpacity 
        onPress={()=>{
            if(setModalAppears){
                if(data.mcqEnabled){
                    setModalAppears(true);
                    setClicked(data)
                }else{
                    onNotesCardPress(data)
                }
            }else{
                onNotesCardPress(data)
            }
            // console.log('data',data)
        }}
        style={styles.notesCard} >
                <Image 
                style={styles.image}
                source={{
                    uri:notesThumbnailUrl,
                }} />
                <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                    bottom: 0,
                    marginRight: 25,
                    position: 'absolute',
                    alignItems: 'flex-start',
                    width: '100%',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                }}
                colors={['#000', '#10000000']}
                >
                    <Text numberOfLines={1} style={styles.notesTitle}>
                        {data.name}
                    </Text>
                    <Text numberOfLines={1} style ={styles.subject}>
                        {data?.description||''}
                    </Text>
               
            {/* <View style={styles.notesDetails}>
                <View style={styles.optionIcon}>
                {props.noOptions?
                    <FontAwesome
                        name='trash'
                        size={20}
                        style={styles.optionIcon}
                        color={colors.white}
                        onPress={()=>props.onDelete(data.displayName,data.resourceId)}
                    />
                    :
                    <Entypo
                        name='dots-three-vertical'
                        size={22}
                        color='white'
                        onPress={()=>{
                            setItemData(data);
                            openOptionModal(data.displayName);
                        }}
                    />
                }
                </View>
            </View> */}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default RenderCard;

const styles=StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    notesContainer:{
        flexDirection:'column',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:18,
        marginTop:30,
       
    },
    notesDetails:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        // justifyContent:'space-between',
        // backgroundColor:'white',
        width:'100%',
        // height:50,
        padding:5,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        // color:'red',
        marginLeft:110
    },
    notesTitle: {
        //   fontFamily: Font.RUBIK,
          fontSize:18,
          color: '#fff',
          textTransform: 'uppercase',
          paddingTop: 20,
          paddingLeft: 10,
          paddingBottom: 5,
        //   width:110
        },
    subject:{
        fontSize: 12,
        color: '#fff',
        textTransform: 'uppercase',
        // paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 5,
        // width:110
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:7,
    },
    notesCard:{
        height:80,
        width:Dimensions.get('window').width*0.8,
        marginHorizontal:8,
        marginVertical:10,
        borderRadius:50,
        // borderWidth:StyleSheet.hairlineWidth,
        // elevation:20
    },
    optionIcon:{
        paddingTop:10,
        // paddingHorizontal:5,
        paddingVertical:5,   
    }
    
})