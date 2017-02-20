$(document).ready(function() {

  // process the form

  $( 'form' ).submit(function( event ) {
    // var formData = $( this ).serializeArray();

      // get the form data
    var formData = {
      link: $('input[name=URLField]').val()
    };

    console.log('formData');
    console.log(formData);

    // process the form
    $.ajax({
      method: 'POST',
      url: '/data',
      data: JSON.stringify(formData),
      dataType: 'json',
      contentType: 'application/json',

      success: function(dataFromServer) {

        // log data to the console so we can see
        console.log('Data received:');
        console.log(JSON.stringify(dataFromServer));
        console.log(JSON.stringify(dataFromServer.link));

        // Inject URL into modal and then show it
        document.getElementById('dataFromServer').innerHTML = dataFromServer.link;
        $('#successmodal').modal('show');

      },


      error: function(jqXhr, textStatus, errorThrown) {
        // log error to console
        console.log(errorThrown);

        // Show failure message
        $('#failuremodal').modal();
      }
    });

    event.preventDefault();
  });
});
