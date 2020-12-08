import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import TableList from "./views/EmployeeTable.js";
import orderHistory from "./views/HistoryTable"
import Maps from "./views/Map.js";
import UserPage from "./views/UserProfile.js";
import ChatView from "./views/Chat/Chat.js";
import UpgradeToPro from "./views/Upgrade.js";

var AdminRoutes = [
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Employees",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin", 
  },
  {
    path: "/history",
    name: "Order History",
    icon: "nc-icon nc-calendar-60",
    component: orderHistory,
    layout: "/admin", 
  },
  {
    path: "/messages",
    name: "Chat",
    icon: "nc-icon nc-chat-33",
    component: ChatView,
    layout: "/admin", 
  },
];
export default AdminRoutes;
