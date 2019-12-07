'use strict';

fetch('./user.json')
.then(response => response.json())
.then(appendUserItemList)
.catch(console.error);

function createUserItem(user) {

    const userItemContainer = document.createElement("li");
    userItemContainer.classList.add('userItem');
    const userImageContainer = document.createElement("div");
    userImageContainer.classList.add("imageContainer");

    const pElem = document.createElement("p");
    pElem.innerText = `${user.name.split("")[0]}${user.surname.split("")[0]}`;
    userImageContainer.appendChild(pElem);


    const userImage = document.createElement("img");

    userImage.setAttribute("src", `${user.picturePath}`);
    userImage.onload = () => {
        userImageContainer.appendChild(userImage);
    };

    userImageContainer.style.backgroundColor = stringToColor(`${user.name} ${user.surname}`);


    userItemContainer.appendChild(userImageContainer);

    const userFullNameElem = document.createElement("h3");
    userFullNameElem.innerText = `${user.name} ${user.surname}`;

    const userAgeElem = document.createElement("h4");
    userAgeElem.innerText = user.age;
    userItemContainer.appendChild(userFullNameElem);
    userItemContainer.appendChild(userAgeElem);



    return userItemContainer;
}

function appendUserItemList(users) {

    users.forEach( user => {
        document.getElementById("usersList").appendChild(createUserItem(user));
    });

}

/*function checkUserPictureLink(user) {
    const linkPromise = new Promise( function (resolve, reject) {

        if (new Image(user.picturePath).onload) {
            resolve();
        }
        reject();

    });

    linkPromise
        .then(console.log)
        .catch(console.error);


}*/

 function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}