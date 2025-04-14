document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const fullname = localStorage.getItem("fullname");
  
    // Gán tên người dùng ở footer (nếu có phần tử này)
    const displayElement = document.getElementById("username-display");
    if (displayElement) {
      displayElement.textContent = fullname
        ? `${fullname} (Thoát)`
        : "Khách (Thoát)";
    }
  
    // Tải danh sách khóa học nếu có phần tử sidebar
    const courseList = document.getElementById("course-list");
    if (courseList && token) {
      fetch("http://localhost:8080/elearning/courses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200 && Array.isArray(data.result)) {
            data.result.forEach((c) => {
              const li = document.createElement("li");
              li.className = "nav-item";
              const a = document.createElement("a");
              a.className = "nav-link";
              a.href = `course-detail.html?id=${c.id}`;
              a.textContent = c.courseName;
              li.appendChild(a);
              courseList.appendChild(li);
            });
          } else {
            courseList.innerHTML =
              "<li class='nav-item text-danger p-2'>Không có khóa học.</li>";
          }
        })
        .catch(() => {
          courseList.innerHTML =
            "<li class='nav-item text-danger p-2'>Lỗi khi tải danh sách khóa học.</li>";
        });
    }
  });
  