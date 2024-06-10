import { Fragment, useState } from "react";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useCreateEducationMutation, useDeleteEducationMutation, useGetEducationMutation, useGetEducationsQuery, useUpdateEducationMutation } from "../../../redux/query/education";
import dayjs from "dayjs";

const {RangePicker} = DatePicker

const EducationPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const {data: education, isFetching} = useGetEducationsQuery(user?.role === "client"
  ? { user: user._id, page, search }
  : { page, search })
  const [deleteEducation] =  useDeleteEducationMutation()
  const [createEducation] =  useCreateEducationMutation()
  const [getEducation] = useGetEducationMutation()
  const [updateEducation] = useUpdateEducationMutation()


  const getPage = (page) => {
    setPage(page);
  };

  const educationDelete = (id) => {
    const checkDelete = window.confirm("Are you delete this education ?");
    if (checkDelete) {
      deleteEducation(id)
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setSelected(null);
  };

  const handleOk = async () => {
    try{
      setIsModalOpen(false);
      const value = await form.validateFields()
      value.startDate = value.date[0]
      value.endDate = value.date[1]
      delete value.date
      if(selected === null){
        setBtnLoading(true)
        await createEducation(value)
      }else{
        setBtnLoading(true)
        await updateEducation({id:selected, data: value})
      }
    }finally{
      setBtnLoading(false)
    }
  };

  const educationEdit = async (id) => {
    try {
      setBtnLoading(true);
      const {data} = await getEducation(id)
      console.log(data);
      form.setFieldsValue({...data, date: [dayjs(data.startDate), dayjs(data.endDate)]})
      setIsModalOpen(true);
      setSelected(id);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = education?.data
  const total = education?.pagination?.total

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => <p>{startDate.split("T")[0]}</p>
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => <p>{endDate.split("T")[0]}</p>
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button type="primary" onClick={() => educationEdit(_id)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="primary" danger onClick={() => educationDelete(_id)}>
            <DeleteOutlined />
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
          <Flex vertical="column" gap={"small"}>
            <Flex justify="space-between" align="center">
              <h1>Education {total}</h1>
              <Button type="dashed" onClick={showModal}>
                Add Portfolio
              </Button>
            </Flex>
            <Input placeholder="Search portfolio" onChange={handleSearch} />
          </Flex>
        )}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isFetching}
      />
      <Pagination defaultCurrent={1} total={total} onChange={getPage} />
      <Modal
        title="Education data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={btnLoading}
      >
        <Form
          form={form}
          name="education"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Education name"
            name="name"
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
            label="Level"
            name="level"
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
            label="Description"
            name="description"
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
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
