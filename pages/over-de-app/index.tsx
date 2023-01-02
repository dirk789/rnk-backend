import { Button, Col, Form, notification, Row, Spin } from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { Layout, Pages } from "../../components/layout";
import { TextEditor } from "../../components/textEditor";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const OverDeApp = () => {
  const { Title } = Typography;

  const [v, setV] = useState("");
  const [firebaseHtml, setFirebaseHtml] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const db = getFirestore();
  const docRef = doc(db, "Admin", "overons");

  useEffect(() => {
    const getDB = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFirebaseHtml(docSnap.data().html);
      } else {
        notification["error"]({
          message: "Er is iets misgegaan",
        });
      }
    };
    getDB();
  }, []);

  async function onFinish(values: any) {
    setBtnLoading(true);
    try {
      await setDoc(docRef, { html: firebaseHtml });
      notification["success"]({
        message: "Saved",
      });
    } catch (e) {
      notification["error"]({
        message: "Opslaan mislukt",
      });
      console.error(e);
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <Layout currentPage={Pages.OverDeApp}>
      <Title level={2}>Over de app</Title>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          {firebaseHtml ? (
            <>
              <TextEditor
                onChange={(e) => setFirebaseHtml(e)}
                value={firebaseHtml}
                placeholder="Schrijf je over tekst hier"
              />
              <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={onFinish}
                loading={btnLoading}
              >
                Opslaan
              </Button>
            </>
          ) : (
            <div>
              <Spin />
            </div>
          )}
        </Col>
        <Col span={8}></Col>
      </Row>
    </Layout>
  );
};

export default OverDeApp;
