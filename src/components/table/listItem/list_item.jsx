import React, { useState } from "react";
import Pencil from '../../../assets/p.png';
import Trash from '../../../assets/trash.png';
function LargeTableSlot({ details, editClick, deleteClick, key }) {
  const [visiblee, setVisiblee] = useState(false);

  return (
    <>
      <tbody key={`tbody ${key}`} className="wh-table">
        <tr
          key={`tr ${key}`}
          className={`active tr--bold ${visiblee ? "expanded" : "not--expanded"
            }`}
        >
          <td key={`td ${key}`}
            onClick={() => {
              setVisiblee(!visiblee);
            }}>
            <span key={`span ${key}`} className="svg">
              <svg key={`svg ${key}`}
                style={visiblee ? { rotate: "90deg" } : {}}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path key={`path ${key}`} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </span>
          </td>
          {details?.tableSlotTitles?.names?.map(({ name }, i) => (
            <td key={`td ${key} ${i}`} onClick={() => {
              setVisiblee(!visiblee);
            }}>
              <div key={`div ${key} ${i}`} className="td--center tr--bold">{name}</div>
            </td>
          ))}
          <td key={`td ${key}123`} style={{ width: '100px' }}>
            <div key={`div ${key} 1sad`} className="td--center button--container" style={{ gap: '20px' }}>
              <button key={`button ${key} 11qw32rd`} onClick={() => {
                editClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img key={`img ${key} 4tef23`} width={20} height={20} src={Pencil} alt="pencil" />
              </button>
              <button key={`button ${key} 35ygr`} onClick={() => {
                deleteClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img key={`img ${key} 9sgvhoy`} width={20} height={20} src={Trash} alt="pencil" />
              </button>
            </div>
          </td>
        </tr>

        {details?.details?.map(({ id, names }, i) => (
          <tr key={`tr ${key} ${i}9au0-f`} className={visiblee ? "active expanded" : "visually--hidden"}>
            <td key={`empty td`}></td>
            {names?.map(({ name }, o) => (
              <td key={`td ${key} ${i} ${o}`}>
                <div key={`div ${key} ${i} ${o}`} className="td--center">{name}</div>
              </td>
            ))}
            <td key={`td ${key} a4sd68f`} style={{ width: '100px' }}>
              <div key={`div ${key} 0u9sdf`} className="td--center button--container" style={{ gap: '20px' }}>
                <button key={`button ${key} u09avj-dsf`} onClick={() => {
                  editClick(id)
                }} className="table--button">
                  <img key={`img ${key} 0ayghf`} width={20} height={20} src={Pencil} alt="pencil" />
                </button>
                <button key={`button ${key} 0h9s7adf`} onClick={() => {
                  deleteClick(id)
                }} className="table--button">
                  <img key={`img ${key} syeiopu7890[rg]`} width={20} height={20} src={Trash} alt="pencil" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        <div key={'table--break'} className="table--break" />
      </tbody>
    </>
  );
}

export default LargeTableSlot;
