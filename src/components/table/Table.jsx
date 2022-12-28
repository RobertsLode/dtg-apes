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
              <th >
                <div>{each}</div>
              </th>
            ))}
            <th className='toggle'>
              <span className="visually--hidden">Toggle</span>
            </th>
          </tr>
        </thead>
        <div className="table--break" />
        {data?.length &&
          data.map((each) => (
            <LargeTableSlot
              details={each}
              editClick={(id) => {
                editClick(id);
              }}
              deleteClick={(id) => {
                deleteClick(id);
              }}
            />
          ))}
      </table>
    </div>
  );
}