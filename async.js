


document.body.innerHTML = `
<div class='Enter-user'>
<input class='name '  placeholder='Enter your name'>
<input class='add-user-avatar ' placeholder='Enter pic url'>
<button type="button" class="btn btn-outline-dark" onclick='addUser()'>ADD</button>
</div>
<div class='user-list'>
</div>
`
var newName;
var newAvatar;
console.log(typeof newName);

async function getUsers(){
    const data = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers');
    const users = await data.json();  //convert to data to json
    const usercontainer = document.querySelector('.user-list');

    usercontainer.innerHTML='';  //making the data empty before rendering after clicking delete button
    users.forEach(element => {
        usercontainer.innerHTML+=`<div class='usercontainer'>
        <img src='${element.avatar}'>
        <div>
        <p class='user-name'>${element.name}</p>
        <button type="button" class="btn btn-outline-dark btn-sm" onclick='toggleEditUser(${element.id})'><i class="fas fa-user-edit"></i> EDIT</button>
        <button type="button" class="btn btn-outline-dark btn-sm delete-${element.id}" onclick='deleteUser(${element.id})'><i class="fas fa-user-minus"></i> DELETE</button>
        <div class='edit-user-form edit-${element.id}' id='innerdiv'>
        <input value='${element.name}' class='edit-${element.id}-user-name' id='fellow_name' oninput="myFunctionName(${element.id})"  placeholder='Enter your name'>
        <input value='${element.avatar}' class='edit-${element.id}-user-avatar' id='fellow_avatar' oninput="myFunctionAvatar(${element.id})" placeholder='Enter pic url'>
        <button type="button" class="btn btn-outline-success btn-sm" onclick='saveUser(${element.id})'><i class="far fa-save"></i> Save</button>
        </div>
       
        </div>
        </div> `
                  
    });    
}
getUsers();



function myFunctionName(id){
    newName = document.querySelector('.edit-'+id+'-user-name').value;
}



function myFunctionAvatar(id){
    newAvatar = document.querySelector('.edit-'+id+'-user-avatar').value;
}


async function deleteUser(userId){

    const data = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers/'+userId,{method: "DELETE"});
    getUsers();
}

async function addUser(){

    const user_name = document.querySelector('.name').value;
    const user_avatar = document.querySelector('.add-user-avatar').value; 
   
    const data = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers/',{method: "POST",
    headers: { "Content-Type": "application/json"},

    body: JSON.stringify({name: user_name,avatar: user_avatar}),
    });
    document.querySelector('.name').value = null;
    document.querySelector('.add-user-avatar').value = null;
    getUsers();
}


 function toggleEditUser(userId){

    const editUserForm = document.querySelector(`.edit-${userId}`);
    editUserForm.style.display = editUserForm.style.display === "block" ? 'none' : 'block';

}


async function saveUser(userId){
    const old_data = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers');
    const users = await old_data.json();
    
    if(typeof newName === 'undefined'){
      let one_user =  users.filter((user) => user.id == userId);
      
      newName = one_user[0].name;
    }else if(typeof newAvatar === 'undefined'){
        console.log("from avatar.."+newAvatar)
        let one_user =  users.filter((user) => user.id == userId);
        console.log(one_user[0].avatar);
        newAvatar = one_user[0].avatar;
    }

    const data1 = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers/'+userId,{method: "DELETE"});
    
    const data = await fetch('https://6166c4e013aa1d00170a670a.mockapi.io/newusers/',{method: "POST",
    headers: { "Content-Type": "application/json"},

    body: JSON.stringify({name: newName,avatar: newAvatar}),
    });
    getUsers();

}