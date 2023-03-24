import React, { FC, useState } from 'react';

import styles from './Sort.module.scss';

export const Sort = ({columnsMap={}, isFetched, sorts, addSort, removeSort}: any)=> {

  const array = Object.keys(columnsMap)
  const intialProperty = array[0]

  const [currentProperty, setCurrentProperty] = useState(intialProperty)

  if (!currentProperty && intialProperty) {
    setCurrentProperty(intialProperty)
  }

  const [currentOrder, setCurrentOrder] = useState('ascending')

  const propertyOnChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setCurrentProperty(event.currentTarget.value)
  }

  const orderOnChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setCurrentOrder(event.currentTarget.value)
  }

  const onAddClick = () => {
    addSort(currentProperty, currentOrder)
  }

  const onRemoveClick = (property: string) => {
    removeSort(property)
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <select
          value={currentProperty}
          onChange={propertyOnChange}
        >
          { array.map((key: string) => {
            return(
              <option value={key}>{key}</option>
              )
            })
          }
        </select>
        <select
          value={currentOrder}
          onChange={orderOnChange}
        >
          { ['Ascending', 'Descending'].map((key: string) => {
            return(
              <option value={key.toLowerCase()}>{key}</option>
              )
            })
          }
        </select>
        <button
          className={styles.button}
          onClick={onAddClick}
          >
          Add sort
        </button>
      </div>
      { sorts.map(({property, direction}: any, index: number) => {
          return(
            <div className={styles.sort} key={index}>
              <div>{property}</div>
              <div>{direction}</div>
              <button
                className={styles.button}
                onClick={() => onRemoveClick(property)}
                >
                Remove sort
              </button>
            </div>
          )
        })
      }
    </div>
  )
}
