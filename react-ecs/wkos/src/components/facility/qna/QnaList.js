import {Component} from "react";
import 'antd/dist/antd.css';
import {call} from "../../../service/ApiService";
import Question from "./Question";
import AddQuestion from "./AddQuestion";
import AddAnswer from "./AddAnswer";
import Answer from "./Answer";

class QnaList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qnaList: [],
      facilityId: props.facilityId,
    };
  }

  refreshQna = () => {
    this.setState({qnaList: []})
    call("/qna?facilityId=" + this.state.facilityId, "GET", null).then((response) => {
        this.setState({qnaList: response.data});
      }
    );
  }

  componentDidMount() {
    this.refreshQna();
  }

  render() {
    return (
      <div style={{margin: "25px"}}>
        <AddQuestion
          facilityId={this.state.facilityId}
          refreshQna={this.refreshQna}
        />
        {this.state.qnaList.map((qna, idx) => (qna.a_content === null
          ?
          <Question
            key={idx}
            id={qna.id}
            facilityId={qna.facilityId}
            q_userId={qna.q_userId}
            q_username={qna.q_username}
            q_content={qna.q_content}
            q_date={qna.q_date}
            refreshQna={this.refreshQna}
          >
            <AddAnswer
              id={qna.id}
              a_userId={qna.a_userId}
              a_username={qna.a_username}
              a_content={qna.a_content}
              refreshQna={this.refreshQna}
            />
          </Question>
          :
          <Question
            key={idx}
            id={qna.id}
            facilityId={qna.facilityId}
            q_userId={qna.q_userId}
            q_username={qna.q_username}
            q_content={qna.q_content}
            q_date={qna.q_date}
            refreshQna={this.refreshQna}
          >
            <Answer
              key={idx}
              id={qna.id}
              a_userId={qna.a_userId}
              a_username={qna.a_username}
              a_content={qna.a_content}
              a_date={qna.a_date}
              refreshQna={this.refreshQna}
            />
          </Question>)
        )}
      </div>
    );
  }
}

export default QnaList;