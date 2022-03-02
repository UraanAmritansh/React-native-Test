import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet, ActivityIndicator, ScrollView}from 'react-native';
import { getData } from '../../Api';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import HTML from 'react-native-render-html'
import {Converter} from 'showdown';
import {decode} from 'base-64'

const ReadMe=props=>{
    const {data}=props.route.params;
    const [htmlContent,setHtmlContent]=useState(null);
    const [loading,setLoading]=useState(false);
    console.log('props',props);
    useEffect(()=>{
        setLoading(true);
        getData(`${data.url}/readme`)
        .then(res=>{
            setLoading(false);
            // console.log('readme res',res);
            let converter = new Converter();
            let decodedText=decode(res?.content||'')
            let html = converter.makeHtml(decodedText);
            setHtmlContent(html);
            // console.log('html',html);
        })
        .catch(err=>{
            // console.log(' readme err',err);
            setLoading(false);
            setHtmlContent('<h4>ReadMe file not found</h4>');
            // console.log('readme err.res',err.response);
        })
    },[data])
    return(
        <View style={styles.container}>
            <Header
                leftIcon
                // gridIcon
                // rightIcon
                title={'Read Me'}
                onLeftIconPress={()=>{
                    props.navigation.goBack();
                }}
                // onrightIconPress={()=>{
                //     props.navigation.navigate('Notifications');
                // }}
            />
            <ScrollView contentContainerStyle={{marginBottom:100,padding:10}}>
                {loading?
                    <ActivityIndicator size={'large'} color={colors.themeBlue} />
                    :
                    <HTML
                    contentWidth={400}
                    source={{ html: htmlContent }}
                    tagsStyles={{
                        body: {color: 'black'},
                        a: {color: 'red'}
                    }}
                    />
                }
            </ScrollView>
        </View>
    )
}

export default ReadMe;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        width:'100%'
    },
})