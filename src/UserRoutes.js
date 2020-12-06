import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import OrderHistory from "./views/userHistory";
import Maps from "./views/Map.js";
import UserPage from "./views/UserProfile.js";
import UpgradeToPro from "./views/Upgrade.js";
import FillInfo from "./views/FillInfoPage.js";
import ChatView from "./views/Chat/Chat.js";
import Dashboard from "./views/UserDashboard.js";

var UserRoutes = [
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/history",
    name: "Order History",
    icon: "nc-icon nc-tile-56",
    component: OrderHistory,
    layout: "/user",
  },
  {
    path: "/messages",
    name: "Chat",
    icon: "nc-icon nc-chat-33",
    component: ChatView,
    layout: "/user",
  },
];
export default UserRoutes;
