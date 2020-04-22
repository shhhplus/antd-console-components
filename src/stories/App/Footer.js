import React from 'react';
import { useUser } from 'components/user';

export default () => {
  const user = useUser();

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      这里是自定义的footer。当前用户：${user.data && user.data.name}
    </div>
  );
};
