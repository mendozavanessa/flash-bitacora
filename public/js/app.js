'use strict';

$(document).ready(function () {
  $('.modal').modal(); // inicializa modal
  $('input#input_text, textarea#textarea1').characterCounter(); // inicializa input con contador
  $('.datepicker').pickadate({ // inicializa datapicker
    selectMonths: true, // Creates a dropdown to control month
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  var containerMsg = $('#container-msg');
  var valueTitleMsg = $('#title-msg');
  var valueTextMsg = $('#title-msg');
  var valImg = $('#valueimg');
  var valueTitleImg = $('#title-img');
  var preview = $('.preview-image');
  var valueMedia = $('#id-media');

  // obtiene texto
  var addMsg = function addMsg() {
    if (valueTitleMsg.val() !== '' && valueTextMsg.val() !== '') {
      var addMessage = '\n      <div class="row">\n        <div class="col s12 m6">\n          <div class="card deep-orange lighten-5">\n            <div class="card-content text-darken-2">\n              <span class="card-title">' + valueTitleMsg.val() + '</span>\n              <p>' + valueTextMsg.val() + '</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
      valueTitleMsg.val('');
      valueTextMsg.val('');
      containerMsg.append(addMessage);
    } else alert('Error: Ingrese un mensaje');
  };

  // obtiene img

  function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var urlImg = event.target.result;
      localStorage.url = urlImg;
      var size = file.size / Math.pow(1024, 2);
      preview.html('<img src=\'' + urlImg + '\' /><br>' + file.name + '<br>' + size.toFixed(2) + 'MB');
    };
    reader.readAsDataURL(file);
  }

  valImg.change(function () {
    // console.log(this.files);
    if (this.files[0].type.match('image.*')) {
      renderImage(this.files[0]);
    } else {
      alert('Error: solo admite archivos jpg, png o gif');
    }
  });

  // agrega a la ventana

  var addImg = function addImg() {
    var imgU = localStorage.url;
    console.log(imgU);
    if (valImg) {
      var addImages = ' \n      <div class="row">\n          <div class="col s12 m6">\n            <div class="card">\n              <div class="card-image">\n                <img src="' + imgU + '">\n                <span class="card-title">' + valueTitleImg.val() + '</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      ';
      containerMsg.append(addImages);
    }
  };

  var playAudio = function playAudio(file, type) {
    var urlAudio = URL.createObjectURL(file);
    console.log(urlAudio + 'soy una url');
    localStorage.urlAudio = urlAudio;
    localStorage.type = type;
  };

  valueMedia.change(function () {
    var type = void 0;
    var fileSelect = this.files[0];
    if (fileSelect.type.match('audio.*')) {
      type = 'audio';
      playAudio(fileSelect, type);
    } else if (fileSelect.type.match('video.*')) {
      type = 'video';
      playAudio(fileSelect, type);
    } else {
      alert('Error: Solo admite audio o video');
    }
  });

  var addMedia = function addMedia() {
    var title = $('#title-media');
    var media = void 0;
    if (localStorage.urlAudio) {
      if (localStorage.type === 'video') {
        media = ' \n        <div class="row">\n        <div class="col s12">\n          <div class="card-panel">\n            <div class="card-content">\n              <p class="title">' + title.val() + '</p>\n            </div>\n            <video class="responsive-video" src="' + localStorage.urlAudio + '" controls></video>\n          </div>\n        </div>\n      </div>\n        ';
        containerMsg.append(media);
      }
      if (localStorage.type === 'audio') {
        media = ' \n        <div class="row">\n        <div class="col s12">\n          <div class="card-panel">\n            <div class="card-content">\n              <p class="title">' + title.val() + '</p>\n            </div>\n            <audio src="' + localStorage.urlAudio + '" controls></audio>\n          </div>\n        </div>\n      </div>\n    ';
        containerMsg.append(media);
      }
    }
  };

  $('#btn-msg').on('click', addMsg);
  $('#btn-img').on('click', addImg);
  $('#id-mp3').on('click', addMedia);
});

var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397,
      lng: 150.644 },
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

var addDate = function addDate() {
  var titledate = $('#value-evn');
  var dateVal = $('#date-val');
  if (titledate.val() !== '' && dateVal.val() !== '') {
    var event = '\n    <div class="row">\n    <div class="col s12 m6">\n      <div class="card">\n        <div class="card-image">\n          <div id="map"">\n          </div>\n        </div>\n        <div class="card-content">\n          <h4>' + titledate.val() + '</h4>\n          <p>' + dateVal.val() + '</p>\n        </div>\n      </div>\n    </div>\n  </div>\n   \n  ';
    $('#container-msg').append(event);
  } else {
    alert('todo los campos son requeridos');
  }
};

$('#btn-evn').on('click', addDate);
document.getElementById('btn-evn').addEventListener('click', initMap);