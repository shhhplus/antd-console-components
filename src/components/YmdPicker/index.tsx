import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Select } from 'antd';

interface Value {
  year: number;
  month: number;
  date: number;
}

interface Props {
  value: Value;
  onChange: (value: Value) => void;
}

const now = (() => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  };
})();

const createRange = (from: number, to: number) => {
  const arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  return arr;
};

const createMaxDateOfMonth = (year: number, month: number) => {
  let to = 31;
  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      to = 30;
      break;
    case 2:
      to = year % 4 === 0 ? 28 : 29;
      break;
  }
  return to;
};

export default ({ value, onChange }: Props) => {
  const [value2use, setValue2use] = useState<Value>(now);

  useEffect(() => {
    if (value) {
      setValue2use(value);
    }
  }, [value]);

  const year = useMemo(() => value2use.year, [value2use]);
  const month = useMemo(() => value2use.month, [value2use]);
  const date = useMemo(() => value2use.date, [value2use]);

  const onYearChange = useCallback(
    (year) => {
      const maxDate = createMaxDateOfMonth(year, value2use.month);
      const date = value2use.date > maxDate ? maxDate : value2use.date;
      onChange({
        ...value2use,
        year,
        date,
      });
    },
    [value2use, onChange],
  );

  const onMonthChange = useCallback(
    (month) => {
      const maxDate = createMaxDateOfMonth(value2use.year, month);
      const date = value2use.date > maxDate ? maxDate : value2use.date;
      onChange({
        ...value2use,
        month,
        date,
      });
    },
    [value2use, onChange],
  );

  const onDateChange = useCallback(
    (date) => {
      onChange({
        ...value2use,
        date,
      });
    },
    [value2use, onChange],
  );

  const yearOptions = useMemo(() => {
    return createRange(1949, 2030).reverse();
  }, []);

  const monthOptions = useMemo(() => {
    return createRange(1, 12);
  }, []);

  const dateOptions = useMemo(() => {
    const to = createMaxDateOfMonth(year, month);
    return createRange(1, to);
  }, [year, month]);

  return (
    <span>
      <Select
        value={year}
        onChange={onYearChange}
        style={{
          width: '100px',
        }}
      >
        {yearOptions.map((y) => {
          return (
            <Select.Option value={y} key={y}>
              {y}年
            </Select.Option>
          );
        })}
      </Select>
      <Select
        value={month}
        onChange={onMonthChange}
        style={{
          width: '80px',
        }}
      >
        {monthOptions.map((m) => {
          return (
            <Select.Option value={m} key={m}>
              {m}月
            </Select.Option>
          );
        })}
      </Select>
      <Select
        value={date}
        onChange={onDateChange}
        style={{
          width: '80px',
        }}
      >
        {dateOptions.map((d) => {
          return (
            <Select.Option value={d} key={d}>
              {d}日
            </Select.Option>
          );
        })}
      </Select>
    </span>
  );
};
