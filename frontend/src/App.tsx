import React from 'react';
import styles from './App.module.scss';

import { useStore } from './store'

import { Table } from './components/Table/Table'

function App() {
  const data = useStore((state: any) => state.data)
  const fetch = useStore((state: any) => state.fetch)

  const isLoaded = data.list
  if (!isLoaded) {
    fetch()
  }

  return (
    <div className={styles.app}>
      { isLoaded ?
        <Table {...data} /> :
        <p>Loading...</p>
      }

      <pre>
        {JSON.stringify(data, null, " ")}
      </pre>
    </div>
  );
}

export default App;
