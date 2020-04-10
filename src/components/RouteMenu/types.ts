import { ReactNode } from 'react';

interface MenuItemConf {
  title: ReactNode;
  path: string;
}

interface SubMenuConf extends MenuItemConf {
  type: 'sub';
  children: Array<MenuItemConf | SubMenuConf | MenuItemGroupConf>;
}

interface MenuItemGroupConf extends MenuItemConf {
  type: 'group';
  children: Array<MenuItemConf>;
}

type Conf = MenuItemConf | SubMenuConf | MenuItemGroupConf;

type RouteMenuProps = Array<Conf>;
