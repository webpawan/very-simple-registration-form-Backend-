const form = document.getElementById('form');

console.log(form);
const username = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const repassword = document.getElementById('rpassword');
const btn = document.getElementById('btn');

const senddata = (data, curdata,name) => {
    if (data === curdata) {
        alert(`thankyou ${name}`);
        form.reset();
        location.href = `regis.html?name=${name}`
        
    }
}

const check = (name) => {
    const group = document.getElementsByClassName('formgroup');
    let grouplenght = group.length - 1;
    for (let i = 0; i < group.length; i++){
        if (group[i].className === 'formgroup right') {
            let count = 0 + i;  
            senddata(count, grouplenght, name);
        } else {
            return false;
        }
    }
}


// error msg
const error = (input, msg) => {
    let val = input.parentElement;
    val.className = 'formgroup error';
    let wrong = val.lastElementChild;
    let wrongicon = wrong.firstElementChild;
    wrongicon.style.color = 'rgb(253, 97, 86)';
    wrongicon.classList.add('show');
    let righticon = wrong.lastElementChild;
    righticon.classList.remove('show');
    let data = val.parentElement.lastElementChild;
    data.innerText = `${msg}`;



}

// accept msg 
const accept = (input) => {
    let val = input.parentElement;  
    val.className = 'formgroup right';
    let right = val.lastElementChild;
    let righticon = right.lastElementChild;
    righticon.style.color = 'rgb(0, 225, 0)';
    righticon.classList.add('show');
    let wrongicon = right.firstElementChild;
    wrongicon.classList.remove('show');
    let data = val.parentElement.lastElementChild;
    data.innerText = "";
    
}


// check email wrong ha kya
const isemail = (myemail) => {
    
    let symbol = myemail.indexOf('@');
    if (symbol < 1) return false;
    let dot = myemail.lastIndexOf('.');
    if (dot <= symbol + 3) return false;
    if (dot === myemail.length - 1) return false;
    return true;
}

const validate = () => {
    let nameval = username.value.trim();
    let emailval = email.value.trim();
    let numberval = number.value.trim();
    let passwordval = password.value.trim();
    let repasswordval = repassword.value.trim();

    // name validation 
    if (nameval == "") {
        error(username, "empty");
    } else if (nameval.length <= 2) {
        error(username, "we not accept 2 character name");
    } else {
        accept(username);
    }

    // email validation 
    if (emailval == "") {
        error(email, "empty");
    } else if (!isemail(emailval)) {
        error(email,"incorrect email")
    } else {
        accept(email);
    }

    // phone number validation 
    if (numberval == "") {
        error(number, "empty");
    } else if (numberval.length > 10) {
        error(number, 'we accept only 10 digit numbers');
    } else if (numberval.length < 10) {
        error(number, 'we accept only 10 digit numbers');
    } else {
        accept(number);
    }

    // password validation
     if (passwordval == "") {
        error(password, 'empty');
    } else if (passwordval.length < 8) {
        error(password,'write minium 8 character password ')
    }else {
        accept(password);
    }

    // recheck password
     if (repasswordval == "") {
        error(repassword, 'empty');
    }else if (repasswordval !== passwordval) {
        error(repassword, 'not matching');
    }else if (passwordval.length < 8) {
        error(password,'write minium 8 character password ')
    }
    else {
        accept(repassword);
    }

    check(nameval);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();

})

