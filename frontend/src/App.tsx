import React from 'react';
import styles from './App.module.scss';

import { useStore } from './store'

import { Table } from './components/Table/Table'

function App() {
  const data = useStore((state: any) => state.data)
  const error = useStore((state: any) => state.error)
  const isFetching = useStore((state: any) => state.isFetching)
  const isFetched = useStore((state: any) => state.isFetched)
  const fetchDb = useStore((state: any) => state.fetchDb)

  const fetch = () => fetchDb();

  if (!isFetching && !isFetched) {
    fetchDb()
  }

  return (
    <div className={styles.app}>
      <div className={styles.table}>
          <div className={styles.db}>
            {/* <label className={styles.label}>
              DB ID
              <input
                className={styles.input}
                type="text"
              />
            </label> */}
            <button
              className={styles.reload}
              onClick={fetch}
            >
              Reload
            </button>
          </div>


        { isFetching ?
            <p>Loading...</p> :
            error ? <p>{error}</p> : <Table {...data} />
        }
      </div>

      {/* <div className={styles.code}>
        <pre>
          {JSON.stringify({ error, data }, null, "  ")}
        </pre>
      </div> */}
    </div>
  );
}

export default App;
