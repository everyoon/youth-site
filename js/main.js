document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    let closeTimer;

    item.addEventListener("mouseenter", () => {
      clearTimeout(closeTimer); // 닫기 타이머 취소
      navItems.forEach((i) => i.classList.remove("active")); // 다른 메뉴 닫기
      item.classList.add("active");
    });

    item.addEventListener("mouseleave", (e) => {
      const related = e.relatedTarget;
      if (!item.contains(related)) {
        closeTimer = setTimeout(() => {
          item.classList.remove("active");
        }, 200);
      }
    });

    // 키보드 접근성
    item.addEventListener("focusin", () => {
      clearTimeout(closeTimer);
      item.classList.add("active");
    });
    item.addEventListener("focusout", (e) => {
      if (!item.contains(e.relatedTarget)) {
        closeTimer = setTimeout(() => {
          item.classList.remove("active");
        }, 200);
      }
    });
  });
});
