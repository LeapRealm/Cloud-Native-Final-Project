import React, {Component} from "react";
import WkosLayout from "../layout/WkosLayout";
import {call} from "../../service/ApiService";
import {Button, Table} from "antd";
import moment from "moment";

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      loading: false
    };
  }

  start = () => {
    this.setState({loading: true});
    this.state.selectedRowKeys.map((key) => (
      call("/reservation?id=" + key, "DELETE", null).then((response) => {
        this.refreshReservation();
      })
    ));

    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  refreshReservation = () => {
    call("/reservation/user", "GET", null).then((response) => {
      const dataSource = response.data.map((data) => (
        {
          key: data.id,
          id: data.id,
          facilityId: data.facilityId,
          facilityName: data.facilityName,
          username: data.username,
          price: data.price,
          email: data.email,
          reservationDate: moment(data.reservationDate).format("YYYY년 MM월 DD일"),
          userPhone: data.userPhone
        }
      ));

      this.setState({dataSource: dataSource});
    });
  };

  componentDidMount() {
    this.refreshReservation();
  }

  render() {
    const {loading, selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
      {
        title: '예약번호',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '시설이름',
        dataIndex: 'facilityName',
        key: 'facilityName',
        width: 300
      },
      {
        title: '가격',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '예약일',
        dataIndex: 'reservationDate',
        key: 'reservationDate',
      },
      {
        title: '예약자 이름',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '전화번호',
        dataIndex: 'userPhone',
        key: 'userPhone',
      }
    ];

    const content = (
      <div>
        <div style={{marginBottom: 16}}>
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            예약취소 신청하기
          </Button>
          <span style={{marginLeft: 8}}>
            {hasSelected ? `${selectedRowKeys.length}개의 예약이 선택되었습니다` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource}/>
      </div>
    );

    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'4'}/>
      </div>
    );
  }
}

export default Mypage;