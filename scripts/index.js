const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('#accountDetails');
const userType = document.querySelector('#typeOfUser')
const adminItems = document.querySelectorAll('.admin')



const setupUI = (user) => {
    if (user) {
      if(user.admin){
        adminItems.forEach(item => item.style.display = 'block')
      }

        db.collection('users').doc(user.uid).get().then(doc => {
            const html= `
            <div>${doc.data().username} <i class="fas fa-user fa-1x " style="color:red"></i></div>` ;

            const userAdmin = `
            <div> ${user.admin ? 'Admin' : ''}</div>`;
            accountDetails.innerHTML = html;
            userType.innerHTML = userAdmin;

        })
        //acount info
       
     
      // toggle user UI elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
      adminItems.forEach(item => item.style.display = 'none')
      userType.innerHTML = "BasicUser";
        accountDetails.innerHTML = '';
      // toggle user elements
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  };