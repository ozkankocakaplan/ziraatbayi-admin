import { Typography } from "antd";
import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

const { Title } = Typography;
export default function ResizableBox({
  children,
  height = 350,
  resizable = false,
  style = {},
  title = "",
  className = "",
}) {
  return (
    <div>
      <div
        style={{
          display: "inline-block",
          width: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          background: "white",
          padding: "1rem",
          width: "100%",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={"100%"} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <>
            {title && (
              <Title
                style={{ marginTop: 10, fontWeight: "700", fontSize: 30 }}
                level={2}
              >
                {title}
              </Title>
            )}
            <div
              style={{
                width: `100%`,
                height: `${height}px`,
              }}
              className={className}
            >
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
