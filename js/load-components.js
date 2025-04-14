  function loadComponent(id, file) {
    fetch(file)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById(id).innerHTML = html;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-placeholder", "/components/header.html");
    loadComponent("sidebar-placeholder", "/components/sidebar.html");
    loadComponent("footer-placeholder", "/components/footer.html");
  });
 