import React, {Component} from 'react';
import {Text, View, AsyncStorage, FlatList} from 'react-native';

class Lancamentos extends Component {

    constructor () {
        super ();
        this.state = {
            Lancamentos: []
        }
    }

    componentDidMount() {
        this._carregarLancamento();
    }
    
    _carregarLancamento = async () => {
    await fetch('http://192.168.3.14:5000/api/lancamentos', {
        headers:{
            "Accept": "application/json",
            "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
        },
    })
        .then(resposta => resposta.json())
        .then(data => this.setState({Lancamentos: data}))
        .catch(erro => console.warn(erro));
    };

    render () {
        return (
            <FlatList
            data={this.state.Lancamentos}
            keyExtractor={item => item.idLancamento}
            renderItem={({item}) => (
                <View>
                    <Text>Título: {item.nomeMidia}</Text>
                    <Text>Tipo da mídia: {item.idTipoMidiaNavigation.tipoMidia1}</Text>
                    <Text>Sinopse: {item.sinopse}</Text>
                    <Text>Tempo da duração: {item.tempoDuracao}</Text>
                    <Text>Categoria: {item.idCategoriaNavigation.categoria1}</Text>
                    <Text>Diretor: {item.idDiretorNavigation.diretor1}</Text>
                    <Text>Data do lançamento: {item.dataLancamento}</Text>
                    <Text>Plataforma: {item.idPlataformaNavigation.plataforma1}</Text>
                    <Text>Decrição: {item.descricao}</Text>
                </View>
            )}
            />
        )
    }
}

export default Lancamentos;