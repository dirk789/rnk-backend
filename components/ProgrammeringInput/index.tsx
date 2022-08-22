import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { TimeSlot } from "../../utils/types";

type Props = {
  onFinish: (values: any) => void;
  initialValues: { [key: string]: TimeSlot[] };
  id: number;
};

const ProgrammeringInput = ({ onFinish, initialValues, id }: Props) => {
  console.log("Initial = ", initialValues);

  return (
    <Form
      name={"form-" + id}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.List name={id}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "start"]}
                  rules={[{ required: true, message: "Voer een begintijd in" }]}
                >
                  <Input placeholder="Programma begintijd" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "end"]}
                  rules={[{ required: true, message: "Voer een eindtijd in" }]}
                >
                  <Input placeholder="Endtijd" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "showName"]}
                  rules={[
                    {
                      required: true,
                      message: "Voer de naam van het programma in",
                    },
                  ]}
                >
                  <Input placeholder="Programma naam" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { ProgrammeringInput };
