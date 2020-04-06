import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import Ellipsis from '../components/Ellipsis';

const Demo = ({ children }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        width: '200px',
        margin: '120px 0 0 100px',
      }}
    >
      {children}
    </div>
  );
};

storiesOf('Ellipsis', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <Ellipsis>
          如果实现单行文本的溢出显示省略号同学们应该都知道用text-overflow:ellipsis属性来，当然还需要加宽度width属来兼容部分浏览。
        </Ellipsis>
      </Demo>
    );
  })
  .add('带tooltip', () => {
    return (
      <Demo>
        <Ellipsis tooltip={true} placement="top">
          如果实现单行文本的溢出显示省略号同学们应该都知道用text-overflow:ellipsis属性来，当然还需要加宽度width属来兼容部分浏览。
        </Ellipsis>
      </Demo>
    );
  });
