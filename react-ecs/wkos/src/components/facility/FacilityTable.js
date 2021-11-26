import React, {Component} from "react";
import WkosLayout from "../layout/WkosLayout";
import {Button, Space, Table} from "antd";
import {call} from "../../service/ApiService";

class FacilityTable extends Component {

  state = {
    filteredInfo: null,
  };

  constructor(props) {
    super(props);
    this.state = {dataSource: []};
  }

  handleChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  clearFilters = () => {
    this.setState({filteredInfo: null});
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  componentDidMount() {
    call("/facility", "GET", null).then((response) => {
      const dataSource = response.data.map((data) => (
        {
          key: data.id,
          name: data.name,
          category: data.category,
          location: data.location,
          fa_time: data.fa_time,
          phone: data.phone
        }
      ));

      this.setState({dataSource: dataSource});
    });
  }

  render() {
    let {filteredInfo} = this.state;
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        width: 300
      },
      {
        title: '카테고리',
        dataIndex: 'category',
        filters: [
          {
            text: '축구',
            value: '축구',
          },
          {
            text: '야구',
            value: '야구',
          },
          {
            text: '농구',
            value: '농구',
          },
          {
            text: '볼링',
            value: '볼링',
          },
          {
            text: '풋살',
            value: '풋살',
          },
          {
            text: '스크린야구',
            value: '스크린야구',
          },
          {
            text: '스크린골프',
            value: '스크린골프',
          },
          {
            text: '테니스',
            value: '테니스',
          },
        ],
        filteredValue: filteredInfo.category || null,
        onFilter: (value, record) => record.category.indexOf(value) === 0,
        key: 'category',
      },
      {
        title: '위치',
        dataIndex: 'location',
        filters: [
          {
            text: '강서구',
            value: '강서구',
          },
          {
            text: '금정구',
            value: '금정구',
          },
          {
            text: '기장군',
            value: '기장군',
          },
          {
            text: '남구',
            value: '남구',
          },
          {
            text: '동구',
            value: '동구',
          },
          {
            text: '동래구',
            value: '동래구',
          },
          {
            text: '민락수변로',
            value: '민락수변로',
          },
          {
            text: '부산진구',
            value: '부산진구',
          },
          {
            text: '북구',
            value: '북구',
          },
          {
            text: '사상구',
            value: '사상구',
          }, {
            text: '사하구',
            value: '사하구',
          }, {
            text: '서구',
            value: '서구',
          }, {
            text: '수영구',
            value: '수영구',
          },
          {
            text: '연제구',
            value: '연제구',
          },
          {
            text: '영동구',
            value: '영동구',
          },
          {
            text: '중구',
            value: '중구',
          },
          {
            text: '하구',
            value: '하구',
          },
          {
            text: '해운대구',
            value: '해운대구',
          },
        ],
        filteredValue: filteredInfo.location || null,
        onFilter: (value, record) => record.location.indexOf(value) === 0,
        key: 'location',
      },
      {
        title: '운영시간',
        dataIndex: 'fa_time',
        key: 'fa_time',
      },
      {
        title: '전화번호',
        dataIndex: 'phone',
        key: 'phone',
      }
    ];

    const content = (
      <div>
        <Space style={{marginBottom: 16}}>
          <Button onClick={this.clearFilters}>모든 필터 해제하기</Button>
        </Space>
        <Table dataSource={this.state.dataSource} columns={columns} onChange={this.handleChange} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              window.location.href = "/facility/" + record.key;
            }
          }
        }}/>
      </div>
    );

    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'2'}/>
      </div>
    );
  }
}

export default FacilityTable;