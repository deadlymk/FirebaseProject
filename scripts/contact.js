//listen for form submit

document.getElementById('contactForm').addEventListener('submit',submitForm);


function submitForm(e){
    e.preventDefault();
    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');
    console.log(name);

    //save message to firebase

    saveMessage(name,email,phone,message)
  
document.querySelector('.alert').style.display ='block';

setTimeout(()=>{
    document.querySelector('.alert').style.display ='none';
},3000);

document.getElementById('contactForm').reset();
}


function getInputVal(id){
    return document.getElementById(id).value;
}




//function to get values and create new doc in firebase 
function saveMessage (name,email,phone,message){
        db.collection('messages').add({
            name: name,
            email:email,
            phone: phone,
            message:message
        })
}

