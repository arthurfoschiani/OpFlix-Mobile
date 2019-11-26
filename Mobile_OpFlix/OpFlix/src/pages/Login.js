import React, {Component} from 'react';
import {Text, StyleSheet, Image, TextInput, View, TouchableOpacity, AsyncStorage} from 'react-native';

class Login extends Component {

    static navigationOptions = {
        header: null
        }
        
    constructor() {
        super();
        this.state = {
            email: null,
            senha: null,
            erro: ""
        }
    }

    componentDidMount() {
        this._verificacao()
        console.disableYellowBox = true;
    }
    
    _verificacao = async () => {
        if(await AsyncStorage.getItem('@opflix:token') != null){
            this.props.navigation.navigate('MainNavigator')
        }
    }
    
    _realizarLogin = async () => {
        // console.warn(this.state.email + ' - ' + this.state.senha);
        fetch('http://192.168.3.14:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            })
        })
        .then(resposta => resposta.json())
        .then(data => {
                if(data.token != null){
                    this._irParaHome(data.token) 
                } else {
                    this.setState({erro: "Usuário ou senha inválidos"}),
                    console.warn(erro)
                }
            })
        .catch(erro => {
            this.setState({erro: "Usuário ou senha inválidos"}),
            console.warn(erro)
        })
    }
    
    _irParaHome = async (tokenRecebido) => {
        if(tokenRecebido != null) {
            try {
                await AsyncStorage.setItem('@opflix:token', tokenRecebido);
                this.props.navigation.navigate('MainNavigator')
            } catch (error) {
                
            }
        }
    }
    
    render () {
        return (
            <View style={styles.Page}>
                <Image source = {require('../assets/img/Logo.png')} style={styles.Imagem}/>
                <TextInput placeholder="email" placeholderTextColor="#B1B1B1" onChangeText={email => this.setState({email})} style={styles.Input}/>
                <TextInput placeholder="senha" secureTextEntry={true} placeholderTextColor="#B1B1B1" onChangeText={senha => this.setState({senha})} style={styles.Input}/>
                <Text style={{color: "red", textAlign: "center"}}>{this.state.erro}</Text>
                <TouchableOpacity onPress={this._realizarLogin} style={styles.botao}>
                    <Text style={styles.texto} >Login</Text>
                </TouchableOpacity>
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
        marginTop: 50
    },
    Input: {
        borderBottomColor: '#040CF9',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 50,
        width: "80%",
        height: 65,
        alignItems: "center",
        color: "white",
        fontSize: 18
    },
    botao: {
        backgroundColor: "#040CF9",
        width: "80%",
        alignItems: "center",
        height: 40,
        borderRadius: 10,
        paddingTop: 5,
        marginTop: 70
    },
    texto: {
        fontSize: 20,
        color: "#ffffff"
    }
});

export default Login;