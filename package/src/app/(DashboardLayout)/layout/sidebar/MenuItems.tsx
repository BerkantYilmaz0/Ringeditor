import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconCalendarEvent,
  IconListCheck,
  IconBus,
  IconMap,
  IconColorFilter,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },
  {
    id: uniqueId(),
    title: "Planlar",
    icon: IconCalendarEvent,
    href: "/Plans",
    description: "Planları yönetin",
  },

  {
    id: uniqueId(),
    title: "Şablonlar",
    icon: IconListCheck,
    href: "/Templates",
    description: "Sefer şablonlarını yönetin",
  },
  {
    id: uniqueId(),
    title: "Ring Tipleri",
    icon: IconBus,
    href: "/Rings",
    description: "Sefer şablonlarını yönetin",
  },
  {
    id: uniqueId(),
    title: "Güzergahlar",
    icon: IconMap,
    href: "/Routes",
    description: "Güzergah haritalarını yönetin",
  },
  {
    id: uniqueId(),
    title: "Renk Kodları",
    icon: IconColorFilter,
    href: "/color-codes",
    description: "Ring Seferleri için renk kodlarını yönetin",
  },
  {
    navlabel: true,
    subheader: "AUTH",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: " EXTRA",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },


];

export default Menuitems;


