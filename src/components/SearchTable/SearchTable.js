import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
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
  const mountedRef = useRef(true);
  const filtersRef = useRef({});
  const sorterRef = useRef({});
  const extraRef = useRef({});
  const searchRef = useRef(null);
  const [begin, setBegin] = useState(false);

  const [searching, setSearching] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
  });

  const [data, setData] = useState({
    records: [],
    total: 0,
  });

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    return () => (mountedRef.current = false);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      console.log('mounted is', mountedRef.current);
      return;
    }

    if (!searchRef.current) {
      console.log('searchRef.current is', searchRef.current);
      return;
    }

    if (!begin) {
      return;
    }

    if (searching) {
      return;
    }

    setSearching(true);

    const params = {
      pagination,
      filters: filtersRef.current,
      sorter: sorterRef.current,
      extra: extraRef.current,
    };
    console.log('[SearchTable] onSearchBegin. params:', params);

    searchRef
      .current(params)
      .then(
        ({ records, current, pageSize, total }) => {
          if (mountedRef.current) {
            // 搜索成功
            // console.log('onSearchSuccess');
            setData({
              records,
              total,
            });
          } else {
            console.log('mounted is', mountedRef.current);
          }
        },
        (msg) => {
          if (mountedRef.current) {
            message.error(msg || '查询失败', 2);
          } else {
            console.log('mounted is', mountedRef.current);
          }
        },
      )
      .finally(() => {
        setBegin(false);
        setSearching(false);
      });
  }, [searching, pagination]);

  useEffect(() => {
    if (!onRef) {
      return;
    }
    onRef({
      search: (params = {}) => {
        setPagination({
          ...pagination,
          current: params.current || pagination.current,
        });
        let b = begin;
        setBegin(true);
      },
    });
  }, [onRef, pagination, begin]);

  const pagination2use = useMemo(() => {
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
  }, [paginationShown, pagination, data]);

  const columns2use = useMemo(() => {
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
    } else {
      return columns;
    }
  }, [children, columns]);

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
          filtersRef.current = filters;
          sorterRef.current = sorter;
          extraRef.current = extra;
          setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
          });
          setBegin(true);
        }}
      />
    </Fragment>
  );
}
