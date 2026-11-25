/* =========================================
   1. RÉCUPÉRATION DES ÉLÉMENTS HTML
========================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const appointmentModal = document.getElementById("appointmentModal");

const openAppointmentButtons = [
    document.getElementById("openAppointment"),
    document.getElementById("heroAppointment"),
    document.getElementById("contactAppointment")
];

const closeAppointment = document.getElementById("closeAppointment");

const appointmentForm = document.getElementById("appointmentForm");

const appointmentDate = document.getElementById("appointmentDate");

const formNotice = document.getElementById("formNotice");


/* =========================================
   2. ANNÉE AUTOMATIQUE DANS LE FOOTER
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   3. OUVERTURE ET FERMETURE DU MENU MOBILE
========================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    // Fermer le menu après avoir cliqué sur un lien

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        });

    });

}


/* =========================================
   4. EFFET DU HEADER AU DÉFILEMENT
========================================= */

window.addEventListener("scroll", () => {

    if (header) {

        header.classList.toggle("scrolled", window.scrollY > 30);

    }

});


/* =========================================
   5. NAVIGATION ACTIVE
========================================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const sectionId = entry.target.id;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${sectionId}`
                    );

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   6. OUVRIR LA FENÊTRE DE RENDEZ-VOUS
========================================= */

function openModal() {

    if (!appointmentModal) return;

    appointmentModal.classList.add("show");

    appointmentModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (formNotice) {
        formNotice.textContent = "";
    }

    const firstInput = document.getElementById("patientName");

    if (firstInput) {

        setTimeout(() => firstInput.focus(), 200);

    }

}


/* =========================================
   7. FERMER LA FENÊTRE DE RENDEZ-VOUS
========================================= */

function closeModal() {

    if (!appointmentModal) return;

    appointmentModal.classList.remove("show");

    appointmentModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// Activation des boutons de rendez-vous

openAppointmentButtons.forEach(button => {

    if (button) {

        button.addEventListener("click", openModal);

    }

});


// Bouton de fermeture

if (closeAppointment) {

    closeAppointment.addEventListener("click", closeModal);

}


// Fermer en cliquant à l'extérieur de la fenêtre

if (appointmentModal) {

    appointmentModal.addEventListener("click", (event) => {

        if (event.target === appointmentModal) {

            closeModal();

        }

    });

}


// Fermer avec la touche Échap

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        appointmentModal &&
        appointmentModal.classList.contains("show")
    ) {

        closeModal();

    }

});


/* =========================================
   8. EMPÊCHER LES DATES PASSÉES
========================================= */

if (appointmentDate) {

    const today = new Date();

    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localToday;

}


/* =========================================
   9. TRAITEMENT DU FORMULAIRE
========================================= */

if (appointmentForm) {

    appointmentForm.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!appointmentForm.checkValidity()) {

            appointmentForm.reportValidity();

            return;

        }

        const formData = new FormData(appointmentForm);

        const patient = formData.get("patientName").trim();

        const email = formData.get("patientEmail").trim();

        const phone = formData.get("patientPhone").trim();

        const department = formData.get("department");

        const date = formData.get("appointmentDate");


        if (!patient || !email || !phone || !department || !date) {

            if (formNotice) {

                formNotice.textContent =
                    "Veuillez remplir tous les champs.";

            }

            return;

        }


        // Vérification de la date

        const selectedDate = new Date(`${date}T00:00:00`);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            if (formNotice) {

                formNotice.textContent =
                    "Veuillez choisir une date valide.";

            }

            return;

        }


        // Confirmation de démonstration

        if (formNotice) {

            formNotice.textContent =
                `Merci ${patient} ! Votre demande de rendez-vous a été enregistrée dans cette démonstration. Aucun rendez-vous réel n'a encore été transmis à l'hôpital.`;

        }


        appointmentForm.reset();

        appointmentDate.min = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

    });

}


/* =========================================
   10. ANIMATION DES STATISTIQUES
========================================= */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target) || target < 0) return;

    const duration = 1800;

    const startTime = performance.now();

    function updateCounter(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        // Animation progressive

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * easedProgress);

        counter.textContent = currentValue.toLocaleString("fr-FR");

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent = target.toLocaleString("fr-FR") + "+";

        }

    }

    requestAnimationFrame(updateCounter);

}


// Lancer les animations lorsque les statistiques apparaissent

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

} else {

    counters.forEach(counter => {

        animateCounter(counter);

    });

}


/* =========================================
   11. MESSAGE DE DÉMARRAGE
========================================= */

console.log("Carewell Hospital : site chargé avec succès.");