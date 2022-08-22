import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";
import Image from "next/image";
// import Link from "next/dist/client/link";
import { useRouter } from "next/router";

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Regio Noordkop App Dashboard</title>
        <meta name="description" content="Regio Noordkop App Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/img/logo.png"
          width={400}
          height={150}
          objectFit="contain"
          alt="Regio Noordkop Logo"
        />
        <h1 className={styles.title}>Regio Noordkop App Dashboard</h1>
        <p>By Techvandaag</p>

        <div className={styles.grid}>
          <Link href="/login">
            <a>
              <h2>Login &rarr;</h2>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
