import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/auth";
import { Layout } from "../../components/layout";
import { ProgrammeringInput } from "../../components/ProgrammeringInput";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { TimeSlot } from "../../utils/types";
import { Loading } from "../../components/loading";
import { notification, Tabs } from "antd";

const ProgrammeringComponent = ({
  name,
  omroep,
}: {
  name: string;
  omroep: string;
}) => {
  const [programmering, setProgrammering] = useState<null | {
    [key: number]: TimeSlot[];
  }>();

  const db = getFirestore();
  const docRef = doc(db, "Admin", name);

  const { TabPane } = Tabs;

  const handleOnFinish = async (values: any, day: number) => {
    const modifiedValues = { ...programmering, ...values };
    await setProgrammering(modifiedValues);

    try {
      await setDoc(docRef, modifiedValues);

      notification["success"]({
        message: "Saved",
      });
    } catch (e) {
      notification["error"]({
        message: "Er is iets misgegaan...",
      });
      console.error(e);
    }
    // console.log(programmering);
  };

  useEffect(() => {
    const getDB = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setProgrammering(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getDB();
  }, []);

  //   console.log("programmering = " + JSON.stringify());

  //   console.log("yes", programmering[1]);

  if (!programmering) {
    return <Loading />;
  }

  return (
    <>
      <h1>Programmering</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Maandag" key="1">
          <h3>Maandag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 1)}
            id={1}
            initialValues={
              programmering
                ? {
                  1: [...(programmering ? programmering[1] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Dinsdag" key="2">
          <h3>Dinsdag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 2)}
            id={2}
            initialValues={
              programmering
                ? {
                  2: [...(programmering[2] ? programmering[2] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Woensdag" key="3">
          <h3>Woensdag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 3)}
            id={3}
            initialValues={
              programmering
                ? {
                  3: [...(programmering[3] ? programmering[3] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Donderdag" key="4">
          <h3>Donderdag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 4)}
            id={4}
            initialValues={
              programmering
                ? {
                  4: [...(programmering[4] ? programmering[4] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Vrijdag" key="5">
          <h3>Vrijdag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 5)}
            id={5}
            initialValues={
              programmering
                ? {
                  5: [...(programmering[5] ? programmering[5] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Zaterdag" key="6">
          <h3>Zaterdag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 6)}
            id={6}
            initialValues={
              programmering
                ? {
                  6: [...(programmering[6] ? programmering[6] : [])],
                }
                : {}
            }
          />
        </TabPane>
        <TabPane tab="Zondag" key="7">
          <h3>Zondag</h3>
          <ProgrammeringInput
            onFinish={(values) => handleOnFinish(values, 0)}
            id={0}
            initialValues={
              programmering
                ? {
                  0: [...(programmering[0] ? programmering[0] : [])],
                }
                : {}
            }
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ProgrammeringComponent;
