import React from 'react';
import LargeTableSlot from "./listItem/list_item.jsx";
import '../../styles/main.scss';

export function Table({ tHead, data, editClick, deleteClick }) {
  return (
    <div>
      <table className="wh-table dtg-table tbody disabled">
        <thead>
          <tr className='tr--bold'>
            <th className="toggle">
              <span className="visually--hidden">Toggle</span>
            </th>
            {tHead?.map((each) => (
              <th>
                <div className='td--center'>{each}</div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <div className="table--break" />
        {data?.length &&
          data.map((each, i) => (
            <LargeTableSlot
              details={each}
              editClick={(id) => {
                editClick(id);
              }}
              deleteClick={(id) => {
                deleteClick(id);
              }}
              key={i}
            />
          ))}
      </table>
    </div>
  );
}