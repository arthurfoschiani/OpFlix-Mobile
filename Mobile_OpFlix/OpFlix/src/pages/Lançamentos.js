import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, AsyncStorage } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

class Lancamentos extends Component {

    static navigationOptions = {
        header: null
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/Listar.png')}
                style={{ width: 25, height: 25, tintColor: 'white' }}
            />
        )
    }

    constructor() {
        super();
        this.state = {
            Lancamentos: []
        }
    }

    componentDidMount() {
        this._carregarLancamento();
    }

    _carregarLancamento = async () => {
        await fetch('http://192.168.3.14:5000/api/lancamentos', {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ Lancamentos: data }))
            .catch(erro => console.warn(erro));
    };

    render() {
        return (
            <ScrollView style={styles.ScrollView}>
                <View style={styles.Page}>
                    <View style={styles.menu}>
                        <Image source={require('../assets/img/Logo.png')} style={styles.Imagem} />
                        <Text style={styles.Sair}>Sair</Text>
                    </View>
                    <Text style={styles.h1}>Lançamentos</Text>
                    <FlatList style={styles.FlatList} data={this.state.Lancamentos} keyExtractor={item => item.idLancamento} renderItem={({ item }) => (
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
                    )} />
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
        width: "100%"
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
    Sair: {
        color: "white",
        fontSize: 20
    },
    h1: {
        fontSize: 30,
        color: "#ffffff",
        textTransform: "uppercase",
        marginTop: 15
    },
    FlatList: {
        backgroundColor: "#2C2C2C",
        marginBottom: 10,
    },
    div: {
        width: "95%",
        backgroundColor: "#707070",
        borderRadius: 15,
        padding: 5,
        marginLeft: 10,
        marginTop: 20,
    }
});

export default Lancamentos;