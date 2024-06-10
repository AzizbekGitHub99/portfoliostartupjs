import { create } from "zustand";
import request from "../server/request";
import { toast } from "react-toastify";

const useAccount = create((set, get) => ({
  account: null,
  photo: null,
  btnLoading: false,
  loading: false,
  getAccount: async () => {
    const { data } = await request("auth/me");
    set({ account: data, photo: data.photo });
  },
  submit: async (values) => {
    try {
      set({ loading: true });
      const { getAccount } = get();
      const fields = values.fields.split(",");
      const data = {...values, fields}
      await request.put("auth/updatedetails", data);
      toast.success("Data changed successfully")
      getAccount();
    } finally {
      set({ loading: false });
    }
  },
  handleUserPhoto: async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      set({ btnLoading: true });
      const { data } = await request.post("auth/upload", formData);
      set({ photo: data });
    } finally {
      set({ btnLoading: false });
    }
  },
  deletePhoto: async (id) => {
    try {
      const { getAccount } = get();
      const checkDelete = window.confirm("Are you delete ?");
      if (checkDelete) {
        set({ btnLoading: true });
        await request.delete(`auth/upload/${id}`);
        set({ photo: null });
        getAccount();
      }
    } finally {
      set({ btnLoading: false });
    }
  },
  onFinishPassword: async(value) =>{
    console.log(value);
    try{
      set({btnLoading: true})
      await request.put("auth/updatepassword", value)
      toast.success('Password changed successfully')
    }finally{
      set({btnLoading: false})
    }
  }
}));

export default useAccount;
