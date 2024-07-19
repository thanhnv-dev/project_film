import DashboardIcon from "../assets/icons/dashboard.svg";
import ShippingIcon from "../assets/icons/shipping.svg";
import ProductIcon from "../assets/icons/product.svg";
import UserIcon from "../assets/icons/user.svg";

const sidebar_menu = [
  {
    id: 2,
    icon: ProductIcon,
    path: "/films",
    title: "Dữ liệu phim",
  },
  {
    id: 3,
    icon: ShippingIcon,
    path: "/cmts",
    title: "Dữ liệu đánh giá",
  },
  {
    id: 4,
    icon: UserIcon,
    path: "/users",
    title: "Dữ liệu người dùng",
  },
];

export default sidebar_menu;
