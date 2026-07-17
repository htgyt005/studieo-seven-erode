// ============ STUDIEO7 ERODE — interactions ============

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav scrolled state
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Scroll reveal
  const revealTargets = document.querySelectorAll(
    '.about-grid, .services-grid, .gallery-grid, .review-feature, .review-grid, .visit-grid, .booking-form, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

  // Booking form -> WhatsApp handoff
  const form = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const service = document.getElementById('fservice').value;
      const date = document.getElementById('fdate').value;
      const note = document.getElementById('fnote').value.trim();

      if (!name || !phone) {
        formNote.textContent = 'Please fill in your name and phone number.';
        return;
      }

      let message = `Hi Studieo7, I'd like to book an appointment.%0A`;
      message += `Name: ${name}%0A`;
      message += `Phone: ${phone}%0A`;
      message += `Service: ${service}%0A`;
      if (date) message += `Preferred Date: ${date}%0A`;
      if (note) message += `Note: ${note}%0A`;

      const waUrl = `https://wa.me/919787024242?text=${message}`;
      formNote.textContent = 'Opening WhatsApp to confirm your booking...';
      window.open(waUrl, '_blank', 'noopener');
      form.reset();
    });
  }

});
