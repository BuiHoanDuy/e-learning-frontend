// Display logged-in user
document.addEventListener("DOMContentLoaded", function () {
    const fullname = localStorage.getItem("fullname");
    const displayElement = document.getElementById("username-display");
    displayElement.textContent = fullname ? `${fullname} (Thoát)` : "Khách (Thoát)";
  });
  
  // Format ISO date to dd/mm/yyyy hh:mm
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("vi-VN", options);
  }
  
  // Load sidebar course list
  async function loadCourses() {
    const token = localStorage.getItem("token");
    const courseList = document.getElementById("course-list");
  
    try {
      const response = await fetch("http://localhost:8080/elearning/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      if (data.code === 200 && Array.isArray(data.result)) {
        courseList.innerHTML = "";
        data.result.forEach((course) => {
          const li = document.createElement("li");
          li.className = "nav-item";
  
          const a = document.createElement("a");
          a.className = "nav-link";
          a.href = `course-detail.html?id=${course.id}`;
          a.textContent = course.courseName;
  
          li.appendChild(a);
          courseList.appendChild(li);
        });
      } else {
        courseList.innerHTML = "<li class='nav-item text-danger p-2'>Không có khóa học nào.</li>";
      }
    } catch (error) {
      console.error("Lỗi khi tải khóa học:", error);
      courseList.innerHTML =
        "<li class='nav-item text-danger p-2'>Không thể tải danh sách khóa học.</li>";
    }
  }
  
  // Load course cards in main content
  async function loadCourseCards() {
    const token = localStorage.getItem("token");
    const courseCardsContainer = document.getElementById("course-cards");
  
    try {
      const response = await fetch("http://localhost:8080/elearning/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      if (data.code === 200 && Array.isArray(data.result)) {
        courseCardsContainer.innerHTML = "";
  
        data.result.forEach((course) => {
          const col = document.createElement("div");
          col.className = "col-md-6 col-lg-4 mb-4";
  
          const card = document.createElement("div");
          card.className = "card h-100 shadow-sm";
  
          const cardBody = document.createElement("div");
          cardBody.className = "card-body";
  
          const title = document.createElement("h5");
          title.className = "card-title";
          title.textContent = course.courseName;
  
          const teacher = document.createElement("p");
          teacher.className = "card-subtitle mb-2";
          teacher.textContent = `GV: ${course.teacher?.fullName ?? "Không rõ"}`;
  
          const createdAt = document.createElement("p");
          createdAt.className = "card-date";
          createdAt.textContent = `Tạo ngày: ${formatDate(course.createdAt)}`;
  
          const btn = document.createElement("a");
          btn.href = `course-detail.html?id=${course.id}`;
          btn.className = "btn btn-primary mt-3";
          btn.textContent = "Xem chi tiết";
  
          cardBody.appendChild(title);
          cardBody.appendChild(teacher);
          cardBody.appendChild(createdAt);
          cardBody.appendChild(btn);
  
          card.appendChild(cardBody);
          col.appendChild(card);
          courseCardsContainer.appendChild(col);
        });
      } else {
        courseCardsContainer.innerHTML = "<p class='text-danger'>Không có khóa học nào.</p>";
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách khóa học:", error);
      courseCardsContainer.innerHTML = "<p class='text-danger'>Không thể tải khóa học.</p>";
    }
  }
  
  // Load data on page ready
  document.addEventListener("DOMContentLoaded", () => {
    loadCourses();
    loadCourseCards();
  });
  