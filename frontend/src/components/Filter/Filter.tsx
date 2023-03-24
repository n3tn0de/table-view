import React, { FC, useState } from 'react';

import styles from './Filter.module.scss';

export const Filter = ({
  columnsMap={},
  isFetched,
  filter,
  addFilter,
  removeFilter,
}: any)=> {

  const uniplemented = ['multi_select', 'checkbox']
  const textInput = ['title', 'rich_text']

  const array = Object.keys(columnsMap)
    .filter((column): any => textInput.includes((columnsMap[column] || {}).type) )
  const filters = Object.keys(filter)

  const intialProperty = array[0]

  const [currentProperty, setCurrentProperty] = useState(intialProperty)
  const [currentInput, setCurrentInput] = useState("")

  if (!currentProperty && intialProperty) {
    setCurrentProperty(intialProperty)
  }

  const propertyOnChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setCurrentProperty(event.currentTarget.value)
  }

  const inputOnChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setCurrentInput(event.currentTarget.value)
  }

  const onAddClick = () => {
    addFilter(currentProperty, columnsMap[currentProperty].type, currentInput)
  }

  const onRemoveClick = (property: string) => {
    removeFilter(property)
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.filter}>
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
        { textInput.includes((columnsMap[currentProperty] || {}).type) &&
          <input
            value={currentInput}
            onChange={inputOnChange}
          />
        }
        <button
          className={styles.button}
          onClick={onAddClick}
          >
          Add filter
        </button>
      </div>
      { filters.length > 0 &&
        <div className={styles.filter}>
          <div>{filter.property}</div>
          <div>{filter[(columnsMap[filter.property] || {}).type]?.contains}</div>
          <button
            className={styles.button}
            onClick={() => onRemoveClick(filter.property)}
            >
            Remove filter
          </button>
        </div>
      }
    </div>
  )
}
