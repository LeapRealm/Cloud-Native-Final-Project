import {Component} from "react";
import {Comment, Rate} from "antd";
import Avatar from "antd/es/avatar/avatar";
import moment from "moment";
import {call} from "../../../service/ApiService";
import {UserOutlined} from "@ant-design/icons";

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      facilityId: props.facilityId,
      userId: props.userId,
      username: props.username,
      content: props.content,
      score: props.score,
      reviewDate: props.reviewDate,
      refreshReview: props.refreshReview
    };
  }

  onDelete = () => {
    call("/review?id=" + this.state.id + "&facilityId=" + this.state.facilityId, "DELETE", null).then((response) => {
        this.state.refreshReview();
      }
    );
  };

  render() {
    const desc = ['최악', '별로', '보통', '좋음', '최고'];
    const actions = [
      <span onClick={this.onDelete}>삭제</span>
    ];

    return (
      <div>
        <span>
          <Rate disabled defaultValue={this.state.score}/>
          <span className="ant-rate-text">{desc[this.state.score - 1]}</span>
        </span>
        <Comment
          actions={actions}
          author={this.state.username}
          avatar={<Avatar size={32} icon={<UserOutlined/>}/>}
          content={
            <p>
              {this.state.content}
            </p>
          }
          datetime={
            <span>
              {moment(this.state.reviewDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
            </span>
          }
        />
      </div>
    );
  }
}

export default Review;