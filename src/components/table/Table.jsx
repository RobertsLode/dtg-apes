import LargeTableSlot from "./listItem/list_item.jsx";
import "./table_style.scss";

 export function Table({ firstTitle, secondTitle, thirdTitle, fouthTitle, data }) {
  return (
    <div>
      <table className="wh-table table tbody">
        <thead>
          <tr>
            <th className="toggle">
              <span className="visually--hidden">Toggle</span>
            </th>
            <th>
              <div>{firstTitle}</div>
            </th>
            <th>
              <div>{secondTitle}</div>
            </th>
            <th>
              <div>{thirdTitle}</div>
            </th>
            <th>
              <div>{fouthTitle}</div>
            </th>
          </tr>
        </thead>
        <div className="table--break" />
        {data?.length &&
          data.map((each) => <LargeTableSlot details={each} />)}
      </table>
    </div>
  );
}