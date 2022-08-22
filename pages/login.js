import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";
import { setErrorMessage } from "../components/Auth/setErrorMessage";
import { Form, Input, Checkbox, Button, Card, Typography } from "antd";

const Login = () => {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Title } = Typography;

  const signIn = (email, password) => {
    // event.preventDefault();

    auth
      .signIn(email, password)
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  // loading state
  if (auth.loading) {
    return <p>Loading...</p>;
  }

  // if a user is logged in, redirect to a page of your liking
  if (auth.user) {
    router.push("/");
    return null;
  }

  // if there is no signed in user
  if (!auth.user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>NextJS Firebase Auth Starter Kit</title>
          <meta
            name="description"
            content="A starter kit created by @official-carledwardfp"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Title level={2}>Login</Title>

          <Card style={{ maxWidth: 500 }}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={() => signIn(email, password)}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                onChange={(event) => setEmail(event.target.value)}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                onChange={(event) => setPassword(event.target.value)}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Link href="/">&larr; Go back</Link>
        </main>
      </div>
    );
  }
};

export default Login;
