import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RootPage, AuthPage, ChatPage } from './pages';
import { MyModal } from './components';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RootPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
      <MyModal />
    </BrowserRouter>  
  </Provider>
);

export default App;