import {Component} from "react";
import TextArea from "antd/es/input/TextArea";
import {Button, Rate} from "antd";
import {getUserId, getUsername} from "../../Utils";
import {call} from "../../../service/ApiService";

class AddReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facilityId: this.props.facilityId,
      content: "",
      refreshReview: this.props.refreshReview,
      score: 0
    };
  }

  onChange = (e) => {
    this.setState({content: e.target.value});
  };

  onCancel = () => {
    this.setState({content: ""});
    this.setState({score: 0});
  };

  onSubmit = () => {
    if (this.state.content === "" || this.state.score === 0) {
      return;
    }

    const request = {
      facilityId: this.state.facilityId,
      userId: getUserId(),
      username: getUsername(),
      score: this.state.score,
      content: this.state.content
    };

    call("/review", "POST", request).then((response) => {
        this.state.refreshReview();
      }
    );
    this.onCancel();
  };

  onChangeScore = (value) => {
    this.setState({score: value});
  };

  render() {
    const desc = ['최악', '별로', '보통', '좋음', '최고'];

    return (
      <div>
        <span>
          <Rate tooltips={desc} onChange={this.onChangeScore} value={this.state.score}/>
          {this.state.score ? <span className="ant-rate-text">{desc[this.state.score - 1]}</span> : ' 별점을 선택해주세요'}
        </span>
        <TextArea value={this.state.content}
                  onChange={this.onChange}
                  placeholder="이 시설을 이용해보셨나요? 추천할 만한가요? 아쉬운 점은 무엇인가요?"
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

export default AddReview;