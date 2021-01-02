import './App.css';
import Player from './components/player';

function App() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="font-serif my-6 text-right font-bold text-xl text-gray-800 dark:text-gray-100">Go to Sleep 💚</h1>
      <Player></Player>
    </div>
  );
}

export default App;
