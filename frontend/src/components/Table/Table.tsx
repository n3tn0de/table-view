import React, { FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// @ts-ignore
import ColumnResizer from "react-table-column-resizer";

import styles from './Table.module.scss';

const Th = ({id, text}: Record<string, string>) =>
  <>
    <th className={styles.th} style={{width: '120px'}} key={id}>{text}</th>
    <ColumnResizer className="columnResizer" minWidth={0} />
  </>

export const Table = ({list=[], columnsMap={}}: any)=> {

  return(
    <table className={styles.table}>
      <thead>
        <tr>
          { Object.entries(columnsMap).map(([text, {id}]: any) => <Th {...{id, text}} />)
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
              // TODO extract to separate componet(s)
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
                <>
                  <td className={styles.td}key={index}>{content}</td>
                  <td className={styles.stub}></td>
                  {/* <ColumnResizer className="columnResizer" minWidth={0} /> */}
                </>
              )})
            }
          </tr>
          )
        })}
      </tbody>
    </table>
  )
}
