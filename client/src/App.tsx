import React, { useEffect, useState } from 'react';
import { fetchSampleData } from './services/apiService';

interface SampleData {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<SampleData[]>([]);

  useEffect(() => {
    fetchSampleData().then(response => setData(response.data));
  }, []);

  return (
    <div className="App">
      <h1>Sample Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
