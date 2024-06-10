import { create } from "zustand";
import request from "../server/request";
import dayjs from "dayjs";
import { BASE } from "../consts";

const useUsers = create((set, get) => ({
  users: [],
  selected: null,
  role: null,
  photo: null,
  loading: false,
  btnLoading: false,
  isOpen: false,
  page: 1,
  total: 0,
  search: "",
  checkPhoto: false,

  handleSearch: (e) => {
    const { getUsers } = get();
    set({ search: e.target.value });
    getUsers();
  },
  handleSelect: (value) => {
    const { getUsers } = get();
    set({ role: value, page: 1 });
    getUsers();
  },

  getPage: (page) => {
    const { getUsers } = get();
    set({ page });
    getUsers();
  },
  getUsers: async () => {
    const { role, search, page } = get();
    set({ loading: true });
    const params = { role, search, page };
    const {
      data: { data, pagination },
    } = await request("users", { params });
    set({ users: data, total: pagination.total, loading: false });
  }, 
  submit: async (form) => {
    try {
      const { getUsers, selected, photo } = get();
      set({ btnLoading: true });
      const value = await form.validateFields();
      const fields = value.fields.split(",");
      const data = { ...value, fields, photo };
      set({ btnLoading: true });
      if (selected === null) {
        await request.post("users", data);
      } else {
        await request.put(`users/${selected}`, data);
      }
      getUsers();
      set({ isOpen: false });
    } finally {
      set({ btnLoading: false });
    }
  },
  showModal: (form) => {
    set({ isOpen: true, selected: null, photo: null, img: null });
    form.resetFields();
  },
  closeModal: () => {
    set({ isOpen: false });
  },
  editUser: async (form, id) => {
    set({ isOpen: true, selected: id });
    const { data } = await request.get(`users/${id}`);
    form.resetFields();
    try{
      await request(`${BASE}upload/${data?.photo}`)
      set({ checkPhoto: true });
    }catch{
      set({ checkPhoto: false });
    }
    set({ selected: id, photo: data?.photo });
    form.setFieldsValue({ ...data, birthday: dayjs(data.birthday),fields: data.fields.toString() });
  },
  deleteUser: async (id) => {
    const { getUsers } = get();
    const checkDelete = window.confirm("Are you delete this user ?");
    if (checkDelete) {
      await request.delete(`users/${id}`);
      getUsers();
    }
  },
  handlePhoto: async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      set({ btnLoading: true });
      const { data } = await request.post("upload", formData);
      set({ photo: `${data._id}.${data.name.split(".")[1]}`, checkPhoto: true });
    } finally {
      set({ btnLoading: false });
    }
  },
  deletePhoto: async (id) => {
    try {
      set({ btnLoading: true });
      await request.delete(`upload/${id}`);
      set({ photo: null });
    } finally {
      set({ btnLoading: false });
    }
  },
  deletUserPhoto: async (id) => {
    try {
      set({ btnLoading: true });
      await request.delete(`auth/upload/${id}`);
      set({ photo: null });
    } finally {
      set({ btnLoading: false });
    }
  },
  updateClient: async (id) => {
    const { getUsers } = get();
    const data = {role: "client"}
    await request.put(`users/${id}`,data );
    getUsers();
  },
}));

export default useUsers;
