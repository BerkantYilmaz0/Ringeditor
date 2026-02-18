import React from "react";
import Menuitems from "./MenuItems";
import { Box } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upgrade } from "./Updrade";

// Menü ikonları için tip: React bileşeni döndüren fonksiyon tipi
type IconComponent = React.ComponentType<{ stroke?: number; size?: string | number }>;

interface SidebarItem {
  id?: string;
  title?: string;
  icon?: IconComponent;
  href?: string;
  subheader?: string;
  children?: SidebarItem[];
}


const renderMenuItems = (items: SidebarItem[], pathDirect: string) => {

  return items.map((item: SidebarItem) => {

    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      return (
        <Menu
          subHeading={item.subheader}
          key={item.subheader}
        />
      );
    }

    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href}
          borderRadius='8px'
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem >
      </Box>

    );
  });
};


const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname || '';

  return (
    < >
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#5D87FF"} themeSecondaryColor={'#49beff'} >

        <Logo img='/images/logos/dark-logo.svg' component={Link} to="/" >Modernize</Logo>

        {renderMenuItems(Menuitems, pathDirect)}
        <Box px={2}>
          <Upgrade />
        </Box>
      </MUI_Sidebar>

    </>
  );
};
export default SidebarItems;
