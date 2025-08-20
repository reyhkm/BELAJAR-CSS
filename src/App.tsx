import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useChallengeData } from './hooks/useChallengeData';

function App() {
  // Load all challenge data into the store on app start
  useChallengeData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
