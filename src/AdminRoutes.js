import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import TableList from "./views/EmployeeTable.js";
import Maps from "./views/Map.js";
import UserPage from "./views/UserProfile.js";
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
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Employees",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin", 
  },
];
export default AdminRoutes;
