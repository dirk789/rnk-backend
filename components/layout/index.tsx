import { ReactNode } from "react";
import { useAuth } from "../Auth/auth";
// import { useRouter } from "next/dist/client/router";
import Link from "next/link";
// import { Spin } from "antd";
import { Loading } from "../loading";
import Image from "next/image";

import { Layout as AntLayout, Menu } from "antd";
import router from "next/router";

export enum Pages {
  Start = 0,
  Programmering = 1,
  Notificatie = 2,
  OverDeApp = 3,
  Uitloggen = 4,
}

const Layout = ({
  children,
  currentPage,
}: {
  children: ReactNode;
  currentPage: number;
}) => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const { Content, Footer, Sider } = AntLayout;

  const date = new Date();

  if (!user) {
    router.push("/login");
  }

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
            <div
              className="logo"
              style={{ padding: "32px 21px", borderRight: "1px solid #f0f0f0" }}
            >
              <Image
                src="/img/logo.png"
                width={200}
                height={75}
                objectFit="contain"
                alt="Regio Noordkop Logo"
              />
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[String(currentPage)]}
              style={{
                minHeight: "calc(100% - 128px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Menu.ItemGroup title="Start">
                <Menu.Item key={Pages.Start}>
                  <Link href="/start">Start</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Radio">
                <Menu.Item key={Pages.Programmering}>
                  <Link href="/programmering-los">Programmering</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Statisch">
                <Menu.Item key={Pages.Notificatie}>
                  <Link href="/notificatie">Push bericht</Link>
                </Menu.Item>
                <Menu.Item key={Pages.OverDeApp}>
                  <Link href="/over-de-app">Over de app</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Item
                key={Pages.Uitloggen}
                onClick={signOut}
                style={{ marginTop: "auto" }}
              >
                <Link href="/login">Uitloggen</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <AntLayout
            className=""
            style={{
              marginLeft: 200,
              backgroundColor: "white",
              minHeight: "100vh",
            }}
          >
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div style={{ padding: 24 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              © {date.getFullYear()} Techvandaag
            </Footer>
          </AntLayout>
        </AntLayout>
      ) : (
        <Link href="/">
          <a>Log in om deze pagina te kunnen bekijken</a>
        </Link>
      )}
    </div>
  );
};

export { Layout };
