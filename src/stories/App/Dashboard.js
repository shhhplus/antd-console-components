import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import PageLayout from '../../components/PageLayout';
import FieldInfo from '../../components/FieldInfo';
import Section from '../../components/Section';
import Spreader from '../../components/Spreader';

const labelWidth = 60;
const marginBottom = 10;

export default () => {
  return (
    <PageLayout header={<PageHeader title="主面板" />}>
      <div style={{ marginBottom: '20px' }}>
        <Spreader title="基本信息">
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
        </Spreader>
      </div>

      <Section title="我的待办" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>todo 1</div>
        <div style={{ padding: '0 0 60px 0' }}>todo 2</div>
        <div style={{ padding: '0 0 60px 0' }}>todo 3</div>
      </Section>

      <Section title="通知" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>notification 1</div>
        <div style={{ padding: '0 0 60px 0' }}>notification 2</div>
        <div style={{ padding: '0 0 60px 0' }}>notification 3</div>
      </Section>
    </PageLayout>
  );
};
