import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet,} from 'react-native';
import { NavigationScreenConfigProps, NavigationScreenProps } from 'react-navigation';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

type DemoScreenProps = NavigationScreenConfigProps;

interface Params {
  title: string;
}

const ADD_TASK = gql`
  mutation addTask ($userId: ID!, $title: String!, $description: String!) {
    addTask (userId: $userId, title: $title, description: $description) {
      userId
      title
      description
    }
  }
`;

class CreateTask extends React.Component<DemoScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<Params>) => ({
    headerTitle: navigation.state.params ? navigation.state.routeName : 'Create Task' ,
  })

  state = {
    userId: this.props.navigation.getParam('userId'),
    title: '',
    description: ''
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Mutation mutation={ADD_TASK} refetchQueries={['queryPosts']}>
        {(addTask) => (
          <View>
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Title'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= ''
              onChangeText = {title => this.setState({title})}
            />
            <TextInput style = {styles.input}
              underlineColorAndroid = 'transparent'
              placeholder = 'Input Description'
              placeholderTextColor = '#9a73ef'
              autoCapitalize = 'none'
              defaultValue= ''
              onChangeText = {description => this.setState({description})}
            />
            <TouchableOpacity
              style = {styles.submitButton}
              onPress = {() => {
                addTask({variables: {
                  userId: this.state.userId, 
                  title: this.state.title,
                  description: this.state.description
                }}),
                navigate('Show')
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
});

export default CreateTask;
