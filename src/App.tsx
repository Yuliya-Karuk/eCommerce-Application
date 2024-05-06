import {useState, useEffect} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './styles/App.scss';
import {apiRoot} from './commercetool/Client';

function App() {
  const [count, setCount] = useState(0);

  const [projectDetails, setProjectDetails] = useState({});

  const getProject = async () => {
    try {
      const project = await apiRoot.get().execute();

      setProjectDetails(project.body);
    } catch (error) {
      throw Error('test - error message');
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(prev => prev + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>{JSON.stringify(projectDetails)}</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
