import React, { FC } from 'react';
import styles from './Table.module.scss';

export const Table = ({list=[], columnsMap={}}: any)=> {

  return(
    <table className={styles.table}>
      <thead>
        <tr>
          { Object.entries(columnsMap).map(([column, id]: any) => (
              <th style={{width: '120px'}} key={id}>{column}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {list.map((row: any, rowIndex: number) => {
          return(
          <tr key={rowIndex}>
            { Object.entries(row).map((
                [columnName, {value, type}]: any,
                index: number,
              ) => {

              let content;

              // TODO use enums

              // TODO support more annotations
              if (
                type === 'title' ||
                type === 'rich_text'
              ) {
                content = value.map((item: any, index: number) => {
                  return(<span key={index} style={{color: item?.color}}>{item?.plain_text}</span>)
                })
              }

              if (
                type === 'number'
              ) {
                content = value
              }

              if (type === 'multi_select') {
                content = value.map((item: any, index: number) => {
                  if (index === value.length - 1) {
                    return(<span key={index} style={{color: item?.color}}>{item?.name}</span>)
                  }
                  return(
                    <>
                      <span key={index} style={{color: item?.color}}>{item?.name}</span>
                      <span>, </span>
                    </>
                  )
                })
              }

              if (type === 'select') {
                content = <span style={{color: value?.color}}>{value?.name}</span>
              }

              if (type === 'checkbox') {
                content = <input type="checkbox" checked={value} readOnly/>
              }

              if (type === 'date') {
                content = <span>{value?.start}{value?.end && ` > ${value?.end}`}</span>
              }

              return(
                <td key={index}>{content}</td>
              )})
            }
          </tr>
          )
        })}
      </tbody>
    </table>
  )
}
