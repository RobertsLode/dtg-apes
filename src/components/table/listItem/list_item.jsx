import React, { useState } from "react";
import Pencil from '../../../assets/p.png';
import Trash from '../../../assets/trash.png';
function LargeTableSlot({ details, editClick, deleteClick, indexKey }) {
  const [visiblee, setVisiblee] = useState(false);

  return (
    <>
      <tbody key={`tbody ${indexKey}`} className="wh-table">
        <tr
          key={`tr ${indexKey}`}
          className={`active tr--bold ${visiblee ? "expanded" : "not--expanded"
            }`}
        >
          <td key={`td ${indexKey}`}
            onClick={() => {
              setVisiblee(!visiblee);
            }}>
            <span key={`span ${indexKey}`} className="svg">
              <svg key={`svg ${indexKey}`}
                style={visiblee ? { rotate: "90deg" } : {}}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path key={`path ${indexKey}`} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </span>
          </td>
          {details?.tableSlotTitles?.names?.map(({ name }, i) => (
            <td key={`td ${indexKey} ${i}`} onClick={() => {
              setVisiblee(!visiblee);
            }}>
              <div key={`div ${indexKey} ${i}`} className="td--center tr--bold">{name}</div>
            </td>
          ))}
          <td key={`td ${indexKey}123`} style={{ width: '100px' }}>
            <div key={`div ${indexKey} 1sad`} className="td--center button--container" style={{ gap: '20px' }}>
              <button key={`button ${indexKey} 11qw32rd`} onClick={() => {
                editClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img key={`img ${indexKey} 4tef23`} width={20} height={20} src={Pencil} alt="pencil" />
              </button>
              <button key={`button ${indexKey} 35ygr`} onClick={() => {
                deleteClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img key={`img ${indexKey} 9sgvhoy`} width={20} height={20} src={Trash} alt="pencil" />
              </button>
            </div>
          </td>
        </tr>

        {details?.details?.map(({ id, names }, i) => (
          <tr key={`tr ${indexKey} ${i}9au0-f`} className={visiblee ? "active expanded" : "visually--hidden"}>
            <td key={`empty td`}></td>
            {names?.map(({ name }, o) => (
              <td key={`td ${indexKey} ${i} ${o}`}>
                <div key={`div ${indexKey} ${i} ${o}`} className="td--center">{name}</div>
              </td>
            ))}
            <td key={`td ${indexKey} a4sd68f`} style={{ width: '100px' }}>
              <div key={`div ${indexKey} 0u9sdf`} className="td--center button--container" style={{ gap: '20px' }}>
                <button key={`button ${indexKey} u09avj-dsf`} onClick={() => {
                  editClick(id)
                }} className="table--button">
                  <img key={`img ${indexKey} 0ayghf`} width={20} height={20} src={Pencil} alt="pencil" />
                </button>
                <button key={`button ${indexKey} 0h9s7adf`} onClick={() => {
                  deleteClick(id)
                }} className="table--button">
                  <img key={`img ${indexKey} syeiopu7890[rg]`} width={20} height={20} src={Trash} alt="pencil" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        <tr key={'table--break'} className="table--break" />
      </tbody>
    </>
  );
}

export default LargeTableSlot;
