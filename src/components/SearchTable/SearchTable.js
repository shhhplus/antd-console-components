import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Table, message } from 'antd';
import styles from './index.module.scss';
import Column from './Column';

const _DefaultPageSize = 10;

export default function SearchTable({
  rowKey,
  columns,
  paginationShown = true,
  search,
  onRef,
  header,
  children,
  pageSize = _DefaultPageSize,
  ...rest
}) {
  const [values, setValues] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
  });
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({});
  const [extra, setExtra] = useState({});
  const [data, setData] = useState({
    records: [],
    total: 0,
  });
  const [doSearch, setDoSearch] = useState(false);
  const [searching, setSearching] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    return () => (mounted.current = false);
  }, []);

  useEffect(() => {
    if (!doSearch) {
      return;
    }

    setDoSearch(false);

    if (!mounted.current) {
      console.log('mounted is', mounted.current);
      return;
    }

    console.log(
      '[SearchTable] onSearchBegin. values:',
      values,
      ', pagination:',
      pagination,
      ', filters:',
      filters,
      ', sorter:',
      sorter,
    );
    setSearching(true);
    search({
      values,
      pagination,
      filters,
      sorter,
      extra,
    }).then(
      ({ records, current, pageSize, total }) => {
        setSearching(false);
        if (!mounted.current) {
          console.log('mounted is', mounted.current);
          return;
        }
        // 搜索成功
        // console.log('onSearchSuccess');
        setData({
          records,
          total,
        });
      },
      (msg) => {
        if (!mounted.current) {
          console.log('mounted is', mounted.current);
          return;
        }

        setSearching(false);
        message.error(msg || '查询失败', 2);
      },
    );
  }, [doSearch]);

  onRef &&
    onRef({
      search: (params = {}) => {
        setValues(params.values || values);
        setPagination({
          ...pagination,
          current: params.current || pagination.current,
        });
        setDoSearch(true);
      },
    });

  const pagination2use = (() => {
    if (!paginationShown) {
      return false;
    }
    return {
      ...pagination,
      total: data.total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => {
        const totalPage = Math.ceil(data.total / pagination.pageSize);
        return `共 ${total} 条记录 第 ${pagination.current}/${totalPage} 页`;
      },
      pageSizeOptions: ['5', '10', '20', '30', '40'],
    };
  })();

  const columns2use = (() => {
    if (children) {
      return React.Children.map(children, (child) => {
        if (child.type === Column) {
          return {
            ...child.props,
            key: child.key,
          };
        } else {
          return null;
        }
      }).filter((i) => i);
    }
    return columns;
  })();

  return (
    <Fragment>
      {header ? <div className={styles['header']}>{header}</div> : null}
      <Table
        {...rest}
        rowKey={rowKey}
        columns={columns2use}
        dataSource={data.records}
        loading={searching}
        pagination={pagination2use}
        onChange={(pagination, filters, sorter, extra) => {
          setFilters(filters);
          setSorter(sorter);
          setExtra(extra);
          setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
          });
          setDoSearch(true);
        }}
      />
    </Fragment>
  );
}
