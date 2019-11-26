import React, {Component} from 'react';
import {Text, StyleSheet, Image, TextInput, View, TouchableOpacity, AsyncStorage} from 'react-native';

class Verificacao extends Component {

    static navigationOptions = {
        header: null
        }
        
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        this._verificacao()
        console.disableYellowBox = true;
    }
    
    _verificacao = async () => {
        if(await AsyncStorage.getItem('@opflix:token') != null){
            this.props.navigation.navigate('MainNavigator')
        }else{
            this.props.navigation.navigate('AuthStack')
        }
    }
    
    
    render () {
        return (
            <View style={styles.Page}>
                <Image source = {require('../assets/img/Logo.png')} style={styles.Imagem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Page: {
        backgroundColor: "#2C2C2C",
        height: "100%",
        alignItems: "center"
    },
    Imagem: {
        alignItems: "center",
        marginTop: 220
    },
});

export default Verificacao;