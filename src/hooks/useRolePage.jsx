import {
  RadarChartOutlined,
  UserOutlined,
  BarChartOutlined,
  ContactsOutlined,
  CodeOutlined,
  LaptopOutlined,
  MessageOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import DashboardPage from "../pages/private/dashboard";
import EducationPage from "../pages/private/education";
import ExperincesPage from "../pages/private/experinces";
import MessagesPages from "../pages/private/messages";
import PortFoliosPage from "../pages/private/portfolios";
import SkillsPage from "../pages/private/skills";
import UsersPage from "../pages/private/users";
import AccountPage from "../pages/private/account";

const useRolePage = () => {
  const { user } = useSelector((state) => state.auth);

  const clientPages = [
    {
      key: "dashboard",
      element: DashboardPage,
      icon: BarChartOutlined,
    },
    {
      key: "education",
      element: EducationPage,
      icon: BankOutlined,
    },
    {
      key: "experinces",
      element: ExperincesPage,
      icon: RadarChartOutlined,
    },
    {
      key: "messages",
      element: MessagesPages,
      icon: MessageOutlined,
    },
    {
      key: "portfolios",
      element: PortFoliosPage,
      icon: LaptopOutlined,
    },
    {
      key: "skills",
      element: SkillsPage,
      icon: CodeOutlined,
    },
    {
      key: "account",
      element: AccountPage,
      icon: UserOutlined,
    },
  ];

  const adminPages = clientPages.concat({
    key: "users",
    element: UsersPage,
    icon: ContactsOutlined,
  });
  console.log();

  return user?.role === "admin" ? adminPages : clientPages;
};

export default useRolePage;
