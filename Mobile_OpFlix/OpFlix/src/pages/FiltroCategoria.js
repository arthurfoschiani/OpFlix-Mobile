import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, AsyncStorage, Picker, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class FiltroCategoria extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
          <Image 
            source = {require('../assets/img/Filtrar.png')}
            style={{width: 25, height: 25, tintColor: 'white'}}
          />
        )
      }

    constructor () {
        super ();
        this.state = {
            Lancamentos: [],
            categoriaEscolhida: null,
            Categorias: [],
        }
    }

    componentDidMount() {
        this._carregarLancamento();
        this._carregarCategorias();
    }

    _carregarCategorias = async () => {
        await fetch('http://192.168.3.14:5000/api/categorias', {
          headers: {
            "Accept": "application/json",
            "Authorization":"Bearer " + await AsyncStorage.getItem("@opflix:token")
        }
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({Categorias: data}))
          .catch(erro => console.warn(erro));
      };
    
    _carregarLancamento = async () => {
    await fetch('http://192.168.3.14:5000/api/lancamentos/FiltrarPorCategoria/' + this.state.categoriaEscolhida, {
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
            <View>
                <Text>Filtrar por lançamentos por categorias</Text>
                <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({categoriaEscolhida: itemValue})}>
                    <Picker.item label="Categoria" value="0" selectedValue/>
                        {this.state.Categorias.map(e => {
                            return( <Picker.item label={e.categoria1} value={e.idCategoria}/>
                                )})}
                </Picker>
                <TouchableOpacity onPress={this._carregarLancamento}>
                    <Text>Filtrar</Text>
                </TouchableOpacity>
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
            </View>
        )
    }
}

export default FiltroCategoria;