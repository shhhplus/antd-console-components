import React, { useEffect, useRef, useMemo } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { Link as RelativeLink } from '@shhhplus/react-router-relative-link';
import { PlusOutlined } from '@ant-design/icons';
import Page from '../../components/Page';
import DrawerEntryPage from '../../components/DrawerEntryPage';
import KeywordSearch from '../../components/KeywordSearch';
import SearchTable from '../../components/SearchTable';

const Column = SearchTable.Column;

const search = ({ values, pagination, filters, sorter, extra }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        records: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
          const number = 100 * (pagination.current - 1) + idx;
          return {
            id: number,
            name: `学生-${number}`,
            cellphone: (13800138000 + idx).toString(),
            address: `闸北区大宁灵石公园${number}号`,
          };
        }),
        current: pagination.current,
        total: 55,
      });
    }, 500);
  });
};

const Create = ({ exit }) => {
  const [form] = Form.useForm();
  const Label = ({ children }) => {
    return <div style={{ width: '80px' }}>{children}</div>;
  };
  return (
    <Page title="新增学生">
      <Form form={form}>
        <Form.Item label={<Label>姓名</Label>} name="username" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item label={<Label>地址</Label>} name="address" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <div style={{ paddingLeft: '94px' }}>
            <Button
              type="primary"
              onClick={() => {
                exit();
              }}
            >
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Page>
  );
};

export default () => {
  // SearchTable的实例
  const instanceRef = useRef(null);

  useEffect(() => {
    // 触发搜索
    instanceRef.current.search();
  }, [instanceRef]);

  const extra = (
    <RelativeLink to="create">
      <Button type="primary" icon={<PlusOutlined />}>
        新建
      </Button>
    </RelativeLink>
  );

  const routes = useMemo(() => {
    return [
      {
        path: 'create',
        component: Create,
      },
    ];
  }, []);

  return (
    <DrawerEntryPage routes={routes}>
      <Page
        title="学生管理"
        onFresh={() => {
          instanceRef.current.search();
        }}
      >
        <Card>
          <SearchTable
            header={
              <KeywordSearch
                left={extra}
                onSubmit={(keyword) => {
                  instanceRef.current.search({
                    values: { keyword },
                  });
                }}
              />
            }
            rowKey={(record) => record.id.toString()}
            search={search}
            onRef={(instance) => {
              instanceRef.current = instance;
            }}
          >
            <Column
              title="姓名"
              dataIndex="name"
              sorter={true}
              filters={[
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
              ]}
            />
            <Column title="手机号" dataIndex="cellphone" />
            <Column title="地址" dataIndex="address" />
          </SearchTable>
        </Card>
      </Page>
    </DrawerEntryPage>
  );
};
