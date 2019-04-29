import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationScreenConfigProps, NavigationScreenProps } from 'react-navigation';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

type DemoScreenProps = NavigationScreenConfigProps;

interface Params {
  title: string;
}

const UPDATE = gql`
  mutation updateUser($userId: ID!, $userName: String!, $location: String, $email: String) {
    updateUser(userId: $userId, userName: $userName, location: $location, email: $email) {
      name
    }
  }
`;

class UpdateInput extends React.Component<DemoScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<Params>) => ({
    headerTitle: navigation.state.params ? navigation.state.routeName : 'Update' ,
  })

  state = {
    name: this.props.navigation.getParam('name'),
    location: this.props.navigation.getParam('location'),
    email: this.props.navigation.getParam('email')
  }
  render() {
      console.log(this.props.navigation.getParam('name')+' ..prev');
      console.log(this.state.name+' ..next');
      const { navigate } = this.props.navigation;
    return (
      <Mutation 
        mutation={UPDATE} 
        key={this.props.navigation.getParam('id')}
        refetchQueries={['queryPosts']}
      >
        {updateUser => (
          <View>
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Name'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= {this.props.navigation.getParam('name')}
              onChangeText = {name => this.setState({name})}
            />
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Location'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= {this.props.navigation.getParam('location')}
              onChangeText = {location => this.setState({location})}
            />
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Email'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= {this.props.navigation.getParam('email')}
              onChangeText = {email => this.setState({email})}
            />
              <TouchableOpacity
                style = {styles.submitButton}
                onPress = {() => {
                  updateUser({variables: {
                    userId: this.props.navigation.getParam('id'), 
                    userName: this.state.name,
                    location: this.state.location,
                    email: this.state.email
                  }}),
                  navigate('Show')
                }}
              >
                <Text style = {styles.submitButtonText}> Update </Text>
              </TouchableOpacity>
            <Text>
              {this.state.name === '' ? this.props.navigation.getParam('name') : this.state.name}
            </Text>
            <Text>{this.props.navigation.getParam('id')}</Text>
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
  },
  submitButtonText:{
     color: 'white'
  }
})

export default UpdateInput;
