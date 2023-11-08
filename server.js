const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.options("*", cors());
app.use(express.json());
app.use(cors());

let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  Authorization: "Basic cmlrQG1hdHRoeXNlbmJ2LmJlOmp1Z2R5cy1rdWNnYXMtenlIeHk0",
  " Content-Type": "application/json",
};

app.get("/", async (req, res) => {
  let reqOptions = {
    url: "https://app.robaws.com/api/v2/clients",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);

  console.log(response.data);
  res.send("Hello World!");
});

app.post("/server", async (req, res) => {
  const data = {
    name: req.body["Voornaam-achternaam"],
    email: req.body["Emailadres"],
    tel: req.body["Telefoonnummer"],
    vatIdNumber: req.body["BTW-nummer"],
    status: "website prospect",
    address: {
      postalCode: req.body["Postcode-gemeente"],
    },
  };

  /* 
{
  {
    "Voornaam-achternaam": "",  name
    "Emailadres": "",           email
    "Telefoonnummer": "",       tel
    "Straat-nr": "",            street number
    "Postcode-gemeente": "",    postcode
    "BTW-nummer": "",           vat number
    "Bericht": "",              report
    "Bestand-uploaden": {}      file upload
}
}


*/

  let reqOptions = {
    url: "https://app.robaws.com/api/v2/clients",
    method: "POST",
    headers: headersList,
    data,
  };

  console.log("before!");
  try {
    let response = await axios.request(reqOptions);
    console.log("after!");
    let reqOptions2 = {
      url: `https://app.robaws.com/api/v2/clients/${response.data.id}/comments`,
      method: "POST",
      headers: headersList,
      data: {
        content: req.body["Bericht"],
      },
    };
    let newreq = await axios.request(reqOptions2);
    return res.status(201).json({
      message: "success",
      response: { ...response.data, ...newreq.data },
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("app listening on port 3000!");
});
