import React, {Component} from 'react';
import {Text, TextInput, View, TouchableOpacity, AsyncStorage} from 'react-native';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: 'arthur@email.com',
            senha: '123456'
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
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn('ocorreu um erro: ' + erro))
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
            <View>
                <TextInput placeholder="email" onChangeText={email => this.setState({email})}/>
                <TextInput placeholder="senha" onChangeText={senha => this.setState({senha})}/>
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login;