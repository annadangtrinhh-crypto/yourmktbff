const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.desktop-nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.play().catch(() => {});
    } else {
      entry.target.pause();
    }
  });
}, { rootMargin: '200px 0px', threshold: 0.1 });

document.querySelectorAll('.gallery-tile video').forEach((video) => videoObserver.observe(video));

const projectModal = document.querySelector('.project-modal');
const projectModalContent = projectModal.querySelector('.project-modal-content');
let lastProjectTrigger;

const closeProjectModal = () => {
  projectModal.hidden = true;
  projectModalContent.replaceChildren();
  document.body.classList.remove('project-modal-open');
  lastProjectTrigger?.focus();
};

document.querySelectorAll('[data-project-open]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const template = document.querySelector(`#${trigger.dataset.projectOpen}`);
    if (!template) return;
    lastProjectTrigger = trigger;
    projectModalContent.replaceChildren(template.content.cloneNode(true));
    projectModal.hidden = false;
    document.body.classList.add('project-modal-open');
    projectModal.querySelector('.project-modal-close').focus();
  });
});

projectModal.addEventListener('click', (event) => {
  if (event.target.closest('[data-project-close]')) closeProjectModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !projectModal.hidden) closeProjectModal();
});

const modal = document.getElementById('projectModal');
const modalTitle = modal.querySelector('.modal-title');
const modalCategory = modal.querySelector('.modal-category');
const modalDesc = modal.querySelector('.modal-desc');
const modalPdfLink = modal.querySelector('.modal-pdf-link');

document.querySelectorAll('.gallery-tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    modalTitle.textContent = tile.dataset.title || '';
    modalCategory.textContent = tile.dataset.category || '';
    modalDesc.textContent = tile.dataset.desc || '';
    if (tile.dataset.pdf) {
      modalPdfLink.href = tile.dataset.pdf;
      modalPdfLink.hidden = false;
    } else {
      modalPdfLink.hidden = true;
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

modal.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) {
    modal.hidden = true;
    document.body.style.overflow = '';
  }
});