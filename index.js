const express = require("express");
const axios = require("axios");
const { name } = require("ejs");
const port = 3000;
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (CSS and JS)
app.use(express.static("public"));

// Set the EJS view engine
app.set("view engine", "ejs");

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Render the login page
app.get("/home", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8081/v1/all/12/books";
    const query = req.query.q;

    const option = {
      method: "get",
      url: springBootApiUrl,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.render("index", {
      books: response.data.data,
      showSearchBar: true,
      query: query,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/books", async (req, res) => {
  try {
    const springBootApiUrl1 = "http://localhost:8081/v1/all/category";
    const springBootApiUrl2 = "http://localhost:8081/v1/all/books";
    const springbootApiUrl3 = "http://localhost:8081/v1/search/books?query=";
    const query = req.query.q;

    const options1 = {
      method: "get",
      url: springBootApiUrl1,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    const options2 = {
      method: "get",
      url:
        query == undefined || query == null
          ? springBootApiUrl2
          : springbootApiUrl3 + query,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    const [response1, response2] = await Promise.all([
      axios(options1),
      axios(options2),
    ]);

    res.render("books", {
      category: response1.data.data,
      books: response2.data.data,
      showSearchBar: true,
      query: query,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const springBootApiUrl = "http://localhost:8080/v1/signIn";
    const headers = {
      "Content-Type": "application/json",
      "device-type": "WEB",
    };
    const option = {
      method: "post",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

// sign UP get and post api
app.get("/signup", (req, res) => {
  res.render("signUp");
});
app.post("/signUpApi", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/v1/signup";

    const headers = {
      "Content-Type": "application/json",
    };
    const option = {
      method: "post",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };
    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/loginPage", (req, res) => {
  res.render("login");
});

app.get("/subscription", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/user/planInfo";

    const option = {
      method: "get",
      url: springBootApiUrl,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);

    // Return the Spring Boot response to the frontend
    res.render("subscription", {
      plans: response.data.data,
      showSearchBar: false,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/contactus", (req, res) => {
  res.render("contactUs", { showSearchBar: false });
});

app.get("/bookDetails/:id", async (req, res) => {
  const bookId = req.params.id; // Retrieve the bookId from the URL parameters
  const springBootApiUrl = `http://localhost:8081/v1/book/${bookId}`; // Replace with your Spring Boot API URL

  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.render("book_details", {
      book: response.data.data,
      showSearchBar: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/readBook/:id", async (req, res) => {
  const bookId = req.params.id; // Retrieve the bookId from the URL parameters
  const springBootApiUrl = `http://localhost:8080/v1/book/${bookId}`; // Replace with your Spring Boot API URL

  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };

  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    console.log(response);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/myprofile", async (req, res) => {
  res.render("myprofile", { showSearchBar: false }); // Render the books page (books.ejs)
});

app.get("/download/:cover", async (req, res) => {
  // Retrieve the bookId from the URL parameters
  const cover = req.params.cover;
  const springBootApiUrl = `http://localhost:8081/v1/download/${cover}`; // Replace with your Spring Boot API URL

  try {
    const response = await axios.get(springBootApiUrl, {
      responseType: "arraybuffer", // Receive response as ArrayBuffer
    });

    res.set({
      "Content-Type": "image/jpeg", // Adjust content type based on your image type
      "Content-Length": response.data.length,
    });

    // Send the image data as the response
    res.end(Buffer.from(response.data, "binary"));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/category/:id", async (req, res) => {
  const categoryIds = req.params.id; // Retrieve the bookId from the URL parameters
  var springBootApiUrl =
    "http://localhost:8081/v1/search/books?categoryIds=" + categoryIds; // Replace with your Spring Boot API URL
  const query = req.query.q;
  if (query != undefined || query != null) {
    springBootApiUrl += "&query=" + query;
  }

  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.send({ books: response.data.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.query; // Retrieve the bookId from the URL parameters
  var springBootApiUrl = "http://localhost:8081/v1/search/books?query=" + query; // Replace with your Spring Boot API URL
  const catId = req.query.categoryIds;
  console.log(
    catId == undefined || catId == null
      ? springBootApiUrl
      : springBootApiUrl + "&categoryIds=" + catId
  );
  try {
    const option = {
      method: "get",
      url:
        catId == undefined || catId == null
          ? springBootApiUrl
          : springBootApiUrl + "&categoryIds=" + catId,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.send({ books: response.data.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/createOrder", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/user/create_order";

    const headers = {
      "Content-Type": "application/json",
      "access-token": req.headers["access-token"],
      "device-token": req.headers["device-token"],
      "device-type": req.headers["device-type"],
    };

    // Forward the login request to Spring Boot
    const response = await axios.post(springBootApiUrl, req.body, { headers });

    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/updateOrder", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/user/update_Order";

    const headers = {
      "Content-Type": "application/json",
      "access-token": req.headers["access-token"],
      "device-token": req.headers["device-token"],
      "device-type": req.headers["device-type"],
    };

    const response = await axios.post(springBootApiUrl, req.body, { headers });
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/myprofileLoad", async (req, res) => {
  const springBootApiUrl = "http://localhost:8080/v1/account-info"; // Replace with your Spring Boot API URL

  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.put("/changeInfo", async (req, res) => {
  const springBootApiUrl = "http://localhost:8080/v1/changeInfo";
  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "put",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.put("/changePassword", async (req, res) => {
  const springBootApiUrl = "http://localhost:8080/v1/changePassword";
  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "put",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/transactions", async (req, res) => {
  const springBootApiUrl = "http://localhost:8080/user/transactions"; // Replace with your Spring Boot API URL

  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/user/plan/:isStatus", async (req, res) => {
  const isStatus = req.params.isStatus;
  const springBootApiUrl = "http://localhost:8080/user/plan/" + isStatus; // Replace with your Spring Boot API URL

  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/send-email-code", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/v1/send-email-code";

    const headers = {
      "Content-Type": "application/json",
    };

    const option = {
      method: "post",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);

    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/resetPassword", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/v1/reset-password";

    const headers = {
      "Content-Type": "application/json",
    };

    const option = {
      method: "post",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);

    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.post("/sendMessage", async (req, res) => {
  try {
    // Replace with your Spring Boot API endpoint
    const springBootApiUrl = "http://localhost:8080/v1/getMessages";

    const headers = {
      "Content-Type": "application/json",
    };

    const option = {
      method: "post",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      data: req.body,
    };
    // Forward the login request to Spring Boot
    const response = await axios(option);
    // Return the Spring Boot response to the frontend
    res.json({ data: response.data, status: response.status });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/pdf_view", (req, res) => {
  res.render("pdf_view", { showSearchBar: false });
});

app.get("/pdf/download/:newFilename", async (req, res) => {
  const newFilename = req.params.newFilename;
  const springBootApiUrl = "http://localhost:8081/v1/attachment/" + newFilename; // Replace with your Spring Boot API URL

  const headers = {
    "Content-Type": "application/json",
    "access-token": req.headers["access-token"],
    "device-token": req.headers["device-token"],
    "device-type": req.headers["device-type"],
  };
  try {
    const option = {
      method: "get",
      url: springBootApiUrl,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500; // default
      },
      responseType: "arraybuffer",
    };

    // Forward the login request to Spring Boot
    const response = await axios(option);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Encoding": "utf-8", // Change the encoding here
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
});

app.get("/read/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  res.render("read", { bookId: bookId, showSearchBar: false });
});
