import { Button, Flex, Form, Input, Modal, Pagination, Table } from "antd";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { controlBtnloading, controlModal, getExperince, refetch, setPage, setSearch, setSelected } from "../../../redux/slice/experinces";
import { DatePicker} from 'antd';
import request from "../../../server/request";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const ExperincesPage = () => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const { experinces, loading, isOpen, btnLoading, selected, total, page, callback,search } =
    useSelector((state) => state.experince);
  
  useEffect(()=>{
    dispatch(getExperince(user?.role === 'client' ? {user: user?._id} : null))
  },[dispatch,callback, page, user?._id, user?.role, search])
  const showModal = () => {
    dispatch(controlModal());
    dispatch(setSelected(null))
    form.resetFields()
  };

  const handleOk = async() => {
    try{
      dispatch(controlBtnloading())
      const value = await form.validateFields()
      value.startDate = value.date[0]
      value.endDate = value.date[1]
      delete value.date
      if(selected === null){
        await request.post('experiences', value)
      }else{
        await request.put(`experiences/${selected}`, value)
      }
      dispatch(controlModal());
      dispatch(refetch())
    }finally{
      dispatch(controlBtnloading())
    }
  };

  const handleCancel = () => {
    dispatch(controlModal());
  };

  const handlePage = (p) =>{
    dispatch(setPage(p))
  }

  const editExperince = async(id) =>{
    const {data} = await request(`experiences/${id}`)
    form.setFieldsValue({...data, date: [dayjs(data.startDate), dayjs(data.endDate)]})
    dispatch(controlModal())
    dispatch(setSelected(id))
  }

  const deleteExperince = async(id) =>{
    try{
      const checkDelete = window.confirm("Are you delete this experince ?")
    if(checkDelete){
      dispatch(controlBtnloading())
      await request.delete(`experiences/${id}`)
      dispatch(refetch())
    }
    }finally{
      dispatch(controlBtnloading())
    }
  }

  const handleSearch = (e) =>{
    dispatch(setSearch(e.target.value))
    dispatch(setPage(1))
  }

  const columns = [
    {
      title: "Workname",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Companyname",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
      render: (startDate) => (<p>{startDate.split("T")[0]}</p>),
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (endDate) => (<p>{endDate.split("T")[0]}</p>),
    },
    {
      title: "Username",
      dataIndex: "user",
      key: "user",
      render: (user) => (<p>{user?.username}</p>),
    },
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (_id) =>(
        <Flex gap={"small"}>
          <Button type="primary" onClick={()=> editExperince(_id)}>Edit</Button>
          <Button type="primary" danger onClick={()=> deleteExperince(_id)}>Delete</Button>
        </Flex>
      )
    },
  ];
  return (
    <Fragment>
      <Table
        title={() => (
          <Flex vertical="column" justify="space-between" gap={"small"}>
            <Flex align="center" justify="space-between">
            <h1>Experinces {total} </h1>
            <Button onClick={showModal} type="primary">
              Add experince
            </Button>
            </Flex>
            <Input placeholder="Basic usage" onChange={handleSearch} />
          </Flex>
        )}
        columns={columns}
        dataSource={experinces}
        loading={loading}
        pagination={false}
      />
      <Pagination current={page} total={total} onChange={handlePage} />
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={btnLoading}
      >
        <Form
        form={form}
          name="experince"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Workname"
            name="workName"
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
            label="Company name"
            name="companyName"
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
            label="Description"
            name="date"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <RangePicker/>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default ExperincesPage;
