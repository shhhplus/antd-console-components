import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import Timer from '../components/Timer';
import RouteTabs from '../components/RouteTabs';

const parentPath = '/parent';

const Country = ({ name, onIncrease }) => {
  const onIncreaseRef = useRef();

  useEffect(() => {
    onIncreaseRef.current = onIncrease;
  }, [onIncrease]);

  useEffect(() => {
    console.log(`${name} mounted`);

    return () => {
      console.log(`${name} unmounted`);
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>this is {name} component</div>

      <Button type="primary" onClick={onIncreaseRef.current}>
        数量改变
      </Button>
    </div>
  );
};

const StandardDemo = () => {
  const [now, setNow] = useState(Date.now());
  const [tabs, setTabs] = useState([]);
  const [counts, setCounts] = useState({});
  const onIncreaseRef = useRef();

  useEffect(() => {
    onIncreaseRef.current = (name) => {
      const curCount = counts[name] || 0;
      setCounts({
        ...counts,
        [name]: curCount + 1,
      });
    };
  }, [counts]);

  const createCom = useCallback((name) => {
    const Com = () => {
      return (
        <Country
          name={name}
          onIncrease={() => {
            if (onIncreaseRef.current) {
              onIncreaseRef.current(name);
            }
          }}
        />
      );
    };
    Com.displayName = `${name}`;

    return Com;
  }, []);

  const China = useMemo(() => {
    return createCom('china');
  }, [createCom]);

  const Japan = useMemo(() => {
    return createCom('japan');
  }, [createCom]);

  const Korea = useMemo(() => {
    return createCom('korea');
  }, [createCom]);

  useEffect(() => {
    setTabs([
      {
        title: '中国',
        path: 'china',
        component: China,
      },
      {
        title: '日本',
        path: 'japan',
        component: Japan,
      },
      {
        title: '韩国',
        path: 'korea',
        component: Korea,
      },
    ]);
  }, [China, Japan, Korea]);

  const tabs2use = useMemo(() => {
    return tabs.map((t) => {
      return {
        ...t,
        title: `${t.title}(${counts[t.path] || 0})`,
      };
    });
  }, [tabs, counts]);

  return (
    <Router>
      <Timer
        interval={1000}
        onElapsed={() => {
          setNow(Date.now());
        }}
      />
      <div
        style={{
          background: '#F6F9FC',
          padding: '20px',
        }}
      >
        <Link to={parentPath}>
          <Button type="primary">
            打开新标签页测试。可在浏览器地址输入栏查看路由的变化
          </Button>
        </Link>
      </div>
      <div style={{ padding: '20px' }}>
        <div>为了避免循环渲染，请确保component不变。</div>
        <div
          style={{
            padding: '10px 0 0 0',
          }}
        >
          now:{now}
        </div>
      </div>
      <Switch>
        <Route path={parentPath}>
          <Card>
            <RouteTabs tabs={tabs2use} />
          </Card>
        </Route>
      </Switch>
    </Router>
  );
};

storiesOf('RouteTabs', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo);
