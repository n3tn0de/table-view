import React, { FC } from 'react';
import './Table.module.scss';

export const Table = ({list=[], columnsMap={}}: any)=> {

  return(
    <table>
      <thead>
        <tr>
          { Object.entries(columnsMap).map(([column, {id}]: any) => (
              <th key={id}>{column}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {list.map((row: any, rowIndex: number) => {
          return(
          <tr key={rowIndex}>
            { Object.entries(row).map(([columnName, {title, number}]: any, index: number) => {
              const text = title?.[0].plain_text
              return(
                <td key={index}>{text || number}</td>
              )})
            }
          </tr>
          )
        })}
      </tbody>
    </table>
  )
}
