// ==============================
// MENU MOBILE
// ==============================

const menuBtn = document.getElementById("menuBtn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});


// ==============================
// FILTRO DE CARROS
// ==============================

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const priceSelect = document.getElementById("price");
const searchBtn = document.getElementById("searchBtn");

const cars = document.querySelectorAll(".car-card");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

function filterCars() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categorySelect.value;
    const maxPrice = Number(priceSelect.value);

    let visibleCars = 0;

    cars.forEach(car => {
        const name = car.dataset.name.toLowerCase();
        const carCategory = car.dataset.category;
        const price = Number(car.dataset.price);

        const matchesSearch =
            search === "" || name.includes(search);

        const matchesCategory =
            category === "todos" || carCategory === category;

        const matchesPrice =
            price <= maxPrice;

        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {
            car.style.display = "block";
            visibleCars++;
        } else {
            car.style.display = "none";
        }
    });

    resultCount.textContent =
        `${visibleCars} ${visibleCars === 1 ? "veículo" : "veículos"}`;

    noResults.style.display =
        visibleCars === 0 ? "block" : "none";
}

searchBtn.addEventListener("click", filterCars);

searchInput.addEventListener("input", filterCars);
categorySelect.addEventListener("change", filterCars);
priceSelect.addEventListener("change", filterCars);


// ==============================
// MODAL DE DETALHES
// ==============================

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => {
        const carName = button.dataset.car;

        modalTitle.textContent = carName;
        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    });
});

function closeCarModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeCarModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeCarModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCarModal();
    }
});


// ==============================
// BOTÃO "TENHO INTERESSE"
// ==============================

const interestButton = document.querySelector(".modal-contact");

interestButton.addEventListener("click", () => {
    const carName = modalTitle.textContent;

    const message = `Olá! Tenho interesse no ${carName}. Gostaria de receber mais informações.`;

    const whatsappUrl =
        `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
});
