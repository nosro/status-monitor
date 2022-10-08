import Monitor from './components/Monitor';

function App() {
  return (
    <div style={{padding: '2rem'}}>
      <h1>Status Monitor</h1>
      <Monitor service='/v1/all-status' />
      <Monitor service='/v1/amazon-status' />
      <Monitor service='/v1/google-status' />
    </div>
  );
}

export default App;
