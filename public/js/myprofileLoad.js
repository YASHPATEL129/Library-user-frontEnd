function loadMyProfileData() {
    const accessToken = sessionStorage.getItem('accessToken');
    const deviceToken = sessionStorage.getItem('deviceToken');
    const deviceType = sessionStorage.getItem('deviceType');

    const headers = {
      // 'Content-Type': 'application/json',
    "access-token": accessToken,
    "device-type": deviceType,
    "device-token": deviceToken
  };


    // Make an AJAX request to the /myprofileLoad endpoint
    $.ajax({
        url: '/myprofileLoad', // Assuming this is the route in your Node.js application
        type: 'GET',
        headers: headers,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: "json",
        success: function (data, status, jqXHR) {
            // Handle the successful response here
            console.log(data);
        }
    });
}

