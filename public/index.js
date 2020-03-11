// const public_key_alert = document.getElementById("public_key_alert");

// const patientKeyPort = document.getElementById("patient-key-port");

// document.getElementById("public_key_btn").addEventListener("click", e => {
//     public_key_alert.style.display = "flex";
//     if (!patientKeyPort.value) {
//         public_key_alert.innerText = "Please specify the PORT";
//         return;
//     }

//     fetch(`http://localhost:${patientKeyPort.value}/patient-key`).then(res => {
//         if (!res) {
//             public_key_alert.innerText = "Please specify a valid PORT";
//             return;
//         }
//         return res.json();
//     }).then(json => {
//         public_key_alert.innerText = json.patientKey;
//     }).catch(e => console.log(e));
// });

