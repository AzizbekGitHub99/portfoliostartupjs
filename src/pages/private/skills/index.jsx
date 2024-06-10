import { Fragment, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Slider,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  controlBtnLoading,
  controlModal,
  controlPage,
  controlSearch,
  getSkills,
  refresh,
  setSelected,
} from "../../../redux/slice/skills";
import request from "../../../server/request";

const SkillsPage = () => {

  const {user} = useSelector(state => state.auth)
  const { skills, total, loading, isOpen, callback, btnLoading, page, search, selected } =
    useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getSkills(user?.role === 'client' ? {user: user?._id}: null));
  }, [dispatch, callback, page,search,user?.role, user?._id]);

  const editSkill = async(id) => {
    const {data} = await request(`skills/${id}`)
    form.setFieldsValue(data);
    dispatch(controlModal());
    dispatch(setSelected(id))
  };

  const deleteSkill = async(id) => {
    const checkDelete = window.confirm("Are you want delete this skill ?")
    if(checkDelete){
      await request.delete(`skills/${id}`)
      dispatch(refresh());
    }
  };

  const showModal = () => {
    dispatch(controlModal());
    form.resetFields();
  };

  const submit = async () => {
    try {
      dispatch(controlBtnLoading());
      const values = await form.validateFields();
      if(selected === null){
        await request.post("skills", values);
      }else{
        await request.put(`skills/${selected}`, values);
      }
      dispatch(refresh());
      dispatch(controlModal());
    } finally {
      dispatch(controlBtnLoading());
    }
  };

  const handleCancel = () => {
    dispatch(controlModal());
  };

  const getPage = (page) => {
    dispatch(controlPage(page));
  };

  const handleSearch = (e) =>{
    dispatch(controlSearch(e.target.value))
    dispatch(controlPage(1));

  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (_id) => (
        <Flex gap="small">
          <Button type="primary" onClick={() => editSkill(_id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteSkill(_id)}>
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
          <Flex gap={"small"} vertical="column" >
            <Flex align="center" justify="space-between">
              <h1>Skills {total} </h1>
              <Button type="dashed" onClick={showModal}>
                Add skills
              </Button>
            </Flex>
            <Input placeholder="Search Skill" onChange={handleSearch} />
          </Flex>
        )}
        pagination={false}
        columns={columns}
        dataSource={skills}
        loading={loading}
      />
      <Pagination onChange={getPage}  current={page} total={total} />
      <Modal
        title="Skills modal"
        open={isOpen}
        onOk={submit}
        onCancel={handleCancel}
        confirmLoading={btnLoading}
      >
        <Form
          form={form}
          name="skils"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Skill name"
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
          <Form.Item label="Percent" name="percent">
            <Slider />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
