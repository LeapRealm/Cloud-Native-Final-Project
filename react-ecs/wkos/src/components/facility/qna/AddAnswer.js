import {Component} from "react";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {getUserId, getUsername} from "../../Utils";
import {call} from "../../../service/ApiService";

class AddAnswer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      a_userId: getUserId(),
      a_username: getUsername(),
      a_content: "",
      refreshQna: this.props.refreshQna
    };
  }

  onChange = (e) => {
    this.setState({a_content: e.target.value});
  };

  onCancel = () => {
    this.setState({a_content: ""});
  };

  onSubmit = () => {
    if (this.state.a_content === "") {
      return;
    }

    const request = {
      id: this.state.id,
      a_userId: getUserId(),
      a_username: getUsername(),
      a_content: this.state.a_content
    };

    call("/qna/answer", "POST", request).then((response) => {
        this.state.refreshQna();
      }
    );
    this.onCancel();
  };

  render() {
    return (
      <div>
        <TextArea value={this.state.a_content}
                  onChange={this.onChange}
                  placeholder="답글을 입력해주세요"
                  showCount
                  maxLength={1000}
                  autoSize={{minRows: 2, maxRows: 6}}
        />

        <Button type="text" onClick={this.onCancel}>
          취소
        </Button>

        <Button type="link" onClick={this.onSubmit}>
          등록
        </Button>
      </div>
    );
  }
}

export default AddAnswer;