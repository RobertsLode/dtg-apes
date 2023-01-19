import React from 'react';
import LargeTableSlot from "./listItem/list_item.jsx";
import '../../styles/main.scss';

export function Table({ tHead, data, editClick, deleteClick }) {
  return (
    <div key={`0u89adsf`}>
      <table key={`h09ysd165`} className="wh-table dtg-table tbody disabled">
        <thead key={`0jawf`}>
          <tr key={`h08efrg-i`} className='tr--bold'>
            <th key={`9haev rf0-b`} className="toggle">
              <span key={`dfvas0hi8`} className="visually--hidden">Toggle</span>
            </th>
            {tHead?.map((each, i) => (
              <th key={`th ${i} 2r`}>
                <div key={`div ${i} 3r`} className='td--center'>{each}</div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <thead key={`a0vsdyh`} className="table--break" />
        {data?.length &&
          data.map((each, i) => (
            <LargeTableSlot
              key={i}
              details={each}
              editClick={(id) => {
                editClick(id);
              }}
              deleteClick={(id) => {
                deleteClick(id);
              }}
              indexKey={i}
            />
          ))}
      </table>
    </div>
  );
}