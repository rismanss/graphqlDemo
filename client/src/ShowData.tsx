import * as React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import graphqlTag from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { NavigationScreenConfigProps, NavigationScreenProps } from 'react-navigation';

type DemoScreenProps = NavigationScreenConfigProps;

interface Params {
  title: string;
}

const QUERY_POSTS = graphqlTag`
query queryPosts {
  users {
    id
    name
    email
    location
    tasks {
      id
      title
      description
    }
  }
}
`;

interface Data {
  users: {
    name: string;
    email: string;
    location: string;
    tasks: Tasks[];
    id: number;
  }[];
}

interface Tasks {
  id: number;
  title: string;
  description: string;
}

const DELETE_CAT = graphqlTag`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      name
    }
  }
`;

class QueryPosts extends Query<Data> {}

class ShowData extends React.Component<DemoScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps<Params>) => ({
    headerTitle: navigation.state.params ? navigation.state.params.title : 'Show' ,
  })

  render() {
    const { navigate } = this.props.navigation;
    return (
      <QueryPosts query={QUERY_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error: {error}</Text>;
          if (!data) return <Text>No Data</Text>;
          return (
            <FlatList
              data={data.users}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) =>
                <View style={styles.cards}> 
                  <Text>number : {item.id}</Text>
                  <Text>name : {item.name}</Text>
                  <Text>email : {item.email}</Text>
                  <Text>address : {item.location}</Text>
                  <View>
                    {item.tasks.map((i) => 
                      <View key={i.id}>
                        <Text>title : {i.title}</Text>
                        <Text>description : {i.description}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.rowButton}>
                    <View style={styles.submitButton}>
                      <TouchableOpacity
                        onPress={() => navigate('CreateTask', {userId: item.id})}
                      >
                        <Text style={styles.submitButtonText}> Task </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => navigate('Update', {
                        name: item.name, 
                        id: item.id,
                        location: item.location,
                        email: item.email
                      })}
                    >
                      <Text style={styles.submitButtonText}> Update </Text>
                    </TouchableOpacity>
                    <Mutation mutation={DELETE_CAT} refetchQueries={['queryPosts']}>
                      {deleteUser => (
                        <View style={styles.submitButton}>
                          <TouchableOpacity
                            onPress={() => deleteUser({variables: {userId: item.id}})}
                          >
                            <Text style={styles.submitButtonText}> Delete </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Mutation>
                  </View>
                </View>
              }
            />
          );
        }}
      </QueryPosts>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
    margin: 10
  },
  rowButton: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    width: '35%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  submitButtonText:{
    color: 'white'
  }
})

export default ShowData;
