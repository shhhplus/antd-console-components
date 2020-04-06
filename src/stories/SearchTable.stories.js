import React, { useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Form, Input, Button, Popconfirm, Card } from 'antd';
import SearchTable from '../components/SearchTable';
import KeywordSearch from '../components/KeywordSearch';

const { Column } = SearchTable;

const StandardDemo = (() => {
  const CustomizeSearchForm = ({ onSearchSubmit }) => {
    const [form] = Form.useForm();

    return (
      <Form layout="inline" form={form}>
        <Form.Item label="姓名" name="username" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item label="地址" name="address" rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              form.validateFields((err, values) => {
                onSearchSubmit && onSearchSubmit(values);
              });
            }}
          >
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const search = ({ values, pagination, filters, sorter, extra }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: [1, 2, 3, 4, 5].map((idx) => {
            const number = 100 * (pagination.current - 1) + idx;
            return {
              id: number,
              name: `jay-${number}`,
              age: 32,
              address: `西湖区湖底公园${number}号`,
            };
          }),
          current: pagination.current,
          total: 55,
        });
      }, 500);
    });
  };

  const Demo = (props) => {
    // SearchTable的实例
    const instanceRef = useRef(null);

    useEffect(() => {
      // 触发搜索
      if (!instanceRef.current) {
        return;
      }
      instanceRef.current.search();
    }, [instanceRef]);

    return (
      <Card>
        <SearchTable
          header={
            <CustomizeSearchForm
              onSearchSubmit={(values) => {
                instanceRef.current.search({ values, current: 1 });
              }}
            />
          }
          rowKey={(record) => record.id}
          pageSize={5}
          search={search}
          onRef={(instance) => {
            instanceRef.current = instance;
          }}
        >
          <Column
            title="姓名"
            key="name"
            dataIndex="name"
            sorter={true}
            filters={[
              { text: 'Joe', value: 'Joe' },
              { text: 'Jim', value: 'Jim' },
            ]}
          />
          <Column
            title="年龄"
            key="age"
            dataIndex="age"
            sorter={(a, b) => a.age - b.age}
          />
          <Column title="地址" key="address" dataIndex="address" />
          <Column
            title="操作"
            key="actions"
            render={() => {
              return (
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={() => {
                    instanceRef.current.search();
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              );
            }}
          />
        </SearchTable>
      </Card>
    );
  };

  return Demo;
})();

const KeywordSearchDemo = (() => {
  const extra = <Button type="primary">新建</Button>;

  const search = ({ values, pagination, filters, sorter, extra }) => {
    console.log(
      '[KeywordSearchDemo] values:',
      values,
      ', pagination:',
      pagination,
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: [1, 2, 3, 4, 5].map((idx) => {
            const number = 100 * (pagination.current - 1) + idx;
            return {
              id: number,
              name: `jay-${number}`,
              age: 32,
              address: `西湖区湖底公园${number}号`,
            };
          }),
          current: pagination.current,
          total: 55,
        });
      }, 500);
    });
  };

  const Demo = (props) => {
    // SearchTable的实例
    const instanceRef = useRef(null);

    useEffect(() => {
      // 触发搜索
      instanceRef.current.search();
    }, [instanceRef]);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
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
          rowKey={(record) => record.id}
          columns={columns}
          search={search}
          onRef={(instance) => {
            instanceRef.current = instance;
          }}
        ></SearchTable>
      </Card>
    );
  };

  return Demo;
})();

const NoPaginationDemo = (() => {
  const extra = <Button type="primary">新建</Button>;

  const search = ({ values, pagination, filters, sorter, extra }) => {
    console.log('[KeywordSearchDemo] values:', values);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: [1, 2, 3, 4, 5].map((idx) => {
            const number = idx;
            return {
              id: number,
              name: `jay-${number}`,
              age: 32,
              address: `西湖区湖底公园${number}号`,
            };
          }),
        });
      }, 500);
    });
  };

  const Demo = (props) => {
    // SearchTable的实例
    const instanceRef = useRef(null);

    useEffect(() => {
      // 触发搜索
      instanceRef.current.search();
    }, [instanceRef]);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
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
          rowKey={(record) => record.id}
          columns={columns}
          paginationShown={false}
          search={search}
          onRef={(instance) => {
            instanceRef.current = instance;
          }}
        ></SearchTable>
      </Card>
    );
  };

  return Demo;
})();

const NoSearchFormDemo = (() => {
  const search = ({ values, pagination, filters, sorter, extra }) => {
    console.log('[KeywordSearchDemo] values:', values);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: [1, 2, 3, 4, 5].map((idx) => {
            const number = 100 * (pagination.current - 1) + idx;
            return {
              id: number,
              name: `jay-${number}`,
              age: 32,
              address: `西湖区湖底公园${number}号`,
            };
          }),
          current: pagination.current,
          total: 55,
        });
      }, 500);
    });
  };

  const Demo = (props) => {
    // SearchTable的实例
    const instanceRef = useRef(null);

    useEffect(() => {
      // 触发搜索
      instanceRef.current.search();
    }, [instanceRef]);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
      <Card>
        <SearchTable
          rowKey={(record) => record.id}
          columns={columns}
          search={search}
          onRef={(instance) => {
            instanceRef.current = instance;
          }}
        />
      </Card>
    );
  };

  return Demo;
})();

const NoDataDemo = (() => {
  const extra = <Button type="primary">新建</Button>;

  const search = ({ values, pagination, filters, sorter, extra }) => {
    console.log('[KeywordSearchDemo] values:', values);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          records: [],
          current: pagination.current,
          total: 0,
        });
      }, 500);
    });
  };

  const Demo = (props) => {
    // SearchTable的实例
    const instanceRef = useRef(null);

    useEffect(() => {
      // 触发搜索
      instanceRef.current.search();
    }, [instanceRef]);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
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
          rowKey={(record) => record.id}
          columns={columns}
          search={search}
          onRef={(instance) => {
            instanceRef.current = instance;
          }}
        ></SearchTable>
      </Card>
    );
  };

  return Demo;
})();

storiesOf('SearchTable', module)
  // .addDecorator(withKnobs)
  .add('自定义表单搜索', StandardDemo)
  .add('关键字搜索', KeywordSearchDemo)
  .add('无分页', NoPaginationDemo)
  .add('无搜索表单', NoSearchFormDemo)
  .add('没搜索到数据', NoDataDemo);
