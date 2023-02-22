import './App.css';
import { Counter } from './components/counter';
import { UserCrud } from './components/userCrud';

function App() {
  return (
    <div className="App">
    <h1>Redux example</h1>  
    <Counter />
    <h1>CRUD asyncThunk</h1>  
      <UserCrud />
    </div>
  );
}

export default App;
