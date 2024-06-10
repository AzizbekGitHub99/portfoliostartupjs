import { Fragment, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import {
  useCreatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../../redux/query/portfolios";

import getImgUrl from "../../../utils";
import request from "../../../server/request";
import axios from "axios";
import { BASE } from "../../../consts";

const PortFoliosPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [checkPhoto, setCheckPhoto] = useState(true);

  const { data, isFetching } = useGetPortfoliosQuery(
    user?.role === "client"
      ? { user: user._id, page, search }
      : { page, search }
  );

  const [deletePortfolio] = useDeletePortfolioMutation();
  const [createPortfolio] = useCreatePortfolioMutation();
  const [getPortfolio] = useGetPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();

  const getPage = (page) => {
    setPage(page);
  };

  const portfolioDelete = (id) => {
    const checkDelete = window.confirm("Are you delete this portfolio ?");
    if (checkDelete) {
      deletePortfolio(id);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setPhoto(null);
    // setBtnLoading(true)
    setSelected(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, photo: photo._id };
      setBtnLoading(true);
      if (selected === null) {
        await createPortfolio(data);
      } else {
        await updatePortfolio({ id: selected, data });
      }
      setIsModalOpen(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const portfolioEdit = async (id) => {
    try {
      setBtnLoading(true);
      const { data } = await getPortfolio(id);
      setPhoto(data?.photo);
      try {
        await axios(
          `${BASE}upload/${data?.photo?._id}.${data?.photo?.name.split(".")[1]}`
        );
        setCheckPhoto(true);
      } catch {
        setCheckPhoto(false);
      }
      form.setFieldsValue(data);
      setIsModalOpen(true);
      setSelected(id);
    } finally {
      setBtnLoading(false);
    }
  };
  console.log(checkPhoto);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePhoto = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      setBtnLoading(true);
      const { data } = await request.post("upload", formData);
      setPhoto(data);
      setCheckPhoto(true);
    } finally {
      setBtnLoading(false);
    }
  };

  const deletePhoto = async (id) => {
    try {
      setBtnLoading(true);
      await request.delete(`upload/${id}`);
      setPhoto(null);
    } finally {
      setBtnLoading(false);
    }
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "name",
      render: (photo) => (
        <Image src={getImgUrl(photo)} width={50} height={50} />
      ),
    },
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
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => <a href={url}>{url}</a>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap={"small"}>
          <Button type="primary" onClick={() => portfolioEdit(_id)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="primary" danger onClick={() => portfolioDelete(_id)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Flex>
      ),
    },
  ];

  const portfolios = data?.data;
  const total = data?.pagination?.total;

  return (
    <Fragment>
      <Table
        title={() => (
          <Flex vertical="column" gap={"small"}>
            <Flex justify="space-between" align="center">
              <h1>Portfolios {total}</h1>
              <Button type="dashed" onClick={showModal}>
                Add Portfolio
              </Button>
            </Flex>
            <Input placeholder="Search portfolio" onChange={handleSearch} />
          </Flex>
        )}
        columns={columns}
        dataSource={portfolios}
        pagination={false}
        loading={isFetching}
      />
      {
        total > 10 ?
        <Pagination defaultCurrent={1} total={total} onChange={getPage} /> :null
      }
      <Modal
        title="Portfolio data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={btnLoading}
      >
        <Form
          form={form}
          name="portfolio"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Portfolio name"
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
            label="Portfolio Url"
            name="url"
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
          {photo ? (
            checkPhoto ? (
              <>
                <Image src={getImgUrl(photo)} />
                <Button
                  loading={btnLoading}
                  type="primary"
                  danger
                  onClick={() => deletePhoto(photo?._id)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <input disabled={btnLoading} type="file" onChange={handlePhoto} />
            )
          ) : (
            <input disabled={btnLoading} type="file" onChange={handlePhoto} />
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortFoliosPage;
