import {Component} from "react";
import 'antd/dist/antd.css';
import {call} from "../../../service/ApiService";
import AddReview from "./AddReview";
import Review from "./Review";

class ReviewList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      facilityId: props.facilityId
    };
  }

  refreshReview = () => {
    this.setState({reviewList: []});
    call("/review?facilityId=" + this.state.facilityId, "GET", null).then((response) => {
        this.setState({reviewList: response.data});
      }
    );
  }

  componentDidMount() {
    this.refreshReview();
  }

  render() {
    return (
      <div style={{margin: "25px"}}>
        <AddReview
          facilityId={this.state.facilityId}
          refreshReview={this.refreshReview}
        />
        {this.state.reviewList.map((review, idx) =>
          <Review
            key={idx}
            id={review.id}
            facilityId={review.facilityId}
            userId={review.userId}
            username={review.username}
            content={review.content}
            score={review.score}
            reviewDate={review.reviewDate}
            refreshReview={this.refreshReview}
          />
        )}
      </div>
    );
  }
}

export default ReviewList;