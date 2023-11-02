window.Webflow?.push(async () => {
  try {
    // 1. Remove w-form to prevent Webflow from handling it
    const emailForm = document.getElementById("wf-form-Form_Contact");

    console.log("emailForm", emailForm);

    if (emailForm && emailForm.parentElement)
      // 3. Add our own submit handler
      emailForm.onsubmit = async (event) => {
        const formData = new FormData(emailForm);

        // 5. Get the form entries as an object
        const data = Object.fromEntries(formData.entries());
        console.log("Form data", data);

        /*

{
    "Voornaam-achternaam": "Jeneth Ribbon",
    "Emailadres": "ribbon@gmail.com",
    "Telefoonnummer": "234-776-2354",
    "Straat-nr": "headboy street, i gat joy in god",
    "Postcode-gemeente": "213200",
    "BTW-nummer": "VATNGR-233120097",
    "Bericht": "testing",
    "Bestand-uploaden": {},
    "Privacy-policy-geaccepteerd": "on"
}


        */

        //  console.log(event)
        event.preventDefault();

        let reqOptions = {
          headers: {
            " Content-Type": "application/json",
          },
          url: "https://proxy-server-auxj.onrender.com/server",
          method: "POST",
          headers: headersList,
          body: {},
        };

        try {
          let response = await fetch(...reqOptions);
          console.log(response);
        } catch (error) {
          console.log(error);
        }

        return false;
      };
  } catch (e) {
    console.error("error", e);
  }
});
