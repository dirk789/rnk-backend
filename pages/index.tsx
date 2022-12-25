import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";
import Image from "next/image";
// import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { Spin } from "antd";

const HomePage = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    router.push("/start");
  }

  if (!user) {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
};

export default HomePage;
