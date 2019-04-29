import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
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
    return (
      <View style={styles.container}>
        <Content name="risman" />
        <Button
          title="Show Data"
          onPress={() => navigate('Show')}
        />
        <Button
          title="Create Data"
          onPress={() => navigate('Create')}
        />
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
});

export default DetailScreen;
