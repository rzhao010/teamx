$(document).ready(function() {

  $('form').submit(function(event) {

    // hide form and show the image and spinner
    $('#form').hide();
    // show the image
    $('#img').attr('src', $('input[name=URLField]').val());
    $('#img').show();
    $('.loader').show();

    // get the form data
    var formData = {
      link: $('input[name=URLField]').val()
    };

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

        // hide the loader
        $('.loader').hide();

        // show the table
        $('.table').show();

        // extract the array of classes and scores from the data we got
        var classesScores = dataFromServer.images[0].classifiers[0].classes;
        console.log('classesScores:');
        console.log(classesScores);

        // loop through the array and extract classes and scores
        for (var i = 0; i < classesScores.length; i++) {
          var obj = classesScores[i];
          for (var key in obj) {
            var value = obj[key];
            console.log(key + ': ' + value);
            if (key === 'class') {
              var classToDisplay = value;
            }
            if (key === 'score') {
              var scoreToDisplay = value;
            }
          }
          // append resulting info to the table
          var newRow = '<tr><td>' + classToDisplay + '</td><td>' + scoreToDisplay + '</td><td></tr>';
          $('table tbody').append(newRow);
        }

        /*
        for (var key in dataFromServer) {
          if (classesScores.hasOwnProperty(key)) {
            var val = classesScores[key];
            console.log(key + ' ' + val);
          }
        }
        */

      },


      error: function(jqXhr, textStatus, errorThrown) {
        // log error to console
        console.log('error');
        console.log(errorThrown);

        // Show failure message
      }
    });

    event.preventDefault();
  });
});
