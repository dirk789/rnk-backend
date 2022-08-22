import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/auth";
import { Layout } from "../../components/layout";
import { NotificationMockup } from "../../components/notification";

const Notificatie = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const [token, setToken] = useState("");

  const auth = useAuth();

  useEffect(() => {
    auth.user?.getIdToken().then((token) => {
      setToken(token);
    });
  }, [auth]);

  const { Title, Text } = Typography;

  async function onFormSubmit() {
    if (link && !link.startsWith("https://www.regionoordkop.nl/")) {
      message.error("Link moet beginnen met https://www.regionoordkop.nl/");
      return;
    }

    if (!title || !content) {
      message.error("Vul alle velden in");
      return;
    }

    if (!token) {
      message.error("Ongeautoriseerd");
      return;
    }

    const data = JSON.stringify({
      body: content,
      title: title,
      link: link || null,
    });

    await fetch(
      "https://us-central1-regio-noordkop-react-native.cloudfunctions.net/push/send-push",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    )
      .then((resp) => {
        if (resp.status === 200) {
          message.success("Notificatie verzonden");
        } else {
          message.error("Er is iets fout gegaan");
          setTitle("");
          setContent("");
          setLink("");
        }
      })
      .catch((e) => {
        message.error(
          "Er is iets misgegaan met het versturen van de notificatie. Probeer het later opnieuw"
        );
        console.error(e);
      });
  }

  const [form] = Form.useForm();

  return (
    <Layout currentPage={3}>
      <Title level={2}>Verstuur een notificatie</Title>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Form layout="vertical" onFinish={onFormSubmit} form={form}>
            <Form.Item label="Titel*" rules={[{ required: true }]}>
              <Input onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Bericht*" rules={[{ required: true }]}>
              <Input onChange={(e) => setContent(e.target.value)} multiple />
            </Form.Item>
            <Form.Item
              label="Link"
              rules={[{ required: true }]}
              extra="Plak een link van de Regio Noordkop site als je wilt dat het melding linkt naar een artikel."
            >
              <Input
                onChange={(e) => setLink(e.target.value)}
                multiple
                placeholder="https://www.regionoordkop.nl/20/08/2022/tent-op-de-haven-en-bloementent-na-twee-jaar-weer-terug-in-den-oever/"
              />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Verstuur
            </Button>
          </Form>
        </Col>
        <Col span={8}>
          <NotificationMockup
            title={title ? title : "Notificatie titel"}
            text={content ? content : "Beschrijving van de notificatie"}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Notificatie;
