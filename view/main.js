// "use strict";
// const jquery = require("jquery")
//     (() => {
//         const submit = document.getElementById("signupsubmit")

//         const registerUser = () => {
//             const signObj = {
//                 firstName: document.getElementById("firstName"),
//                 lastName: document.getElementById("lastName"),
//                 email: document.getElementById("email"),
//                 password: document.getElementById("password"),


//             }

//             jquery.ajax({
//                 url: 'http://localhost:3000/api-v1/register/createuser',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(signObj),

//                 success: function (signObj) {
//                     console.log(signObj);
//                 },
//                 error: function (error) {
//                     console.error(error);
//                 }
//             });



//         }

//         // const loginUser = () => {

//         //     const loginObj = {

//         //         userName: document.getElementById("userName"),
//         //         password: document.getElementById("passwords"),
//         //         submit: document.getElementById("submit")

//         //     }
//         // }



//         submit.addEventListener('submit', (e) => {
//             e.preventDefault();
//             registerUser();
//         })


//     })