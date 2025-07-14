document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('user-login');
    const newUserForm = document.getElementById('new-user');
    const loginBtn = document.getElementById('login-btn');
    const newUserRegBtn = document.getElementById('new-user-btn');
    const newUserSubmitBtn = document.getElementById('new-user-submit');
    const backLogin = document.getElementById('back-login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const newEmailInput = document.getElementById('new-email');
    const newPasswordInput = document.getElementById('new-password');
    const userApiInput  = document.getElementById('user-api-key');
    const regConfirm=document.getElementById('reg-confirm');
    const loginConfirm =document.getElementById('login-confirm');
    const savedUser=JSON.parse(localStorage.getItem('user'))||[];
    const userList=savedUser;
    loginBtn.addEventListener('click', () => {
        const email=emailInput.value;
        const password=passwordInput.value;
        if(email&&password){
            const userExists = userList.some((user) => user.email === email && user.password === password);
            if (userExists) {
                localStorage.setItem('loggedInEmail',email)
                loginForm.classList.add('hidden');
                newUserForm.classList.add('hidden');
                loginConfirm.classList.remove('hidden');
                loginConfirm.textContent = 'Login successfull🎉🎉';
                loginConfirm.style.color = 'rgb(0, 250, 0)';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            } else {
                loginConfirm.textContent = 'Invalid email or password!!!!!!!';
                loginConfirm.style.color = 'rgb(255, 0, 0)';
                loginConfirm.classList.remove('hidden');
            }
        }
    });
  
    newUserRegBtn.addEventListener('click', () => {
      loginForm.classList.add('hidden');
      newUserForm.classList.remove('hidden');
    });
    newUserSubmitBtn.addEventListener('click',()=>{
        if(!newEmailInput.value||!newPasswordInput.value||!userApiInput.value){
            regConfirm.textContent="Please fill all the fields";
            regConfirm.style.color='red';
            regConfirm.classList.remove('hidden');
            return;
        }
        const newUser={
            email:newEmailInput.value,
            password:newPasswordInput.value,
            api:userApiInput.value
        }
        const userExists=userList.some((user)=>user.email===newUser.email);
        if(userExists){
            regConfirm.textContent="User already exists!!!!!";
            regConfirm.style.color='red';
            regConfirm.classList.remove('hidden');
            return;
        }
        userList.push(newUser);
        console.log(userList);
        localStorage.setItem('user',JSON.stringify(userList));
        console.log(savedUser)
        regConfirm.textContent="Registered successfully🎉🎉";
        regConfirm.style.color='rgb(0, 250, 0)'
        regConfirm.classList.remove('hidden');
    })
    backLogin.addEventListener('click', () => {
      loginForm.classList.remove('hidden');
      newUserForm.classList.add('hidden');
    });
})