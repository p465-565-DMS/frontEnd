/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import TableList from "./views/EmployeeTable.js";
import Maps from "./views/Map.js";
import UserPage from "./views/UserProfile.js";
import UpgradeToPro from "./views/Upgrade.js";

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
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/user",
  },
  {
    path: "/tables",
    name: "Employees",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/user", 
  },
];
export default UserRoutes;
