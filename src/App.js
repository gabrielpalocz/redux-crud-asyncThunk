import './App.css';
import { Counter } from './store/feactures/counter/counter';
import { UserCrud } from './store/feactures/userCrud/userCrud';

function App() {
  return (
    <div className="App">
      <Counter />
      <UserCrud />
    </div>
  );
}

export default App;
