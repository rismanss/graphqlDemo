import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailScreen from './DetailScreen';
import CreateInput from './CreateInput';
import ShowData from './ShowData';
import UpdateInput from './UpdateInput';
import CreateTask from './CreateTask';

const AppNav = createStackNavigator({
  Home: {
    screen: DetailScreen
  },
  Show: {
    screen: ShowData
  },
  Create: {
    screen: CreateInput
  },
  Update: {
    screen: UpdateInput
  },
  CreateTask: CreateTask 
});

export default createAppContainer(AppNav);
