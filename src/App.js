import './App.css';
// import Howl from './components/howl';
import Player from './components/player';

function App() {
  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="font-serif my-8 text-center font-bold text-4xl text-gray-800 dark:text-gray-100">Go to Sleep</h1>
      {/* <Howl></Howl> */}
      <Player></Player>
    </div>
  );
}

export default App;
