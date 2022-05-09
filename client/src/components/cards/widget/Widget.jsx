import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./widget.css";

function Widget({ children, title, onNavigate }) {
  return (
    <Card onClick={() => onNavigate(`/${title}`)}>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        {children}
      </CardBody>
    </Card>
  );
}

Widget.propTypes = {};

const WidgetTopBar = ({ onCollapse, title }) => {
  return (
    <div className="widgetTopBar">
      <div onClick={onCollapse} className="widgetDash" />
      <div className="widgetTitle">{title}</div>
    </div>
  );
};

export default Widget;
