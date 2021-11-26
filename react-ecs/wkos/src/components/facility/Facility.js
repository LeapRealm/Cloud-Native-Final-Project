import React, {Component} from "react";
import {Col, Row, Tabs} from 'antd';
import './Facility.css';
import 'antd/dist/antd.css';
import QnaList from "./qna/QnaList";
import ReviewList from "./review/ReviewList";
import Payment from "./payment/Payment";
import WkosLayout from "../layout/WkosLayout";
import Detail from "./detail/Detail";

const {TabPane} = Tabs;

class Facility extends Component {

  constructor(props) {
    super(props);
    this.state = {facilityId: props.match.params[0]};
  }

  render() {
    const content = (
      <Row>
        <Col flex={8}><Tabs defaultActiveKey="1">
          <TabPane tab="상세정보" key="1">
            <Detail facilityId={this.state.facilityId}/>
          </TabPane>
          <TabPane tab="질문/답변" key="2">
            <QnaList facilityId={this.state.facilityId}/>
          </TabPane>
          <TabPane tab="후기" key="3">
            <ReviewList facilityId={this.state.facilityId}/>
          </TabPane>
        </Tabs></Col>
        <Col flex={1}>
          <Payment facilityId={this.state.facilityId}/>
        </Col>
      </Row>
    );

    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'2'}/>
      </div>
    );
  }
}

export default Facility;