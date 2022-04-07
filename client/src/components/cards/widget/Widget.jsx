import React, { useState } from "react";
import { Collapse } from "reactstrap";
import "./widget.css";

function Widget({ children, title, onNavigate }) {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (e) => {
    e.stopPropagation();
    setCollapsed(!collapsed);
  };
  return (
    <div onClick={() => onNavigate(title)} className="widgetWrapper">
      <WidgetTopBar onCollapse={onCollapse} title={title} />
      <Collapse isOpen={collapsed}>
        <div className="widgetContent">{children}</div>
      </Collapse>
    </div>
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
