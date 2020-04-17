import React from 'react';

export default () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '200px',
          marginLeft: '-100px',
          textAlign: 'center',
          color: 'red',
        }}
      >
        这是自定义初始化界面
        <div>initializing...</div>
      </div>
    </div>
  );
};
