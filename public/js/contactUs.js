document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".site-btn").addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission

     // Get form data
     const name = document.querySelector("input[placeholder='Name']").value.trim();
     const email = document.querySelector("input[placeholder='Email']").value.trim();
     const message = document.querySelector("textarea").value.trim();

     // Check if fields are empty
     if (!name || !email || !message) {
         // Display an error message
         alert("Please fill in all fields.");
         return; // Exit the function without sending the message
     }

     // Form data is not empty, proceed with sending the message
     const formData = {
         name: name,
         email: email,
         message: message
     };;

      // Send POST request to Spring Boot API using Fetch API
        // Send POST request to Spring Boot API using jQuery AJAX
        $.ajax({
            url: `/sendMessage`, // Replace with your Spring Boot API endpoint
            method: "post",
            dataType: "json",
            data: JSON.stringify(formData), // Send form data as JSON string
            contentType: "application/json", // Set content type to JSON
            success: function (data, status, jqXHR) {
                
                $(".site-btn").after("<span class='success-message'>Message Sent Successfully</span>");
                
                // Remove the success message after 2 seconds
                setTimeout(function() {
                    $(".success-message").remove();
                }, 2000);

                // Clear name, email, and message fields after 2 seconds
                setTimeout(function() {
                    $("input[placeholder='Name']").val("");
                    $("input[placeholder='Email']").val("");
                    $("textarea").val("");
                }, 2000);
                
            },
            error: function (jqXHR, status, error) {
                // Handle error response
                console.error("Error sending message:", error);
                // You can perform actions here in case of an error
            }
        });
    });
  });