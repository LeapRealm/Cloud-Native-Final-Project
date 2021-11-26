import {Component} from "react";
import {Comment} from "antd";
import Avatar from "antd/es/avatar/avatar";
import moment from "moment";
import {call} from "../../../service/ApiService";
import {UserOutlined} from "@ant-design/icons";

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      facilityId: props.facilityId,
      q_userId: props.q_userId,
      q_username: props.q_username,
      q_content: props.q_content,
      q_date: props.q_date,
      refreshQna: props.refreshQna
    };
  }

  onDelete = () => {
    call("/qna/question?id=" + this.state.id + "&facilityId=" + this.state.facilityId, "DELETE", null).then((response) => {
        this.state.refreshQna();
      }
    );
  };

  render() {
    const actions = [
      <span onClick={this.onDelete}>삭제</span>
    ];

    return (
      <Comment
        actions={actions}
        author={this.state.q_username}
        avatar={<Avatar size={32} icon={<UserOutlined/>}/>}
        content={
          <p>
            {this.state.q_content}
          </p>
        }
        datetime={
          <span>
            {moment(this.state.q_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
          </span>
        }
      >
        {this.props.children}
      </Comment>
    );
  }
}

export default Question;