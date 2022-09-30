let encryptionRule = {
    'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
    'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
    'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
    'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
    'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
    'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
    'Y': 'L', 'Z': 'M',
    'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
    'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
    'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
    'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
    'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
    'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
    'y': 'l', 'z': 'm',
    '0': '5', '1': '6', '2': '7', '3': '8',
    '4': '9', '5': '0', '6': '1', '7': '2',
    '8': '3', '9': '4',
    '!': '#', '$': '%', '&': '+', '-': '@',
    '_': '~', '#': '!', '%': '$', '+': '&',
    '@': '-', '~': '_'
  }
  
  const encrypt = (inputPassword) => {
      let encryptedPassword = ''
      for(char of inputPassword) {
          encryptedPassword = encryptedPassword + encryptionRule[char]
      }
      return encryptedPassword
  }
  
  const decrypt = (encryptedPassword) => {
      let actualPassword = ''
      let keys = Object.keys(encryptionRule)
      let values = Object.values(encryptionRule)
      for(char of encryptedPassword) {
          let requiredIndex = values.findIndex(value => value === char)
          actualPassword = actualPassword + keys[requiredIndex]
      }
      return actualPassword
  }
  
  const DB_USERS = []
  
  const resetSignupFields = () => {
      document.getElementById('signup-first-name').value = ''
      document.getElementById('signup-last-name').value = ''
      document.getElementById('signup-phone').value = ''
      document.getElementById('signup-email').value = ''
      document.getElementById('signup-password').value = ''
      document.getElementById('signup-confirm-password').value = ''
      document.getElementById('tnC').checked = false
  }
  
  const resetLoginFields = () => {
      document.getElementById('login-email').value = ''
      document.getElementById('login-password').value = ''
  }

  function signup() {
    let firstName = document.getElementById('signup-first-name').value
    let lastName = document.getElementById('signup-last-name').value
    let phone = document.getElementById('signup-phone').value
    let email = document.getElementById('signup-email').value
    let password = document.getElementById('signup-password').value
    let confirmpassword = document.getElementById('signup-confirm-password').value
	let tnCInput = document.getElementById('tnC').checked
    


	let error = false

	if(firstName.length>2){
		document.getElementById('first-name-valid').style.display = 'block'
		document.getElementById('first-name-invalid').style.display = 'none'
	} else {
		document.getElementById('first-name-invalid').style.display = 'block'
		document.getElementById('first-name-valid').style.display = 'none'
		error = true
	}

	if(lastName.length>2){
		document.getElementById('last-name-valid').style.display = 'block'
		document.getElementById('last-name-invalid').style.display = 'none'
	} else {
		document.getElementById('last-name-invalid').style.display = 'block'
		document.getElementById('last-name-valid').style.display = 'none'
		error = true
	}

	if (
    email &&
    email.includes("@") &&
    email.includes(".") &&
    email.lastIndexOf(".") <= email.length - 3 &&
		email.indexOf('@') !== 0
  ) {
    document.getElementById("email-valid").style.display = "block";
    document.getElementById("email-invalid").style.display = "none";
  } else {
    document.getElementById("email-invalid").style.display = "block";
    document.getElementById("email-valid").style.display = "none";
		error = true
  }
 
  if (phone.length === 10 && (isNaN(phone) === false)){
    document.getElementById("phone-valid").style.display = "block";
    document.getElementById("phone-invalid").style.display = "none";
  } else {
    document.getElementById("phone-invalid").style.display = "block";
    document.getElementById("phone-valid").style.display = "none";
		error = true
  }
	
  if(password.length >= 8)
  {
    document.getElementById("password-valid").style.display = "block";
    document.getElementById("password-invalid").style.display = "none";
  } else {
    document.getElementById("password-invalid").style.display = "block";
    document.getElementById("password-valid").style.display = "none";
		error = true
  }

  if(confirmpassword===password && password.length!=0 && confirmpassword.length >=8)
  {
    document.getElementById("confirmpassword-valid").style.display = "block";
    document.getElementById("confirmpassword-invalid").style.display = "none";
  } else {
    document.getElementById("confirmpassword-invalid").style.display = "block";
    document.getElementById("confirmpassword-valid").style.display = "none";
		error = true
  }
	

	if(tnCInput) {
		document.getElementById("tnC-invalid").style.display = "none";
	} else {
		document.getElementById("tnC-invalid").style.display = "block";
		error = true
	}
if(error) {
    let signupFailureAlert = document.getElementById('signup-alert-failure') 
    signupFailureAlert.style.display = 'block'
}  
if(!error){ 
     
  
      let signupSuccessAlert = document.getElementById('signup-alert-success')
      
    document.getElementById('first-name-valid').style.display = 'none'
    document.getElementById('last-name-valid').style.display = 'none'
    document.getElementById("email-valid").style.display = "none"
    document.getElementById("phone-valid").style.display = "none"
    document.getElementById("password-valid").style.display = 'none'
    document.getElementById("confirmpassword-valid").style.display = "none"

      let userDetails = {
          firstName,
          lastName,
          email,
          password: encrypt(password),
          phone
      }
  
      DB_USERS.push(userDetails)
      signupSuccessAlert.style.display = 'block'
  
      console.log(DB_USERS)
  
      resetSignupFields()
    }
  }
  
  const login = () => {
      let enteredEmail = document.getElementById('login-email').value
      let enteredPassword = document.getElementById('login-password').value
      let loginError = false
  
      let loginSuccessAlert = document.getElementById('login-alert-success')
      let loginFailureAlert = document.getElementById('login-alert-failure')

      let loginEmail = DB_USERS.find(user => user.email === enteredEmail);
      if(loginEmail && enteredEmail &&
        enteredEmail.includes("@") &&
        enteredEmail.includes(".") &&
        enteredEmail.lastIndexOf(".") <= enteredEmail.length - 3 &&
            enteredEmail.indexOf('@') !== 0)
            {
                document.getElementById("login-email-valid").style.display = 'block'
                document.getElementById("login-email-invalid").style.display = 'none'
            }
            else{
                document.getElementById("login-email-valid").style.display = 'none'
                document.getElementById("login-email-invalid").style.display = 'block'
                loginError = true
        }

      let loginPassword =DB_USERS.find(user => user.email === enteredEmail && decrypt(user.password) !== enteredPassword)
      if(loginPassword ){
        document.getElementById("login-password-invalid").style.display = 'block'
        document.getElementById("login-password-invalid-2").style.display = 'none'
        loginError = true
      }
      else if(enteredPassword.length === 0){
        document.getElementById("login-password-invalid-2").style.display = 'block'
        document.getElementById("login-password-invalid").style.display = 'none'
        loginError = true
      }

      let currentUser =  DB_USERS.find(user => user.email === enteredEmail && decrypt(user.password) === enteredPassword)
      if(currentUser && !loginError) {
        document.getElementById("login-password-invalid-2").style.display = 'none'
        document.getElementById("login-password-invalid").style.display = 'none'
        document.getElementById("login-email-valid").style.display = 'none'
          loginSuccessAlert.style.display = 'block'
          loginFailureAlert.style.display = 'none'

          resetLoginFields()
      } else {
          loginFailureAlert.style.display = 'block'
          loginSuccessAlert.style.display = 'none'
      }
  
      
  }
  
  /*
          find() -> Return a condition to find the element; If value exists, returns the value; else, returns undefined
  
          2 steps:
          1. Check whether the email (user) exits in the DB.
          2. Whether entered password matches with saved password for that user.
  */