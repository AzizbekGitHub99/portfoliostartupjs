import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Tabs,
} from "antd";
import { Fragment, useEffect } from "react";
import useAccount from "../../../zustand/account";
import dayjs from "dayjs";
import { BASE } from "../../../consts";

const AccountPage = () => {
  const [form] = Form.useForm();
  const {
    account,
    photo,
    getAccount,
    submit,
    deletePhoto,
    handleUserPhoto,
    btnLoading,
    loading,
    onFinishPassword,
  } = useAccount();

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  form.setFieldsValue({ ...account, birthday: dayjs(account?.birthday) });

  const items = [
    {
      key: "1",
      label: "User Info",
      children: (
        <Fragment>
          <Row gutter={32}>
            <Col span={8}>
              {photo ? (
                <>
                  <Image width={"100%"} src={`${BASE}upload/${photo}`} />
                  <Button
                    loading={btnLoading}
                    type="primary"
                    danger
                    style={{ width: "100%", marginTop: "20px" }}
                    onClick={() => deletePhoto(photo)}
                  >
                    Delete photo
                  </Button>
                </>
              ) : (
                <input
                  disabled={btnLoading}
                  type="file"
                  onChange={handleUserPhoto}
                />
              )}
            </Col>
            <Col span={16}>
              <Form
                form={form}
                name="user"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                autoComplete="off"
                onFinish={submit}
              >
                <Form.Item
                  label="Firstname"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Lastname"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Birthday"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input defaultValue="+998" />
                </Form.Item>
                <Form.Item
                  label="Fields"
                  name="fields"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Info"
                  name="info"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Github"
                  name="github"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Linkedin"
                  name="linkedin"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Telegram"
                  name="telegram"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Instagram"
                  name="instagram"
                  rules={[
                    {
                      required: true,
                      message: "Please fill!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Fragment>
      ),
    },
    {
      key: "2",
      label: "Update Password",
      children: (
        <Flex>
          <Form
            name="password"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            autoComplete="off"
            onFinish={onFinishPassword}
          >
            <Form.Item
              label="Current password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button loading={btnLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Flex>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default AccountPage;
