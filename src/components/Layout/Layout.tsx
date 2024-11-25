import React, { useEffect, useState } from "react";
import {
  DashboardOutlined,
  InboxOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  SettingFilled,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { isAuth, isLoading, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const router = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!isAuth && !isLoading) {
    return <Navigate to="/" />;
  }
  const setDefaultSelectedKeys = () => {
    if (location.pathname === "/admin") {
      return "/admin";
    }
    if (location.pathname === "/admin/categories/add") {
      return "/admin/categories";
    }
    if (location.pathname.includes("/admin/categories/edit")) {
      return "/admin/categories";
    }
    if (location.pathname === "/admin/products/add") {
      return "/admin/products";
    }
    if (location.pathname.includes("/admin/products/edit")) {
      return "/admin/products";
    }
    return location.pathname;
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: colorBgContainer,
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[setDefaultSelectedKeys()]}
          onClick={(e) => {
            if (e.key === "logout") {
              logout();
            } else {
              router(`${e.key}`);
            }
          }}
          items={[
            {
              key: "/admin",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/admin/dealers",
              icon: <UserOutlined />,
              label: "Bayiler",
            },
            {
              key: "/admin/categories",
              icon: <OrderedListOutlined />,
              label: "Kategoriler",
            },
            {
              key: "/admin/products",
              icon: <InboxOutlined />,
              label: "Ürünler",
            },
            {
              key: "/admin/settings",
              icon: <SettingFilled />,
              label: "Ayarlar",
            },
            {
              key: "logout",
              icon: <LoginOutlined />,
              label: "Çıkış Yap",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
