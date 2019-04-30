import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  subTitle: string;
}

interface State {
  text: string;
}

export default class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: 'Graphql Demo',
    };
  }
  render() {
    const { subTitle } = this.props;
    return (
      <View>
        <Text style={styles.title}>{ this.state.text }</Text>
        <Text style={styles.subTitle}>{ subTitle }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    color: 'grey',
  },
});
