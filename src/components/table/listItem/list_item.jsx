import React, { useState } from "react";

function LargeTableSlot({ details }) {
  const [visiblee, setVisiblee] = useState(false);
  console.log(details);

  return (
    <>
      <tbody className="wh-table">
        <tr
          onClick={() => {
            setVisiblee(!visiblee);
          }}
          className={`active tr--bold ${visiblee ? "expanded" : "not--expanded"
            }`}
        >
          <td>
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
          <td>
            <div className="tr--bold ">{details?.tableSlotFirstTitle}</div>
          </td>
          <td>
            <div className="td--center tr--bold">
              {details?.tableSlotSecondTitle}
            </div>
          </td>
          <td>
            <div className="td--center tr--bold">{details?.tableSlotThirdTitle}</div>
          </td>
          <td>
            <div className="td--center tr--bold">{details?.tableSlotFouthTitle}</div>
          </td>
        </tr>

        {details?.details.map((el) => (
          <tr className={visiblee ? "active expanded" : "visually--hidden"}>
            <td></td>
            <td>
              <div className="td--center">{el?.firstP}</div>
            </td>
            <td>
              <div className="td--center">{el?.secondP}</div>
            </td>
            <td>
              <div className="td--center">{el?.thirdP}</div>
            </td>
            <td>
              <div className="td--center">{el?.fourthP}</div>
            </td>
          </tr>
        ))}
        <div className="table--break" />
      </tbody>
    </>
  );
}

export default LargeTableSlot;
