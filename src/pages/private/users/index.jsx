import { Fragment, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
  DatePicker,
} from "antd";

import { BASE } from "../../../consts";
import useUsers from "../../../zustand/users";

const UsersPage = () => {
  const [form] = Form.useForm();
  const {
    users,
    total,
    loading,
    btnLoading,
    isOpen,
    page,
    getUsers,
    handleSelect,
    handleSearch,
    getPage,
    editUser,
    deleteUser,
    submit,
    closeModal,
    showModal,
    handlePhoto,
    photo, 
    role,
    deletUserPhoto,
    updateClient,
    checkPhoto
  } = useUsers();


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image src={`${BASE}upload/${photo}`} width={30} height={30} />
      ),
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: ( role, record) => (
        
        <Flex>
          {role === "client" ?
          <p>{role}</p>:
          <Button type="primary" onClick={()=> updateClient(record._id)}>Update to client</Button>  
        }
        
        </Flex>
      ),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button type="primary" onClick={() => editUser(form, _id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteUser(_id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        title={() => (
          <Flex vertical="column" gap={"middle"}>
            <Flex align="center" justify="space-between">
              <h1>Users: {total}</h1>
              <Button type="dashed" onClick={() => showModal(form)}>
                Add user
              </Button>
            </Flex>
            <Flex gap={"small"}>
              <Input placeholder="Searching user" onChange={handleSearch} />
              <Select
                value={role}
                onChange={handleSelect}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: null,
                    label: "All",
                  },
                  {
                    value: "client",
                    label: "Client",
                  },
                  {
                    value: "user",
                    label: "No client",
                  },
                ]}
              />
            </Flex>
          </Flex>
        )}
        columns={columns}
        dataSource={users}
        pagination={false}
        loading={loading}
      />
      <Pagination current={page} total={total} onChange={getPage} />
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={() => submit(form)}
        onCancel={closeModal}
        confirmLoading={btnLoading}
      >
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
            label="Password"
            name="password"
            rules={[
              {
                required: false,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "client",
                  label: "Client",
                },
                {
                  value: "user",
                  label: "No client",
                },
              ]}
            />
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
                  label="Github username"
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
                  label="Linkedin username"
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
                  label="Telegram username"
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
                  label="Instagram username"
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
          {photo ? (
            checkPhoto ? 
            <Flex vertical="column" gap={"middle"}>
              <Image src={`${BASE}upload/${photo}`} />
              <Button
                loading={btnLoading}
                type="primary"
                danger
                onClick={() => deletUserPhoto(photo) }
              >
                Delete photo
              </Button>
            </Flex> :
            <input disabled={btnLoading} type="file" onChange={handlePhoto} />
          ) : (
            <input disabled={btnLoading} type="file" onChange={handlePhoto} />
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
