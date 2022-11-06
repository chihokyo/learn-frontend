console.clear();

feather.replace(); // Init Feather icon set

const sectionEls = document.querySelectorAll('.section');
const headerEl = document.querySelector('.header');
const navLinkEls = document.querySelectorAll('.nav-link');
const popoverEl = document.querySelector('.popover');
const contentEl = document.querySelector('.content');
const arrowEl = document.querySelector('.arrow');
const backgroundEl = document.querySelector('.background');

const sections = ['products', 'developers', 'company'];

// TODO: generate on the fly
const dimensions = {
  products: { width: 490, height: 280, x: 0 },
  developers: { width: 390, height: 266, x: 100 },
  company: { width: 260, height: 296, x: 200 },
};

const popoverLeft = popoverEl.getBoundingClientRect().x;

navLinkEls.forEach((navLink) => {
  let section = navLink.getAttribute('data-nav');
  let rect = navLink.getBoundingClientRect();
  dimensions[section].arrowX = rect.left + rect.width / 2 - popoverLeft;
});

// Set initial arrow position
arrowEl.style.transform = `
  translateX(${dimensions.products.arrowX}px)
  rotate(45deg)`;

function showSection(section) {
  popoverEl.classList.add('open');
  sectionEls.forEach((el) => el.classList.remove('active'));
  document.querySelector(`.section-${section}`).classList.add('active');

  // Position arrow
  arrowEl.style.transform = `
    translateX(${dimensions[section].arrowX}px)
    rotate(45deg)`;

  // Resize and position background
  backgroundEl.style.transform = `
    translateX(${dimensions[section].x}px)
    scaleX(${dimensions[section].width / dimensions['products'].width})
    scaleY(${dimensions[section].height / dimensions['products'].height})
  `;

  // Resize and position content
  contentEl.style.width = dimensions[section].width + 'px';
  contentEl.style.height = dimensions[section].height + 'px';

  contentEl.style.transform = `translateX(${dimensions[section].x}px)`;

  // size container? If we remove from CSS and do everything dynamically.
}

navLinkEls.forEach((navLink) => {
  navLink.addEventListener('mouseenter', (event) => {
    let targetPopover = event.target.getAttribute('data-nav');
    showSection(targetPopover);
  });
});

headerEl.addEventListener('mouseleave', () => {
  popoverEl.classList.remove('open');
});
