import React from "react";
import PropTypes from "prop-types";

const StaticPage = (props) => {
  const { json } = props;

  const RecursiveKeys = (item) => {
    if (typeof item[1] === "string") {
      return <p className={item[0]}>{item[1]}</p>;
    } else if (item[1] instanceof Image) {
      return <img src={item[1]} alt={`${item[0]} Image`} className={item[0]} />;
    } else if (item[1] instanceof Array) {
      return (
        <div className={item[0]}>
          {item[1].map((item) => {
            const entries = Object.entries(item);
            return RecursiveKeys(entries);
          })}
        </div>
      );
    } else if (typeof item[1] === "object") {
      const entries = Object.entries(item[1]);
      return <div className={item[0]}>{RecursiveKeys(entries)}</div>;
    }
  };

  return (
    <div>
      {json.map((item, i) => {
        const entries = Object.entries(item);
        return (
          <div className={`wrapper-${i}`}>{entries.map(RecursiveKeys)}</div>
        );
      })}
    </div>
  );
};

StaticPage.propTypes = {
  json: PropTypes.array.isRequired,
};

export default StaticPage;
