import './App.scss';
import AppContainer from './components/AppContainer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <AppContainer></AppContainer>
      </Router>
    </div>
  );
}

export default App;
