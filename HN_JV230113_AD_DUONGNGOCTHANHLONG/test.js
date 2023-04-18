let students = [
  {
    id: 1,
    name: "Long",
    email: "longduong@gmail.com",
    phoneNumber: 0921131688,
    address: "Hà Nội",
    gender: "Nam",
  },
  {
    id: 2,
    name: "H Anh",
    email: "honganh@gmail.com",
    phoneNumber: 0999888888,
    address: "Thái Bình",
    gender: "Nam",
  },
];
const tbody = document.querySelector("tbody");
let form = document.querySelector("form");

// render students
function renderStudent() {
  tbody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    tbody.innerHTML =
      tbody.innerHTML +
      `
        <tr>
            <td>${students[i].id}</td>
            <td>${students[i].name}</td>
            <td>${students[i].email}</td>
            <td>${students[i].phoneNumber}</td>
            <td>${students[i].address}</td>
            <td>${students[i].gender}</td>
            <td>
            <button class="btn-edit">edit</button>
            <button class="btn-delete">delete</button> 
            </td>
          </tr>
                 `;
  }
}
renderStudent();
// check email
function checkEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
//check phone number
function checkPhoneNumber(phoneNumber) {
  let pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return pattern.test(phoneNumber);
}
// check general
function checkGender(gender) {
  if (gender === "Nam" || gender === "Nữ") {
    return gender;
  } else {
    return "Nam";
  }
}

form.onsubmit = function (e) {
  e.preventDefault();
  console.log(gender);
  if (form.name.value == "" || form.address.value == "") {
    alert("Bạn cần điền đầy đủ thông tin");
  } else if (checkEmail(form.email.value) == false) {
    alert(" email không đúng");
  } else if (checkPhoneNumber(form.phoneNumber.value) == false) {
    alert(" số điện thoại không đúng");
  } else {
    let newStudents = {
      id: Math.floor(Math.random() * 1000),
      name: form.name.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      address: form.address.value,
      gender: checkGender(form.gender.value),
    };
    students.push(newStudents)
    renderStudent();
  }
};

// Sắp xếp
function sortStudent() {
  students.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  renderStudent();
}

const sortBtn = document.querySelector("#sort-btn");
sortBtn.onclick = sortStudent;

//Xóa
tbody.onclick = function (e) {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.parentElement.parentElement.querySelector("td:first-child").textContent;
    let findIndex = students.findIndex(student => student.id === Number(id));
    if (findIndex > -1) {
      students.splice(findIndex, 1);
      renderStudent();
    }
  }
};
