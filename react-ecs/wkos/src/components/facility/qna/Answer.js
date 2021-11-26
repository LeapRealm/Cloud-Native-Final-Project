import {Component} from "react";
import {Comment} from "antd";
import Avatar from "antd/es/avatar/avatar";
import moment from "moment";
import {call} from "../../../service/ApiService";
import {UserOutlined} from "@ant-design/icons";

class Answer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      a_userId: props.a_userId,
      a_username: props.a_username,
      a_content: props.a_content,
      a_date: props.a_date,
      refreshQna: props.refreshQna
    };
  }

  onDelete = () => {
    call("/qna/answer/" + this.state.id, "DELETE", null).then((response) => {
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
        author={this.state.a_username}
        avatar={<Avatar size={32} icon={<UserOutlined/>}/>}
        content={
          <p>
            {this.state.a_content}
          </p>
        }
        datetime={
          <span>
            {moment(this.state.a_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
          </span>
        }
      />
    );
  }
}

export default Answer;