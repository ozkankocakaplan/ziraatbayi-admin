import { Button, Flex, Result, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Result
        status="404"
        title="404"
        subTitle="Üzgünüz, aradığınız sayfa mevcut değil."
        extra={
          <Button onClick={() => navigate("/admin")} type="primary">
            Ana sayfa
          </Button>
        }
      />
    </Flex>
  );
}
