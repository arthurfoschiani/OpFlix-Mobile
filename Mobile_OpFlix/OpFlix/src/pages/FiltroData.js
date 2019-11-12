import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, AsyncStorage, Picker, TouchableOpacity} from 'react-native';
import {FlatList, ScrollView } from 'react-native-gesture-handler';

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
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Page}>
                    <View style={styles.menu}>
                        <Image source={require('../assets/img/Logo.png')} style={styles.Imagem} />
                        <Text style={styles.Sair}>Sair</Text>
                    </View>
                    <Text style={styles.h1}>Busque os lançamentos de cada mês</Text>
                    <Picker style={styles.Picker} selectedValue={this.state.MesEscolhido} onValueChange={(itemValue) => this.setState({MesEscolhido: itemValue})}>
                        <Picker.item label="Escolha o mês desejado" value="0" selectedValue/>
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
                    <TouchableOpacity style={styles.botao} onPress={this._carregarLancamento}>
                        <Text style={styles.texto}>Filtrar</Text>
                    </TouchableOpacity>
                    <FlatList style={styles.FlatList} data={this.state.Lancamentos} keyExtractor={item => item.idLancamento} renderItem={({item}) => (
                        <View style={styles.div}>
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
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
        height: "100%",
        backgroundColor: "#2C2C2C",
    },
    Page: {
        backgroundColor: "#2C2C2C",
        alignItems: "center",
        width: "100%",
    },
    Imagem: {
        width: 90,
        height: 40,
    },
    menu: {
        flexDirection: "row",
        height: 50,
        marginTop: 20,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    Picker: {
        marginTop: 20,
        width: "80%",
        alignItems: "center",
        color: "white",
        fontSize: 18
    },
    botao: {
        backgroundColor: "#040CF9",
        width: "80%",
        alignItems: "center",
        height: 30,
        borderRadius: 10,
        marginTop: 5
    },
    Sair: {
        color: "white",
        fontSize: 20
    },
    h1: {
        fontSize: 22,
        color: "#ffffff",
        textTransform: "uppercase",
        marginTop: 20,
        textAlign: "center",
        alignItems: "center"
    },
    FlatList: {
        backgroundColor: "#2C2C2C",
        marginTop: 20,
        marginBottom: 10,
        width: "100%"
    },
    div: {
        width: "95%",
        backgroundColor: "#707070",
        borderRadius: 15,
        padding: 5,
        marginLeft: 10,
        marginTop: 20
    },
    texto: {
        fontSize: 20,
        color: "#ffffff"
    }
});

export default FiltroData;