function updatePhotoDate(rover) {
    const startDate = getStartDate(rover);
    document.getElementById('datePicker').value = startDate;
  }
  
  function getStartDate(rover) {
    // Define mission start dates for each rover
    const startDateMap = {
      curiosity: '2012-08-06',
      opportunity: '2004-01-25',
      spirit: '2004-01-04'
    };
    return startDateMap[rover];
  }
  
  function clearErrors() {
    $('#error').empty();
  }
  
  function getPhotos() {
    const rover = $('input[name="rover"]:checked').val();
    const date = $('#datePicker').val();
  
    if (!rover) {
      $('#error').text('Please select a rover.');
      return;
    }
  
    if (!date) {
      $('#error').text('Please select a date.');
      return;
    }
  
    // Make AJAX call to NASA API
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${apiKey}`;
  
    $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(response) {
        displayPhotos(response.photos);
      },
      error: function() {
        $('#error').text('Error fetching photos.');
      }
    });
  }
  
  function displayPhotos(photos) {
    const container = $('#photos');
    container.empty();
  
    if (photos.length === 0) {
      container.text('No photos found for this date.');
      return;
    }
  
    photos.slice(0, 25).forEach(photo => {
      const thumbnail = $('<img>', {
        class: 'thumbnail',
        src: photo.img_src,
        alt: 'Mars Rover Photo',
        title: photo.camera.full_name,
        click: function() {
          window.open(photo.img_src, '_blank');
        }
      });
      container.append(thumbnail);
    });
  
    container.append(`<p>${photos.length} photos found for this date.</p>`);
  }