import React, {Component} from "react";
import WkosLayout from "../layout/WkosLayout";
import $ from "jquery";
import {call} from "../../service/ApiService";
import "./Homepage.css";

class Homepage extends Component {

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, lon = position.coords.longitude;

        $.ajax({
          url: 'https://dapi.kakao.com/v2/local/geo/coord2address.json?x=' + lon + '&y=' + lat,
          type: 'GET',
          headers: {
            'Authorization': 'KakaoAK API_KEY'
          },
          success: function (data) {
            const currentLocation = data.documents[0]['address']['address_name'];
            const strArray = currentLocation.split(" ");
            $("#gridTitle").text("'" + strArray[0] + " " + strArray[1] + " " + strArray[2] + "' 근처에 있는 시설 목록");

            // 전체
            call("/facility?location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number1').append("<p>해당하는 시설이 없습니다.</p>");
                return;
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';

                $('.number1').append(content);
              }
            });

            // 축구
            call("/facility?category=축구&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number2').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number2').append(content);
              }
            });

            // 야구
            call("/facility?category=야구&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number3').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number3').append(content);
              }
            });

            // 농구
            call("/facility?category=농구&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number4').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number4').append(content);
              }
            });

            // 볼링
            call("/facility?category=볼링&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number5').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                '<div class="col">' +
                '<a href="/facility/' + data[i].id + '">' +
                '  <div class="card h-100">' +
                '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                '    <div class="card-body">' +
                '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                '    </div>' +
                '  </div>' +
                '</a>' +
                '</div>';
                $('.number5').append(content);
              }
            });

            // 풋살
            call("/facility?category=풋살&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number6').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number6').append(content);
              }
            });

            // 스크린야구
            call("/facility?category=스크린야구&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number7').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number7').append(content);
              }
            });

            // 스크린골프
            call("/facility?category=스크린골프&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number8').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number8').append(content);
              }
            });

            // 테니스
            call("/facility?category=테니스&location=" + strArray[1], "GET", null).then((response) => {
              const data = response.data;
              if (data.length === 0) {
                $('.number9').append("<p>해당하는 시설이 없습니다.</p>");
              }

              for (let i = 0; i < data.length; i++) {
                const content =
                  '<div class="col">' +
                  '<a href="/facility/' + data[i].id + '">' +
                  '  <div class="card h-100">' +
                  '    <img src="/img/' + data[i].image + '" class="card-img-top" alt="...">' +
                  '    <div class="card-body">' +
                  '    <h5 class="card-title">' + data[i].name + '</h5>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <span style="font-size: 11pt; font-weight: bold; ">' + '시설유형 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].category + '</span>' +
                  // eslint-disable-next-line no-useless-concat
                  '    <p class="card-text" style="font-size: 11pt;">' + '<span style="font-weight:bold; font-size: 11pt">' + '주소 : ' + '</span>' + '<span style="font-size: 11pt">' + data[i].location + '</span>' +
                  '    </div>' +
                  '  </div>' +
                  '</a>' +
                  '</div>';
                $('.number9').append(content);
              }
            });
          },
          error: function (e) {
            console.log("주소 변환을 사용할 수 없어요");
          }
        });
      });
    } else {
      console.log("geolocation을 사용할 수 없어요");
    }
  }

  render() {
    const content = (
      <div>
        <h4 id="gridTitle">정보 조회 중 입니다...</h4>
        <div className="row">
          <div className="col-2">
            <div className="list-group"
                 id="list-tab"
                 role="tablist"
            >
              <a className="list-group-item list-group-item-action active"
                 id="list-1-list"
                 data-bs-toggle="list"
                 href="#list-1"
                 role="tab"
                 aria-controls="list-1">
                <img src={"img/all.png"} alt={""} width={"15px"} height={"15px"}/> 전체
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-2-list"
                 data-bs-toggle="list"
                 href="#list-2"
                 role="tab"
                 aria-controls="list-2">
                <img src={"img/soccer.png"} alt={""} width={"15px"} height={"15px"}/> 축구
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-3-list"
                 data-bs-toggle="list"
                 href="#list-3"
                 role="tab"
                 aria-controls="list-3">
                <img src={"img/baseball.png"} alt={""} width={"15px"} height={"15px"}/> 야구
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-4-list"
                 data-bs-toggle="list"
                 href="#list-4"
                 role="tab"
                 aria-controls="list-4">
                <img src={"img/basketball.png"} alt={""} width={"15px"} height={"15px"}/> 농구
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-5-list"
                 data-bs-toggle="list"
                 href="#list-5"
                 role="tab"
                 aria-controls="list-5">
                <img src={"img/bowling.png"} alt={""} width={"15px"} height={"15px"}/> 볼링
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-6-list"
                 data-bs-toggle="list"
                 href="#list-6"
                 role="tab"
                 aria-controls="list-6">
                <img src={"img/futsal.png"} alt={""} width={"15px"} height={"15px"}/> 풋살
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-7-list"
                 data-bs-toggle="list"
                 href="#list-7"
                 role="tab"
                 aria-controls="list-7">
                <img src={"img/screenbaseball.png"} alt={""} width={"15px"} height={"15px"}/> 스크린 야구
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-8-list"
                 data-bs-toggle="list"
                 href="#list-8"
                 role="tab"
                 aria-controls="list-8">
                <img src={"img/screengolf.png"} alt={""} width={"15px"} height={"15px"}/> 스크린 골프
              </a>
              <a className="list-group-item list-group-item-action"
                 id="list-9-list"
                 data-bs-toggle="list"
                 href="#list-9"
                 role="tab"
                 aria-controls="list-9">
                <img src={"img/tennis.png"} alt={""} width={"15px"} height={"15px"}/> 테니스
              </a>
            </div>
          </div>
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active"
                   id="list-1"
                   role="tabpanel"
                   aria-labelledby="list-1-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number1">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-2"
                   role="tabpanel"
                   aria-labelledby="list-2-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number2">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-3"
                   role="tabpanel"
                   aria-labelledby="list-3-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number3">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-4"
                   role="tabpanel"
                   aria-labelledby="list-4-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number4">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-5"
                   role="tabpanel"
                   aria-labelledby="list-5-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number5">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-6"
                   role="tabpanel"
                   aria-labelledby="list-6-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number6">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-7"
                   role="tabpanel"
                   aria-labelledby="list-7-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number7">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-8"
                   role="tabpanel"
                   aria-labelledby="list-8-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number8">

                </div>
              </div>
              <div className="tab-pane fade"
                   id="list-9"
                   role="tabpanel"
                   aria-labelledby="list-9-list">
                <div className="row row-cols-1 row-cols-md-3 g-4 number9">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'1'}/>
      </div>
    );
  }
}

export default Homepage;