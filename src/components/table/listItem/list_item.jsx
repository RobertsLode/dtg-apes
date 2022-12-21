import React, { useState } from "react";
import Pencil from '../../../assets/p.png';
import Trash from '../../../assets/trash.png';
function LargeTableSlot({ details, editClick, deleteClick }) {
  const [visiblee, setVisiblee] = useState(false);

  return (
    <>
      <tbody className="wh-table">
        <tr

          className={`active tr--bold ${visiblee ? "expanded" : "not--expanded"
            }`}
        >
          <td
            onClick={() => {
              setVisiblee(!visiblee);
            }}>
            <span className="svg">
              <svg
                style={visiblee ? { rotate: "90deg" } : {}}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </span>
          </td>
          {details?.tableSlotTitles?.names?.map(({ name }) => (
            <td onClick={() => {
              setVisiblee(!visiblee);
            }}>
              <div className="td--center tr--bold">{name}</div>
            </td>
          ))}
          <td style={{ width: '100px' }}>
            <div className="td--center button--container" style={{ gap: '20px' }}>
              <button onClick={() => {
                editClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img width={20} height={20} src={Pencil} alt="pencil" />
              </button>
              <button onClick={() => {
                deleteClick(details?.tableSlotTitles?.id)
              }} className="table--button">
                <img width={20} height={20} src={Trash} alt="pencil" />
              </button>
            </div>
          </td>
        </tr>

        {details?.details?.map(({ id, names }) => (
          <tr className={visiblee ? "active expanded" : "visually--hidden"}>
            <td></td>
            {names?.map(({ name }) => (
              <td>
                <div className="td--center">{name}</div>
              </td>
            ))}
            <td style={{ width: '100px' }}>
              <div className="td--center button--container" style={{ gap: '20px' }}>
                <button onClick={() => {
                  editClick(id)
                }} className="table--button">
                  <img width={20} height={20} src={Pencil} alt="pencil" />
                </button>
                <button onClick={() => {
                  deleteClick(id)
                }} className="table--button">
                  <img width={20} height={20} src={Trash} alt="pencil" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        <div className="table--break" />
      </tbody>
    </>
  );
}

export default LargeTableSlot;
