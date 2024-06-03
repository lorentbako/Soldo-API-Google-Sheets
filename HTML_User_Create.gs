<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>

<style>
  .custom-radio-inp {
    display: flex;
    padding: 5px 0px;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #ced4da;
    border-radius: 0.23em;
    margin: 5px 0;
  }

  .custom-radio-label {
    padding-left: 0.7em;
    width: 20%;
  }

  .form-check {
    margin-right: 4rem;
  }

  .form-class {
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

<form onsubmit="createUser(event)" class="form-class" id="new-user-form">
  <label for="user-name-create">First Name:</label>
  <input class="form-control" type="text" id='user-name-create' placeholder="John" name="name" required />
  <label for="user-surname-create">Last Name:</label>
  <input class="form-control" type="text" id='user-surname-create' placeholder="Doe" name="surname" required/>

  <span class="custom-radio-inp">
    <span class='custom-radio-label'>Mobile Access:</span>
  <span class="form-check">
    <input class="form-check-input" type="radio" name="mobile_access" id="open-mobile-access" value=true checked  required>
    <label class="form-check-label" for="open-mobile-access">
      Give Access!
    </label>
    </span>
  <span class="form-check">
      <input class="form-check-input" type="radio" name="mobile_access" id="close-mobile-access" value=false required>
      <label class="form-check-label" for="close-mobile-access">
        No Access!
      </label>
    </span>
  </span>

  <span class="custom-radio-inp">
    <span class='custom-radio-label'>Web Access:</span>
  <span class="form-check">
      <input class="form-check-input" type="radio" name="web_access" id="open-web-access" value=true checked required>
      <label class="form-check-label" for="open-web-access">
        Give Access!
      </label>
    </span>
  <span class="form-check">
      <input class="form-check-input" type="radio" name="web_access" id="close-web-access" value=false required>
      <label class="form-check-label" for="close-web-access">
        No Access!
      </label>
  </span>
  </span>

  <label for="user-email-create">User E-mail:</label>
  <input class="form-control" type="email" id ='user-email-create'placeholder="example@email.com" name="email"/>
  <label for="user-birthday-create">Birthday:</label>
  <input class="form-control" type="date" id ='user-birthday-create' name="dob"/>
  <label for="phone" style="margin-top: 1rem">Mobile Number:</label>
  <!-- https://www.twilio.com/blog/international-phone-number-input-html-javascript -->
  <input id="phone" type="tel" name="mobile" />
  <br>
  <label for="user-job-create">Job Title:</label>
  <input class="form-control" type="text" id ='user-job-create'placeholder="Job Title" name="job_title"/>
  <button type="submit" class="btn btn-outline-info" style="width: 25%; margin: 10px auto;">Create</button>
</form>
<button  onclick="showCreateAnotherUser()" type="button" class="btn btn-outline-info" style="display:none" id="another-user-button" >Create Another User</button>
<p id="new-user-status"></p>
<script>
  const phoneInputField = document.querySelector("#phone");
  const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  const newUserForm = $("#new-user-form")
  const newUserStatus = $("#new-user-status")
  const anotherUserButton = $("#another-user-button")

  function showCreateAnotherUser(){
    newUserForm.show()
    newUserStatus.hide()
  }

  function createUser(event){
    event.preventDefault();
    newUserForm.hide()
    newUserStatus.text("Creating User...")
    const country = phoneInput.getSelectedCountryData()
    const mobile_prefix = `+${country.dialCode}`

    // Create a FormData object from the form
    const formData = new FormData(event.target);
    let payload = {mobile_prefix}
    for(const input of formData.entries()){
      payload[input[0]] = input[1]
    }
    console.log(payload)
    // return
    google.script.run.withSuccessHandler(newUserStatusFunc).createNewUser(payload)


    function newUserStatusFunc(status){
      console.log(status)
      let orderId = status.id;
      let orderStatus = status.status
      const validOrderStatus = ['PENDING','PLACED']
      newUserStatus.text(`Order status: ${orderStatus}...`)

      google.script.run.withSuccessHandler(newUserOrderStatus).userOrder(orderId)

      function newUserOrderStatus(orderStatusContinued){
        const [newOrderStatus, newUserId] = orderStatusContinued;
        if(newOrderStatus === "COMPLETED"){
          newUserStatus.text(`New User with ID: ${newOrderStatus} was created.`)
          populateDropdown()
        }
        if(newOrderStatus in validOrderStatus){
          setTimeout(()=>{
            google.script.run.withSuccessHandler(newUserOrderStatus).userOrder(orderId)
            }
          ,3000)
        }else{
          newUserStatus.text(`User order creating was finished with Status: ${newOrderStatus}!`)
        }
      }
      anotherUserButton.show()
    }
  }
</script>
