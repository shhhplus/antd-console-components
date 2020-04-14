import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { PageHeader, Button, Form, Input, Card } from 'antd';
import { Link as RelativeLink } from '@shhhplus/react-router-relative-link';
import { PlusOutlined } from '@ant-design/icons';
import DrawerPageLayout from '../../components/DrawerPageLayout';
import PageLayout from '../../components/PageLayout';
import DrawerPageEntry from '../../components/DrawerPageEntry';
import KeywordSearch from '../../components/KeywordSearch';
import SearchTable from '../../components/SearchTable';

const Column = SearchTable.Column;

const Create = ({ exit }) => {
  const [form] = Form.useForm();
  const Label = ({ children }) => {
    return <div style={{ width: '80px' }}>{children}</div>;
  };
  return (
    <DrawerPageLayout title="新增员工">
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
    </DrawerPageLayout>
  );
};

export default () => {
  // SearchTable的实例
  const instanceRef = useRef(null);
  const valuesRef = useRef({});

  const search = useCallback(({ pagination, filters, sorter, extra }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: new Array(pagination.pageSize).fill().map((item, idx) => {
            const number = 100 * (pagination.current - 1) + idx;
            return {
              id: number,
              name: `员工-${number}`,
              cellphone: (13800138000 + idx).toString(),
              address: `闸北区大宁灵石公园${number}号`,
            };
          }),
          current: pagination.current,
          total: 55,
        });
      }, 500);
    });
  }, []);

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
    <DrawerPageEntry routes={routes}>
      <PageLayout header={<PageHeader title="员工管理" />}>
        <Card>
          <SearchTable
            header={
              <KeywordSearch
                left={extra}
                onSubmit={(keyword) => {
                  valuesRef.current = {
                    keyword,
                  };
                  instanceRef.current.search({
                    current: 1,
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
      </PageLayout>
    </DrawerPageEntry>
  );
};
