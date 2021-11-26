import React, {Component} from "react";
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {
  HeatMapOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {getUsername} from "../Utils";
import "./WkosLayout.css"

class WkosLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultSelectedKeys: props.defaultSelectedKeys,
      content: props.content,
      collapsed: true,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    let loginNavContent;
    if (getUsername()) {
      loginNavContent = (
        <>
          <Menu.Item key="4" icon={<UserOutlined/>}>
            <a style={{color: "white"}} href={"/mypage"}>마이페이지</a>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined/>}>
            <a style={{color: "white"}} href={"/logout"}>로그아웃</a>
          </Menu.Item>
        </>
      );
    } else {
      loginNavContent = (
        <Menu.Item key="4" icon={<LoginOutlined/>}>
          <a style={{color: "white"}} href={"/login"}>로그인</a>
        </Menu.Item>
      );
    }

    return (
      <div>
        <Layout style={{minHeight: "100vh", minWidth: "750px"}}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div style={{backgroundColor: "#001529"}} className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.defaultSelectedKeys]}>
              <Menu.Item key="1" icon={<HomeOutlined/>}>
                <a style={{color: "white"}} href={"/"}>홈</a>
              </Menu.Item>
              <Menu.Item key="2" icon={<UnorderedListOutlined/>}>
                <a style={{color: "white"}} href={"/list"}>시설 리스트</a>
              </Menu.Item>
              <Menu.Item key="3" icon={<HeatMapOutlined/>}>
                <a style={{color: "white"}} href={"/map"}>시설 맵</a>
              </Menu.Item>
              {loginNavContent}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              {this.props.content}
            </Content>
            <Footer style={{textAlign: 'center'}}>어떤 스포츠? © 2021 Created by First Busan</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default WkosLayout;