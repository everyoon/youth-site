const notices = [
  {
    category: "E청소년",
    title: "청소년 성장지원 마이데이터 서비스 교육 운영 안내",
    date: "2028-08-15",
  },
  {
    category: "E청소년",
    title: "청소년활동데이터기반 활동정보 수요조사 설문 이벤트",
    date: "2028-08-14",
  },
  {
    category: "지도사",
    title: "2028년 청소년지도사 국외 연수 참가자 모집공고",
    date: "2028-08-10",
  },
  {
    category: "봉사",
    title: "1365 자원봉사포털, VMS, 나이스 연계 불가 안내 및 대체 방법",
    date: "2028-08-09",
  },
  {
    category: "포상",
    title: "청소년포상제 제 첫돌에 기 뜻깊은 행사안내",
    date: "2028-08-09",
  },
  {
    category: "봉사",
    title: "청소년 봉사 나의 후기 인증 이벤트 안내",
    date: "2028-08-09",
  },
  {
    category: "교류",
    title:
      "2028년 안·일 국가간 청소년교류 초청운영진 및 위견대표단 선발 최종합격자 발표",
    date: "2028-08-05",
  },
  {
    category: "지도사",
    title: "2025년 청소년지도사 전문연수 기관공증 과정 모집안내",
    date: "2028-08-01",
  },
];

const noticesGrid = document.getElementById("noticesGrid");
const categoryBtns = document.querySelectorAll(".category-btn");

// 공지사항 카드 생성
function renderNotices(filterCategory = "전체") {
  noticesGrid.innerHTML = "";

  const filteredNotices =
    filterCategory === "전체"
      ? notices
      : notices.filter((notice) => notice.category === filterCategory);

  filteredNotices.forEach((notice) => {
    const card = document.createElement("div");
    card.className = `notice-card ${notice.category}`;
    card.innerHTML = `
                    <div class="notice-category">${notice.category}</div>
                    <div class="notice-title">${notice.title}</div>
                    <div class="notice-date">${notice.date}</div>
                `;
    noticesGrid.appendChild(card);
  });
}

// 카테고리 버튼 클릭 이벤트
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 모든 버튼의 active 클래스 제거
    categoryBtns.forEach((b) => b.classList.remove("active"));
    // 클릭한 버튼에 active 클래스 추가
    btn.classList.add("active");
    // 해당 카테고리로 필터링
    const category = btn.dataset.category;
    renderNotices(category);
  });
});

// 초기 렌더링 (전체 보기)
renderNotices();
