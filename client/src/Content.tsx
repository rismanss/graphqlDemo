import * as React from 'react';
import { Text, View } from 'react-native';

interface Props {
  name: string;
}

interface State {
  text: string;
}

export default class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: 'hello.. ',
    };
  }
  render() {
    const { name } = this.props;
    return (
      <View>
        <Text>Hello Expo..!</Text>
        <Text>{this.state.text} { name }</Text>
      </View>
    );
  }
}
