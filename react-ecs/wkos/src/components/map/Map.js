/* global kakao */

import React, {Component} from "react";
import "./Map.css"
import $ from "jquery";
import {API_BASE_URL} from "../../config/api-config";
import WkosLayout from "../layout/WkosLayout";

class Map extends Component {

  componentDidMount() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.4980239, 127.027572),
      level: 7
    };
    const map = new kakao.maps.Map(container, options);

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

            const btn = document.getElementById('number');
            btn.addEventListener('keydown', function (e) {
              if (e.key === 'Enter') {
                window.open('https://map.kakao.com/?sName=' + strArray + '&eName=' + document.getElementById("number").value)
              }
            });
          }
        });
        const locPosition = new kakao.maps.LatLng(lat, lon);
        displayMarker(locPosition);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(35.239789849432775, 129.0887255155433);
      displayMarker(locPosition);
    }

    function displayMarker(locPosition) {
      map.setCenter(locPosition);
    }

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const markerPosition = new kakao.maps.LatLng();
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    $.ajax({
      url: API_BASE_URL + '/facility',
      type: 'GET',
      success: function (res) {
        res = res.data;
        for (let i = 0; i < res.length; i++) {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(res[i].latitude, res[i].longitude),
            image: markerImage
          });

          const iwContent = '<div class="overlaybox">' +
            // eslint-disable-next-line no-useless-concat
            '    <div class="boxtitle"> <a href="/facility/' + res[i].id + '" target="_blank" style="text-align: center; text-decoration: none; color: inherit; font-weight: bold;"> >> 바로 예약하기 << </a>' + '</div>' +
            '    <div class="first">' +
            '		 <img src="img/' + res[i].image + '" class="img-fluid rounded-start" alt="...">' +
            '        <div class="facilityTitle text">' + res[i].name + '</div>' +
            '    </div>' +
            '    <ul class="ulC">' +
            '        <li class="up">' +
            '            <span class="kategorie">시설유형: </span>' +
            '            <span class="title">' + res[i].category + '</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="kategorie">전화번호: </span>' +
            '            <span class="title">' + res[i].phone + '</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="kategorie">예약금액: </span>' +
            // eslint-disable-next-line no-useless-concat
            '            <span class="title">' + res[i].price + "원" + '</span>' +
            '        </li>' +
            '        <li>' +
            '            <span class="kategorie">주소: </span>' +
            '            <span class="title">' + res[i].location + '</span>' +
            '        </li>' +
            '    </ul>' +
            '</div>';

          const iwRemoveable = true;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            position: marker.getPosition(),
            removable: iwRemoveable
          });

          kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));

          function makeOverListener(map, marker, infowindow) {
            return function () {
              infowindow.open(map, marker);
            };
          }

          kakao.maps.event.addListener(map, 'rightclick', makeOutListener(infowindow));

          function makeOutListener(infowindow) {
            return function () {
              infowindow.close(map, marker);
            };
          }
        }
      }
    });
  }

  render() {
    const content = (
      <div>
        <input type="text" className="roadName" id="number" name="number" placeholder="목적지를 입력하여 길을 찾으세요."/>
        <div className="jumbotron">
          <div className="container text-center">
            <div id="map" style={{width: "100%", height: "550px", margin: "0 auto"}}/>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'3'}/>
      </div>
    );
  }
}

export default Map;