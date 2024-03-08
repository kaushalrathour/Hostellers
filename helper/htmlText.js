module.exports.getWelcomeText = (username) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Hostellers</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
    }

    .container {
      max-width: 600px;
    }

    .welcome-text {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
    }

    .lead-text {
      font-size: 18px;
      color: #495057;
    }

    .btn-primary {
      background-color: #007bff;
      border: none;
      padding: 10px 20px;
      margin-top: 20px;
      color: #fff;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary:hover {
      color: white;
      background-color: #080707;
    }
  </style>
</head>

<body>
  <div class="container mt-5 text-center">
    <h2 class="welcome-text mt-4">Welcome to Hostellers, ${username}!</h2>
    <p class="lead-text mt-3">We're thrilled to have you on board. Get ready to explore and find your ideal hostel with Hostellers.</p>
    <p class="lead-text">Simplify your search for the perfect student accommodation near your college or university.</p>
    <a href="https://hostellers.onrender.com" class="btn-primary">Explore Listings</a>
  </div>
</body>
</html>`;
};

module.exports.getContactText = (name, message, email) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Message from Hostellers</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      margin-top: 50px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .contact-heading {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-top: 0;
    }

    .contact-info {
      font-size: 18px;
      color: #495057;
      margin-bottom: 10px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2 class="contact-heading">New Contact Message from Hostellers</h2>
    <p class="contact-info">Name: ${name}</p>
    <p class="contact-info">Email: ${email}</p>
    <p class="contact-info">Message: ${message}</p>
  </div>
</body>
</html>`;
};
