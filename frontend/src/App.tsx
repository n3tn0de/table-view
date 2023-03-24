import React from 'react';
import styles from './App.module.scss';

import { useStore } from './store'

import { Table } from './components/Table/Table'
import { Sort } from './components/Sort/Sort'
import { Filter } from './components/Filter/Filter'

function App() {
  const { list, columnsMap} = useStore((state: any) => state.data)
  const error = useStore((state: any) => state.error)
  const isFetching = useStore((state: any) => state.isFetching)
  const isFetched = useStore((state: any) => state.isFetched)
  const fetchDb = useStore((state: any) => state.fetchDb)

  const sorts = useStore((state: any) => state.sorts)
  const addSort = useStore((state: any) => state.addSort)
  const removeSort = useStore((state: any) => state.removeSort)

  const filter = useStore((state: any) => state.filter)
  const addFilter = useStore((state: any) => state.addFilter)
  const removeFilter = useStore((state: any) => state.removeFilter)

  const fetch = () => fetchDb();

  if (!isFetching && !isFetched) {
    fetchDb()
  }

  return (
    <div className={styles.app}>
      <div className={styles.table}>
          <div className={styles.db}>
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
            className={styles.controls}
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
            <Filter
              {...{
                columnsMap,
                filter,
                addFilter,
                removeFilter,
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
