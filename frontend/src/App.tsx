import React from 'react';
import styles from './App.module.scss';

import { useStore } from './store'

import { Table } from './components/Table/Table'
import { Sort } from './components/Sort/Sort'

function App() {
  const { list, columnsMap} = useStore((state: any) => state.data)
  const error = useStore((state: any) => state.error)
  const isFetching = useStore((state: any) => state.isFetching)
  const isFetched = useStore((state: any) => state.isFetched)
  const fetchDb = useStore((state: any) => state.fetchDb)
  const sorts = useStore((state: any) => state.sorts)
  const addSort = useStore((state: any) => state.addSort)
  const removeSort = useStore((state: any) => state.removeSort)

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
            { error && <p>{error}</p> }
            { isFetching &&
                <p>Loading...</p>
            }
            <button
              className={styles.reload}
              onClick={fetch}
            >
              Reload
            </button>
          </div>


          <div
            className={styles.sort}
          >
            <Sort
              {...{
                columnsMap,
                sorts,
                addSort,
                removeSort,
                isFetched,
              }}
            />
          </div>


          <Table {...{list, columnsMap}} />
      </div>
    </div>
  );
}

export default App;
