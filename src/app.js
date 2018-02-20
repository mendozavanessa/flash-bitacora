$(document).ready(function() {
  $('.modal').modal(); // inicializa modal
  $('input#input_text, textarea#textarea1').characterCounter(); // inicializa input con contador
  $('.datepicker').pickadate({ // inicializa datapicker
    selectMonths: true, // Creates a dropdown to control month
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  const containerMsg = $('#container-msg');
  const valueTitleMsg = $('#title-msg');
  const valueTextMsg = $('#title-msg');
  const valImg = $('#valueimg');
  const valueTitleImg = $('#title-img');
  const preview = $('.preview-image');
  const valueMedia = $('#id-media');

  // obtiene texto
  let addMsg = () => {
    if (valueTitleMsg.val() !== '' && valueTextMsg.val() !== '') {
      const addMessage = `
      <div class="row">
        <div class="col s12 m6">
          <div class="card deep-orange lighten-5">
            <div class="card-content text-darken-2">
              <span class="card-title">${valueTitleMsg.val()}</span>
              <p>${valueTextMsg.val()}</p>
            </div>
          </div>
        </div>
      </div>
    `;  
      valueTitleMsg.val('');
      valueTextMsg.val('');  
      containerMsg.append(addMessage);
    } else alert('Error: Ingrese un mensaje');
  };

  // obtiene img

  function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var urlImg = event.target.result;
      localStorage.url = urlImg;
      var size = file.size / Math.pow(1024, 2);
      preview.html('<img src=\'' + urlImg + '\' /><br>' + file.name + '<br>' + size.toFixed(2) + 'MB');
    };
    reader.readAsDataURL(file);
  }

  valImg.change(function() {
    // console.log(this.files);
    if (this.files[0].type.match('image.*')) {
      renderImage(this.files[0]);
    } else {
      alert('Error: solo admite archivos jpg, png o gif');
    }
  });

  // agrega a la ventana

  let addImg = () => {
    let imgU = localStorage.url;
    console.log(imgU);
    if (valImg) {
      const addImages = ` 
      <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image">
                <img src="${imgU}">
                <span class="card-title">${valueTitleImg.val()}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      containerMsg.append(addImages);
    }
  };

  let playAudio = (file, type) => {
    let urlAudio = URL.createObjectURL(file);
    console.log(urlAudio  + 'soy una url');
    localStorage.urlAudio = urlAudio;
    localStorage.type = type;
  }

  valueMedia.change(function() {
    let type;
    let fileSelect = this.files[0];
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

  let addMedia = () => {
    let title = $('#title-media');
    let media;
    if (localStorage.urlAudio) {
      if (localStorage.type === 'video') {
      media = ` 
        <div class="row">
        <div class="col s12">
          <div class="card-panel">
            <div class="card-content">
              <p class="title">${title.val()}</p>
            </div>
            <video class="responsive-video" src="${localStorage.urlAudio}" controls></video>
          </div>
        </div>
      </div>
        `;
        containerMsg.append(media);
      }
      if (localStorage.type === 'audio') {
       media = ` 
        <div class="row">
        <div class="col s12">
          <div class="card-panel">
            <div class="card-content">
              <p class="title">${title.val()}</p>
            </div>
            <audio src="${localStorage.urlAudio}" controls></audio>
          </div>
        </div>
      </div>
    `;
    containerMsg.append(media);
      }        

    }
  }
  
  $('#btn-msg').on('click', addMsg);
  $('#btn-img').on('click', addImg);
  $('#id-mp3').on('click', addMedia);
});

var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397,
      lng: 150.644},
    zoom: 17
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}

let addDate = () => {
  let titledate = $('#value-evn');
  let dateVal = $('#date-val');
  if (titledate.val() !== '' && dateVal.val() !== '') {
    let event = `
    <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <div id="map"">
          </div>
        </div>
        <div class="card-content">
          <h4>${titledate.val()}</h4>
          <p>${dateVal.val()}</p>
        </div>
      </div>
    </div>
  </div>
   
  `;
    $('#container-msg').append(event);
  } else {
    alert('todo los campos son requeridos');
  }
};

$('#btn-evn').on('click', addDate);
document.getElementById('btn-evn').addEventListener('click', initMap);
