import {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Payment.css"
import {BackTop, Button, Input} from "antd";
import {call} from "../../../service/ApiService";
import {getUserId, getUsername} from "../../Utils";

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      excludeDates: [],
      facilityId: props.facilityId,
      facility: {},
      selectedDate: "",
      name: "",
      tel: "",
      email: ""
    };
  }

  componentDidMount() {
    call("/facility/" + this.state.facilityId, "GET", null).then((response) => {
      this.setState({facility: response.data[0]});
    });

    call("/reservation?facilityId=" + this.state.facilityId, "GET", null).then((response) => {
      const excludeDates = response.data.map((reservation) => (
        new Date(reservation.reservationDate)
      ));
      this.setState({excludeDates: excludeDates});
    });
  }

  onClickPayment = () => {
    const {IMP} = window;
    IMP.init('imp00000000');

    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: this.state.facility.price,
      name: this.state.facility.name,
      buyer_name: this.state.name,
      buyer_tel: this.state.tel,
      buyer_email: this.state.email
    };
    IMP.request_pay(data, this.callback);
  }

  callback = (response) => {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;

    if (success) {
      const request = {
        id: merchant_uid,
        facilityId: this.state.facilityId,
        facilityName: this.state.facility.name,
        username: this.state.name,
        userId: getUserId(),
        userPhone: this.state.tel,
        email: this.state.email,
        price: this.state.facility.price,
        reservationDate: this.state.selectedDate
      };

      console.log(request);
      call("/reservation", "POST", request).then((response) => {
        alert('결제 성공');
        this.setState({selectedDate: ""});
        call("/reservation?facilityId=" + this.state.facilityId, "GET", null).then((response) => {
          const excludeDates = response.data.map((reservation) => (
            new Date(reservation.reservationDate)
          ));
          this.setState({excludeDates: excludeDates});
        });
      });
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value});
  }

  onChangeTel = (e) => {
    this.setState({tel: e.target.value});
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  onSubmit = (e) => {
    if (this.state.selectedDate === "" || this.state.name === "" || this.state.tel === "" || this.state.email === "") {
      return;
    }
    if (getUsername() == null) {
      alert("권한이 없습니다");
    } else {
      this.onClickPayment();
    }
  }

  onChange = (date) => {
    this.setState({selectedDate: date});
  }

  render() {
    const style = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: 4,
      backgroundColor: '#1088e9',
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
    };

    return (
      <div className={"sticky"}>
        <DatePicker selected={this.state.selectedDate}
                    onChange={this.onChange}
                    excludeDates={this.state.excludeDates}
                    inline/>

        <div className={"inputGroup"}>
          <Input className={"inputTag"} placeholder="이름" value={this.state.name} onChange={this.onChangeName}/>
          <Input className={"inputTag"} placeholder="이메일" value={this.state.email} onChange={this.onChangeEmail}/>
          <Input className={"inputTag"} placeholder="전화번호" value={this.state.tel} onChange={this.onChangeTel}/>
          <Button className={"inputTag"} onClick={this.onSubmit} type="primary" block>
            예약하기
          </Button>
        </div>
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </div>
    );
  }
}

export default Payment;