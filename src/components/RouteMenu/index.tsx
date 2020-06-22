import React, {
  Fragment,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu } from 'antd';
import { convert, getMatchedLeafPaths, getMatchedPaths } from './utils';

const { Item, SubMenu, ItemGroup } = Menu;

const Title = ({ icon, name }: { icon?: ReactNode; name: string }) => {
  return (
    <Fragment>
      {icon}
      <span>{name}</span>
    </Fragment>
  );
};

const CustomizedItem = ({ path, icon, name, ...rest }: any) => {
  if (path) {
    return (
      <Item {...rest} key={path}>
        <Link to={path}>{<Title icon={icon} name={name} />}</Link>
      </Item>
    );
  } else {
    return (
      <Item {...rest} key={path}>
        <Title icon={icon} name={name} />
      </Item>
    );
  }
};

const CustomizedSub = ({ icon, name, path, children, ...rest }: any) => {
  return (
    <SubMenu {...rest} title={<Title icon={icon} name={name} />} key={path}>
      {children.map((option: any) => {
        if (option.type === 'sub') {
          return <CustomizedSub {...option} key={option.path} />;
        }
        return <CustomizedItem {...option} key={option.path} />;
      })}
    </SubMenu>
  );
};

const CustomizedGroup = ({ icon, name, children, ...rest }: any) => {
  return (
    <ItemGroup {...rest} title={<Title icon={icon} name={name} />}>
      {children.map((option: any) => {
        return <CustomizedItem {...option} key={option.path} />;
      })}
    </ItemGroup>
  );
};

interface RouteMenuProps {
  theme?: 'dark' | 'light';
  mode?:
    | 'inline'
    | 'vertical'
    | 'vertical-left'
    | 'vertical-right'
    | 'horizontal';
  baseUrl?: string;
  data: Array<any>;
}

export default ({
  theme = 'dark',
  mode = 'inline',
  baseUrl = '/',
  data = [],
}: RouteMenuProps) => {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location]);
  const data2use = useMemo(() => convert(data, baseUrl), [data, baseUrl]);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const selectedKeys: Array<string> = useMemo(() => {
    return getMatchedLeafPaths(data2use, pathname);
  }, [data2use, pathname]);

  const openKeysRef = useRef<Array<string>>([]);

  useEffect(() => {
    openKeysRef.current = openKeys;
  }, [openKeys]);

  useEffect(() => {
    const paths = getMatchedPaths(data2use, pathname);
    // 删除第一条数据（叶子节点）
    paths.shift();
    // 合并并去重
    const list2use = Array.from(new Set([...openKeysRef.current, ...paths]));
    setOpenKeys(list2use);
  }, [data2use, pathname]);

  return (
    <Menu
      theme={theme}
      mode={mode}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={setOpenKeys}
    >
      {data2use.map((option: any) => {
        if (option.type === 'sub') {
          return <CustomizedSub {...option} key={option.path} />;
        }

        if (option.type === 'group') {
          return <CustomizedGroup {...option} key={option.path} />;
        }
        return <CustomizedItem {...option} key={option.path} />;
      })}
    </Menu>
  );
};
