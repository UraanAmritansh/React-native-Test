import React  from 'react';
import{View,Text , TouchableOpacity, StyleSheet, Dimensions, Appearance } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import moment from 'moment';

const RenderCard=props=>{
    const {
        data,
        onNotesCardPress,
        setModalAppears,
        setClicked
    } = props;   

    return(
        <TouchableOpacity 
        onPress={()=>onNotesCardPress(data)}
        style={styles.notesCard} >
            <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
                bottom: 0,
                marginRight: 25,
                position: 'absolute',
                alignItems: 'flex-start',
                width: '100%',
                borderTopLeftRadius: 25,
                borderBottomRightRadius: 25,
            }}
            colors={[colors.themeBlue, colors.gray]}
            >
                <View style={{flex:1}}>
                    <Text numberOfLines={1} style={styles.notesTitle}>
                        {data.name}
                    </Text>
                    <Text numberOfLines={1} style ={styles.subject}>
                        {data?.description||''}
                    </Text>
                    <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'space-between'}}>
                        <Text>{'</> '+(data?.language?data.language:'')}</Text>
                        <Text>{moment(data?.updated_at).format('LLL')||''}</Text>
                    </View>
                </View>
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
        backgroundColor:colors.white,
        width:'100%',
        padding:5,
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
        marginLeft:110
    },
    notesTitle: {
        fontSize:18,
        color: colors.white,
        textTransform: 'uppercase',
        paddingLeft: 10,
        marginVertical: 5,
    },
    subject:{
        fontSize: 12,
        color: colors.white,
        textTransform: 'uppercase',
        paddingLeft: 10,
        paddingBottom: 5,
        width:Dimensions.get('window').width*0.87
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:7,
    },
    notesCard:{
        height:80,
        width:Dimensions.get('window').width*0.9,
        marginVertical:10,
        borderRadius:7,
        // backgroundColor:colors.themeBlue,
    },
    optionIcon:{
        paddingTop:10,
        paddingVertical:5,   
    }
    
})