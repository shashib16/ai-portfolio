import { JSX } from 'react';
import './App.css';
import ShowcaseApp from './components/showcase/ShowcaseApp';

function App(): JSX.Element {
  return (
    <div className="w-full min-h-screen bg-gray-900 m-0 p-0">
      <ShowcaseApp />
    </div>
  );
}

export default App;