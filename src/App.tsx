import { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DiagnosticsTable } from './components/DiagnosticsTable';
import { FusionTrend } from './components/FusionTrend';
import type { Diagnostic } from './types';

const URL = 'http://localhost:3500/diagnostics';

function App() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setDiagnostics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAddDiagnostic = (newItem: Diagnostic) => {
    setDiagnostics((prev) => [...(prev ?? []), newItem]);
  };

  return (
    <Layout>
      {diagnostics && <FusionTrend diagnostics={diagnostics} />}
      {diagnostics && <DiagnosticsTable diagnostics={diagnostics} onAdd={handleAddDiagnostic} />}
    </Layout>
  );
}

export default App;
