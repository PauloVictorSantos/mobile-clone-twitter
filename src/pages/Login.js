import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    async componentWillMount() {
        const { username } = await AsyncStorage.getItem("@Gotwitter:username");
        if (username)
            this.navigateToTimeline();
    }

    navigateToTimeline = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Timeline' })
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    state = {
        username: ''
    }

    handleInputChange = username => {
        this.setState({ username });
    }


    handleLogin = async () => {
        const { username } = this.state;
        console.log(username);
        if (!username.length)
            return;
        await AsyncStorage.setItem('@Gotwitter:username', username);

        this.navigateToTimeline();

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.content}>
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>
                    <TextInput
                        onChangeText={this.handleInputChange}
                        style={styles.input}
                        value={this.state.username}
                        placeholder="Nome de usuário"
                        returnKeyType="send"
                        onSubmitEditing={this.handleLogin}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});
