import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import { useAuth } from "../components/Auth/auth";
import { setErrorMessage } from "../components/Auth/setErrorMessage";
import { Form, Input, Button, Card, Typography, Modal, Drawer, notification } from "antd";
import Text from "antd/lib/typography/Text";

const Login = () => {
  const router = useRouter();
  const auth = useAuth();

  const { sendPasswordResetEmail } = useAuth()
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Title } = Typography;

  function signIn(email, password) {
    auth
      .signIn(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        alert(title + ": " + description);
      });
  };

  function submitResetPassword(e) {
    console.log('reset')
    e.preventDefault()

    sendPasswordResetEmail(resetEmail)
      .then(() => {
        notification.success({
          message: "Email verstuurd",
          description: "Er is een email verstuurd naar " + email + " met instructies om je wachtwoord te resetten."
        })
        setOpen(false)
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // alert(title + ": " + description);
        notification.error({
          message: title,
          description: description
        })
      });
  }

  if (auth.loading) {
    return <p>Loading...</p>;
  }

  if (auth.user) {
    router.push("/");
    return <div>Loading...</div>;
  }

  const onClose = () => {
    setOpen(false);
  };

  if (!auth.user) {
    return (
      <>
        <div className={styles.container}>
          <Head>
            <title>Regio Noordkop App Dashboard</title>

            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>

            <section className={styles.login} />
            <div className={styles.loginContent}>
              <img src="/img/logo.png" alt="Regio Noordkop Logo" style={{ maxWidth: 250, marginBottom: 32 }} />
              <Title level={3} style={{ marginBottom: 24 }}>Regio Noordkop App Dashboard</Title>

              <Card style={{ maxWidth: 600 }}>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16, }}
                  initialValues={{ remember: true }}
                  onFinish={() => signIn(email, password)}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                  layout="vertical"
                  style={{ minWidth: 320 }}
                >
                  <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Voer een geldige gebruikersnaam in",
                      },
                    ]}
                    onChange={(event) => setEmail(event.target.value)}
                    wrapperCol={{ span: 32 }}
                    labelCol={{ span: 32 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Wachtwoord"
                    name="password"
                    rules={[
                      { required: true, message: "Voer een geldig wachtwoord in" },
                    ]}
                    onChange={(event) => setPassword(event.target.value)}
                    wrapperCol={{ span: 32 }}
                    labelCol={{ span: 32 }}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
              <Text style={{ marginTop: 24 }} type="secondary">© copyright {new Date().getFullYear()} - Techvandaag | <a onClick={() => setOpen(true)}>Wachtwoord vergeten</a></Text>
            </div>
          </main>
        </div>
        <Drawer
          title="Reset wachtwoord"
          placement="right"
          onClose={onClose}
          getContainer={false}
          visible={open}
        >
          <Text type="secondary">Voer je e-mail in. Wij sturen een e-mail om je wachtwoord te resetten als je een account hebt.</Text>
          <Form layout="vertical" style={{ marginTop: 16 }}
            onSubmit={(e) => e.preventDefault()}
            onFinish={submitResetPassword}
            name="pswd-reset"
          >
            <Form.Item
              name="reset-email"
              label="Email"
              rules={[{ required: true, message: 'Vul je email in...' }]}
              onChange={(event) => setResetEmail(event.target.value)}
            >
              <Input placeholder="Vul je email adres in" value={email} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{ width: '100%' }} onClick={submitResetPassword}>Reset wachtwoord</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
};

export default Login;
