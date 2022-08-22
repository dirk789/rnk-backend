import { ReactNode } from "react";
import { useAuth } from "../Auth/auth";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Spin } from "antd";
import { Loading } from "../loading";

import { Layout as AntLayout, Menu } from "antd";

const Layout = ({
  children,
  currentPage,
}: {
  children: ReactNode;
  currentPage: number;
}) => {
  const { user, loading, signOut } = useAuth();

  const router = useRouter();

  console.log(user);

  //   if (typeof window !== "undefined" && !user) {
  //     window.location.href = "/";
  //   }

  if (loading) {
    return <Loading />;
  }

  const { Header, Content, Footer, Sider } = AntLayout;

  const date = new Date();

  return (
    <div>
      {user ? (
        <AntLayout hasSider>
          <Sider
            theme="light"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div className="logo" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[String(currentPage + 1)]}
            >
              <Menu.Item key="1">
                <Link href="/start">Start</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/programmering-nk">Programmering RNK</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/programmering-los">Programmering LOS</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link href="/notificatie">Push bericht</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <AntLayout
            className=""
            style={{ marginLeft: 200, backgroundColor: "white" }}
          >
            {/* <Header
              className=""
              style={{ padding: 0, backgroundColor: "white" }}
            /> */}
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                // className="site-layout-background"
                style={{ padding: 24 }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              {date.getFullYear()} Techvandaag
            </Footer>
          </AntLayout>
        </AntLayout>
      ) : (
        <Link href="/">
          <a>Please login to view this page</a>
        </Link>
      )}
    </div>
  );
};

export { Layout };