import React from 'react';
import { View, TouchableOpacity , Text , StyleSheet, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors';

FeatherIcon.loadFont();
FontAwesome.loadFont();
MaterialIcons.loadFont();
const {width}=Dimensions.get('window')

const Header = props => {
    const {
        leftIcon,
        onLeftIconPress,
        title,
        backgroundColor,
        titleColor,
    } = props;

    return (
        <View style={[styles.container,backgroundColor?{backgroundColor}:{}]}>
            {leftIcon ?
                <TouchableOpacity
                    style={{ flexDirection:'row',  width:'40%'  }}
                    onPress={onLeftIconPress}
                    style={styles.backIcon}
                >
                    <FeatherIcon
                    name={'arrow-left'}
                    color={title?titleColor?titleColor:colors.white:colors.black}
                    size={24} />
                </TouchableOpacity>
            :null}
            {title?
                <Text numberOfLines={1}  style={[styles.titleText,titleColor?{color:titleColor}:null]}>
                    {title}
                </Text>
            :null}
        </View>
    )
}

export default Header;

const styles=StyleSheet.create({
    container:{
        zIndex:1,
        top:0,
        height:50,
        width:'100%',
        backgroundColor:colors.themeBlue,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:12,
        paddingLeft:8,
    },
    backIcon:{
        height:24,
        width:28,
        position:'absolute',
        left:10,
        justifyContent:'center',
        alignItems:'center',
    },
    titleText:{
        fontSize:16,
        fontWeight:'bold',
        color:colors.white,
        // width:width-110,
        marginLeft:10,
        textAlign:'center'
    },

})