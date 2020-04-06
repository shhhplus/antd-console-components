import React, { Fragment } from 'react';
import { Popconfirm, Table, Button } from 'antd';
import { storiesOf } from '@storybook/react';
import Actions from '../components/Actions';

Actions.config({
  spacing: 20,
});

storiesOf('Actions', module)
  .add('标准', () => {
    return (
      <div style={{ background: '#ffffff', padding: '20px' }}>
        <Actions spacing={12}>
          <Button>重启</Button>
          <Button type="primary">删除</Button>
          <Button type="primary">编辑标签</Button>
          <Button>查看详情</Button>
        </Actions>
      </div>
    );
  })
  .add('表格中使用', () => {
    const data = [
      {
        id: 1,
        name: 'John Brown',
        age: 32,
      },
      {
        id: 2,
        name: 'Jim Green',
        age: 42,
      },
      {
        id: 3,
        name: 'Joe Black',
        age: 32,
      },
    ];

    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Actions spacing={15}>
            <Button type="primary">修改</Button>
            <Popconfirm title="您确定要删除该记录吗?">
              <Button type="danger">删除</Button>
            </Popconfirm>
            {true && <Button>true</Button>}
            {false && <Button>false</Button>}
            <Fragment>
              <Button>加</Button>
              <Button>减</Button>
            </Fragment>
          </Actions>
        ),
      },
    ];

    return (
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    );
  });
