import {Component} from "react";
import $ from "jquery";
import {API_BASE_URL} from "../../../config/api-config";
import "./Detail.css"
import {Descriptions} from "antd";

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facilityId: props.facilityId
    };
  }

  componentDidMount() {
    $.ajax({
      url: API_BASE_URL + '/facility/' + this.state.facilityId,
      type: 'GET',
      success: function (res) {
        res = res.data;
        $('.t01').append(res[0].name + '<br>');
        $('.t02').append(res[0].category + '<br>');
        $('.t03').append(res[0].fa_time + '<br>');
        $('.t04').append(res[0].phone + '<br>');
        $('.t05').append(res[0].location + '<br>');
        $('.t06').append(res[0].price + '<br>');
        $('img').attr('src', '/img/' + res[0].image);
      }
    });
  }

  render() {
    return (
      <div className={"detailContainer"}>
        <div className={"detailWrapper"}>
          <div className={"detail"}>
            <img style={{
              marginTop: "3%",
              width: "340px",
              float: "left",
            }} alt={""}/>

            <Descriptions className={"detailTable"} size={"small"} bordered={true} column={1}>
              <Descriptions.Item label="이름"><span className={"t01"}/></Descriptions.Item>
              <Descriptions.Item label="카테고리"><span className={"t02"}/></Descriptions.Item>
              <Descriptions.Item label="운영시간"><span className={"t03"}/></Descriptions.Item>
              <Descriptions.Item label="전화번호"><span className={"t04"}/></Descriptions.Item>
              <Descriptions.Item label="주소"><span className={"t05"}/></Descriptions.Item>
              <Descriptions.Item label="가격"><span className={"t06"}/></Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>

    );
  }
}

export default Detail;