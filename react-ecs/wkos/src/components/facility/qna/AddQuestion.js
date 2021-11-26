import {Component} from "react";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
import {getUserId, getUsername} from "../../Utils";
import {call} from "../../../service/ApiService";

class AddQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facilityId: this.props.facilityId,
      q_content: "",
      refreshQna: this.props.refreshQna
    };
  }

  onChange = (e) => {
    this.setState({q_content: e.target.value});
  };

  onCancel = () => {
    this.setState({q_content: ""});
  };

  onSubmit = () => {
    if (this.state.q_content === "") {
      return;
    }

    const request = {
      facilityId: this.state.facilityId,
      q_userId: getUserId(),
      q_username: getUsername(),
      q_content: this.state.q_content
    };

    call("/qna/question", "POST", request).then((response) => {
        this.state.refreshQna();
      }
    );
    this.onCancel();
  };

  render() {
    return (
      <div>
        <TextArea value={this.state.q_content}
                  onChange={this.onChange}
                  placeholder="이 시설에 대해 궁금한 점이 있나요?"
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

export default AddQuestion;