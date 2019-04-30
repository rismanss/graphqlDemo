import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenConfigProps, NavigationScreenProps } from 'react-navigation';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

type DemoScreenProps = NavigationScreenConfigProps;

interface Params {
  title: string;
}

const ADD_TODO = gql`
  mutation addUser ($userName: String!, $location: String!, $email: String!){
    addUser(userName: $userName, location: $location, email: $email) {
      id
      name
    }
  }
`;

interface State {
  name: string;
  location: string;
  email: string;
}

class CreateInput extends React.Component<DemoScreenProps, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<Params>) => ({
    headerTitle: navigation.state.params ? navigation.state.params.title : 'Create' ,
  })

  state = {
    name: '',
    location: '',
    email: ''
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Mutation mutation={ADD_TODO} refetchQueries={['queryPosts']}>
        {(addUser) => (
          <View>
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Name'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= ''
              onChangeText = {name => this.setState({name})}
            />
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Location'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= ''
              onChangeText = {location => this.setState({location})}
            />
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Email'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= ''
              onChangeText = {email => this.setState({email})}
            />
            <TouchableOpacity
              style = {styles.submitButton}
              onPress = {() => {
                addUser({variables: {
                  userName: this.state.name, 
                  location: this.state.location,
                  email: this.state.email
                }}),
                navigate('Home')
              }}
            >
              <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText:{
    color: 'white'
  }
})

export default CreateInput;
