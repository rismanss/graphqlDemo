import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Content from './Content';
import { NavigationScreenConfigProps, NavigationScreenProps } from 'react-navigation';

type DemoScreenProps = NavigationScreenConfigProps;

interface Params {
  title: string;
}

class DetailScreen extends React.Component<DemoScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<Params>) => ({
    headerTitle: navigation.state.params ? navigation.state.params.title : 'Home' ,
  })
  render() {
    const { navigate } = this.props.navigation;
    const text = "fullstack graphql with expressjs, sequelize, react native and typescript";
    return (
      <View style={styles.container}>
        <Content subTitle={ text } />
        <TouchableOpacity 
          onPress={() => navigate('Show')}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Show Data</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigate('Create')}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Create Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default DetailScreen;
