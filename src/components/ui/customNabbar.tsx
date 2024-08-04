import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getCurrentRoute } from "@/common/utils";

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(getCurrentRoute());
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  function handleLinkClick(route: string) {
    setCurrentRoute(route);
    route === "/" ? navigate("/") : navigate(`/${route}`);
  }

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          onClick={() => {
            handleLinkClick("/");
          }}
        >
          Meight.
        </Typography>
        <div className="hidden lg:block">
          <NavList currentRoute={currentRoute} onClick={handleLinkClick} />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList currentRoute={currentRoute} onClick={handleLinkClick} />
      </Collapse>
    </Navbar>
  );
};

interface NavLitProps {
  currentRoute: string;
  onClick: (route: string) => void;
}

const NavList: React.FC<NavLitProps> = ({ currentRoute, onClick }) => {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <ListItem
        className="hover:bg-gray-300 focus:bg-gray-300"
        selected={currentRoute === "vehicles"}
        onClick={() => {
          onClick("vehicles");
        }}
      >
        vehicles
      </ListItem>
      <ListItem
        className="hover:bg-gray-300 focus:bg-gray-300"
        selected={currentRoute === "orders"}
        onClick={() => {
          onClick("orders");
        }}
      >
        orders
      </ListItem>
    </List>
  );
};

export default CustomNavbar;
