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

// hero- section
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const progressBar = document.querySelector(".pagination-progress");
const totalSlides = slides.length;
const slideCounter = document.getElementById("currentSlide");

function updateSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
  slideCounter.textContent = String(index + 1).padStart(2, "0");

  // 프로그레스 바 업데이트 (1페이지당 33.33%)
  const progressWidth = ((index + 1) / totalSlides) * 100;
  progressBar.style.width = progressWidth + "%";
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide(currentSlide);
}

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Auto-play
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause on hover
document.querySelector(".hero-section").addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval);
});

document.querySelector(".hero-section").addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(nextSlide, 5000);
});
