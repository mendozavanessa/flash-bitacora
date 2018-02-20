'use strict';

$(document).ready(function () {
  $('.modal').modal(); // inicializa modal
  $('input#input_text, textarea#textarea1').characterCounter(); // inicializa input con contador
  $('.datepicker').pickadate({ // inicializa datapicker
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  var containerMsg = $('#container-msg');
  var valueTitleMsg = $('#title-msg');
  var valueTextMsg = $('#title-msg');
  var valImg = $('#valueimg');
  var valueTitleImg = $('#title-img');
  var preview = $('.preview-image');
  // obtiene texto
  var addMsg = function addMsg() {
    if (valueTitleMsg.val() !== '' && valueTextMsg.val() !== '') {
      var addMessage = '\n      <div class="row">\n        <div class="col s12 m6">\n          <div class="card deep-orange lighten-5">\n            <div class="card-content text-darken-2">\n              <span class="card-title">' + valueTitleMsg.val() + '</span>\n              <p>' + valueTextMsg.val() + '</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
      valueTitleMsg.val('');
      valueTextMsg.val('');
      containerMsg.html(addMessage);
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
    console.log(this.files);
    renderImage(this.files[0]);
  });

  var addImg = function addImg() {
    var imgU = localStorage.url;
    if (valImg) {
      var addImages = ' \n      <div class="row">\n          <div class="col s12 m6">\n            <div class="card">\n              <div class="card-image">\n                <img src="' + imgU + '">\n                <span class="card-title">' + valueTitleImg.val() + '</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      ';
      containerMsg.html(addImages);
    }
  };

  $('#btn-msg').on('click', addMsg);
  $('#btn-img').on('click', renderImage);
});