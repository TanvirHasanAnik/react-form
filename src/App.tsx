import './App.css';
import {z} from 'zod';

function App() {
  function handleButtonClick(){
    const UserSchema = z.object({
      username: z.string(),
    })
    const user = {username: "aa"}
    console.log(UserSchema.parse(user))
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <button onClick={handleButtonClick}>Button</button>
      </main>
    </div>
  );
}

export default App;
