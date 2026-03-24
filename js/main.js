// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ===== Smooth scroll for anchor links (on pages where needed) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
    }
  });
});

// ===== Event Modal System =====
// This function is called when an event card is clicked on the homepage.
// It populates the modal with event details and shows the registration form.
function openEventModal(event) {
  const modal = document.getElementById('eventModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalEventId = document.getElementById('modalEventId');

  modalTitle.innerText = event.title;
  modalDate.innerText = event.date;
  modalLocation.innerText = event.location;
  modalDescription.innerText = event.description;
  modalEventId.value = event.id;

  modal.style.display = 'flex';
}

// Close modal
function closeModal() {
  document.getElementById('eventModal').style.display = 'none';
}

// Register form submission
function registerForEvent(eventId, name, email) {
  // In a real scenario, you'd send this to a backend.
  // For demo, we store in localStorage and show an alert.
  const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
  registrations.push({ eventId, name, email, timestamp: new Date().toISOString() });
  localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
  alert(`Thanks ${name}! You are registered for this event. We'll send details to ${email}.`);
  closeModal();
}

// Handle modal form submission
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventId = document.getElementById('modalEventId').value;
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }
    registerForEvent(eventId, name, email);
    registrationForm.reset();
  });
}

// Close modal when clicking outside content
window.onclick = function (event) {
  const modal = document.getElementById('eventModal');
  if (event.target === modal) {
    closeModal();
  }
};
