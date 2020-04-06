import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, array } from '@storybook/addon-knobs/react';
import { Row, Col, Card } from 'antd';
import FieldInfo from '../components/FieldInfo';
import Ellipsis from '../components/Ellipsis';

const { FieldInfoList } = FieldInfo;

storiesOf('FieldInfo', module)
  // .addDecorator(withKnobs)
  .add('单个使用', () => {
    // text('labelWidth', '姓名');
    // text('value', '汤姆克鲁斯');
    // number('labelWidth', 80);
    // number('marginBottom', 10);

    const labelWidth = 60;
    const marginBottom = 10;
    return (
      <Card>
        <FieldInfo
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label="姓名"
          value="汤姆克鲁斯"
        />
        <FieldInfo
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label="国籍"
          value="美国"
        />
        <FieldInfo
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label="学校"
          value=""
        />
        <FieldInfo
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label="性别"
          value="男"
        />
        <FieldInfo
          labelWidth={labelWidth}
          marginBottom={marginBottom}
          label="代表作品"
          value="碟中谍系列、壮志凌云"
        />
      </Card>
    );
  })
  .add('列表使用', () => {
    // array('infos', ['列表，格式见demo代码']);
    // number('labelWidth', 60);
    // number('marginBottom', 10);

    const infos = [
      {
        label: '城市',
        value: '上海',
      },
      {
        label: '所属国家',
        value: '中国',
      },
      {
        label: '位置',
        value: '华东',
      },
    ];

    return (
      <Card>
        <FieldInfoList labelWidth={100} marginBottom={5} infos={infos} />
      </Card>
    );
  })
  .add('网格使用', () => {
    const labelWidth = 60;
    const marginBottom = 10;
    return (
      <Card>
        <Row style={{ marginBottom }}>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="姓名"
              value="汤姆克鲁斯"
            />
          </Col>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="国籍"
              value="美国"
            />
          </Col>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="性别"
              value="男"
            />
          </Col>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="代表作品"
              value="碟中谍系列、壮志凌云"
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="城市"
              value="上海"
            />
          </Col>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="所属国家"
              value="中国"
            />
          </Col>
          <Col span={6}>
            <FieldInfo
              labelWidth={labelWidth}
              marginBottom={0}
              label="位置"
              value="华东"
            />
          </Col>
        </Row>
      </Card>
    );
  })
  .add('超出显示省略号', () => {
    const labelWidth = 60;
    return (
      <div style={{ width: '300px' }}>
        <Card>
          <FieldInfo
            labelWidth={labelWidth}
            label="个人介绍"
            value={
              <Ellipsis tooltip={true}>
                汤姆·克鲁斯，1962年7月3日出生于美国纽约，演员、制片人。1981年，出演剧情片《熄灯号》，从而出道。1984年，凭借主演的喜剧片《乖仔也疯狂》获得第41届美国金球奖音乐喜剧类最佳男主角提名。
              </Ellipsis>
            }
          />
        </Card>
      </div>
    );
  });
