document.addEventListener('DOMContentLoaded', () => {
    const signUp = document.getElementById('singUp-form');

    signUp.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.querySelector('#firstName').value;
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#email').value;
        const contact = document.querySelector('#contact').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;

        if (password !== confirmPassword) {
            toastr.error("Passwords do not match.");
            return; // Stop further execution
        }

        // Create a data object with the form data
        const requestBody = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            contact:contact,
            password:password,
            confirmPassword:confirmPassword
        };


            try {
            // Make an API call to your Node.js backend, which will proxy the request to the Spring Boot API
            $.ajax({
                type: "POST",
                url: '/signUpApi',
                data: JSON.stringify(requestBody),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
                    console.log(data.data.message);
                    if(data.data.error === 'EMAIL_FAILED'){
                        toastr.error(data.data.message);
                    }
                    if(data.data.error === 'PASSWORD_WEAK'){
                        toastr.error(data.data.message);
                    }
                    if (status) {
                        toastr.success("Successfully sign up");

                        window.location.href = '/loginPage';
                        
                    } else {
                        alert('Failed to create accountant: ' + response.message);
                    }
                },
             });
            }
            catch (error) {
                        console.error(error);
            }
    });
});
