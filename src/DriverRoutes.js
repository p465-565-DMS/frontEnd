import Dashboard from "./views/DriverDashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import OrderHistory from "./views/driverHistory";
import Maps from "./views/Map.js";
import UserPage from "./views/UserProfile.js";
import UpgradeToPro from "./views/Upgrade.js";

var DriverRoutes = [
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/driver",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/driver",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/driver",
  },
  {
    path: "/history",
    name: "Delivery History",
    icon: "nc-icon nc-tile-56",
    component: OrderHistory,
    layout: "/driver", 
  },
];
export default DriverRoutes;