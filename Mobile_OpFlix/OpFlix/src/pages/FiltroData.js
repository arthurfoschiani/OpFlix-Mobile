import React, {Component} from 'react';
import {Text, StyleSheet, Image, View, AsyncStorage, Picker, TouchableOpacity, ActivityIndicator } from 'react-native';
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
            MesEscolhido: "",
            loading: true,
        }
    }

    componentDidMount () {
        this._carregarLancamento("");
        console.disableYellowBox = true;
    }
    
    _carregarLancamento = async (itemValue) => {
        this.setState({ loading: true })
        await fetch('http://192.168.3.14:5000/api/lancamentos/FiltrarPorDataLancamento/' + itemValue, {
            headers:{
                "Accept": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            },
        })
        .then(resposta => resposta.json())
        .then(data => this.setState({ loading: false, Lancamentos: data}))
        .catch(erro => console.warn(erro));
    };

    getParsedDate(date){
        date = String(date).split('T');
        var days = String(date[0]).split('-');
        return [parseInt(days[2]),"/", parseInt(days[1]),"/", parseInt(days[0])];
    }

    _listaVazia = () => { 
        if( this.state.MesEscolhido != "") {
            return (
                <View>
                    <Text style={{ textAlign: 'center', color: "white" }}>Nenhum lançamento encontrado nesse mês.</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={{ textAlign: 'center', color: "white" }}>Escolha um mês</Text>
                </View>
            );
        }
    };

    _Logout = async (event) => {
        await AsyncStorage.removeItem("@opflix:token");
        this.props.navigation.navigate('AuthStack')
    }

    render () {
        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Page}>
                    <View style={styles.menu}>
                        <Image source={require('../assets/img/Logo.png')} style={styles.Imagem} />
                        <TouchableOpacity><Text style={styles.Sair} onPress={this._Logout}>Sair</Text></TouchableOpacity>
                    </View>
                    <Text style={styles.h1}>Busque os lançamentos de cada mês</Text>
                    <Picker 
                    style={styles.Picker} 
                    selectedValue={this.state.MesEscolhido} 
                    onValueChange={(itemValue, itemIndex) => { 
                        this.setState({ MesEscolhido: itemValue })
                        this._carregarLancamento(itemValue)}}>
                        <Picker.item label="Todos os lançamentos" value="" selectedValue/>
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
                    {this.state.loading ?  <ActivityIndicator style={styles.container} size="large" color="#FE5300"/>  :
                    <FlatList style={styles.FlatList} data={this.state.Lancamentos} keyExtractor={item => item.idLancamento} ListEmptyComponent={this._listaVazia} renderItem={({item}) => (
                        <View style={styles.div}>
                            <Text style={styles.text}>Título: {item.nomeMidia}</Text>
                            <Text style={styles.text}>Tipo da mídia: {item.idTipoMidiaNavigation.tipoMidia1}</Text>
                            <Text style={styles.text}>Sinopse: {item.sinopse}</Text>
                            <Text style={styles.text}>Tempo da duração: {item.tempoDuracao}</Text>
                            <Text style={styles.text}>Categoria: {item.idCategoriaNavigation.categoria1}</Text>
                            <Text style={styles.text}>Diretor: {item.idDiretorNavigation.diretor1}</Text>
                            <Text style={styles.text}>Data do lançamento: {this.getParsedDate(item.dataLancamento)}</Text>
                            <Text style={styles.text}>Plataforma: {item.idPlataformaNavigation.plataforma1}</Text>
                            <Text style={styles.text}>Decrição: {item.descricao}</Text>
                        </View>
                    )}
                    />
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 350,
        justifyContent: 'center'
    },
    ScrollView: {
        height: "100%",
        backgroundColor: "#2C2C2C",
    },
    text: {
        color: "white"
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
        marginTop: 0,
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