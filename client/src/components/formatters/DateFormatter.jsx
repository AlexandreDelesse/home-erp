import React from "react";

function DateFormatter({ ISODate }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(ISODate).toLocaleDateString("fr", options);
  return <>{date}</>;
}

DateFormatter.propTypes = {};

export default DateFormatter;
