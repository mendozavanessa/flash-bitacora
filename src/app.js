$(document).ready(function() {
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

  const containerMsg = $('#container-msg');
  const valueTitleMsg = $('#title-msg');
  const valueTextMsg = $('#title-msg');
  const valImg = $('#valueimg');
  const valueTitleImg = $('#title-img');
  const preview = $('.preview-image');
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
      containerMsg.html(addMessage);
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
    console.log(this.files);   
    renderImage(this.files[0]);
  });

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
      containerMsg.html(addImages);
    }
  };

  $('#btn-msg').on('click', addMsg);
  $('#btn-img').on('click', renderImage);
});