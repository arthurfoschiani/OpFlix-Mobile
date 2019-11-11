import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, AsyncStorage, Picker, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class FiltroData extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
          <Image 
            source = {require('../assets/img/Data.png')}
            style={{width: 25, height: 25, tintColor: 'white'}}
          />
        )
      }

    constructor () {
        super ();
        this.state = {
            Lancamentos: [],
            MesEscolhido: null,
        }
    }

    componentDidMount() {
        this._carregarLancamento();
    }
    
    _carregarLancamento = async () => {
    await fetch('http://192.168.3.14:5000/api/lancamentos/FiltrarPorDataLancamento/' + this.state.MesEscolhido, {
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
                <Text>Filtrar por lançamentos por mês</Text>
                <Picker selectedValue={this.state.MesEscolhido} onValueChange={(itemValue) => this.setState({MesEscolhido: itemValue})}>
                    <Picker.item label="Mês" value="0" selectedValue/>
                    <Picker.item label="Janeiro" value="1"/>
                    <Picker.item label="Fevereiro" value="2"/>
                    <Picker.item label="Março" value="3"/>
                    <Picker.item label="Abril" value="4"/>
                    <Picker.item label="Maio" value="5"/>
                    <Picker.item label="Junho" value="6"/>
                    <Picker.item label="Julho" value="7"/>
                    <Picker.item label="Agosto" value="8"/>
                    <Picker.item label="Setembro" value="9"/>
                    <Picker.item label="Outubro" value="10"/>
                    <Picker.item label="Novembro" value="11"/>
                    <Picker.item label="Dezembro" value="12"/>
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

export default FiltroData;