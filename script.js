document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Theme Switcher (Dark / Light Mode)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = themeToggle.querySelector('.theme-label');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeLabel.textContent = 'Light';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeLabel.textContent = 'Dark';
    }
  }

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileMenuBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // ==========================================
  // 3. Scroll-spy Active Navbar Indicator
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ==========================================
  // 4. Scroll Reveal Animations
  // ==========================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // ==========================================
  // 5. Skills Category Filtering
  // ==========================================
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-skill-category');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. Projects Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 7. Project Details Modal Data & Handlers
  // ==========================================
  const projectDetails = {
    codesync: {
      title: 'CodeSync — Collaborative Coding Platform',
      category: 'Full Stack & AI',
      tags: ['JavaScript', 'WebRTC', 'Node.js', 'AI Assistant', 'Express', 'WebSocket'],
      description: 'CodeSync is a real-time, browser-based collaborative programming workspace engineered to allow developers and student teams to code together seamlessly with embedded AI guidance.',
      features: [
        'Real-time multi-user simultaneous document editing using WebSockets.',
        'AI Assistant integration for line-by-line code explanation, refactoring, and automated bug detection.',
        'Custom workspace room creation with access control and password protection.',
        'Built-in syntax highlighting and terminal emulation view.'
      ],
      impact: 'Significantly reduced code review friction during group engineering assignments and hackathons.'
    },
    bloodbank: {
      title: 'Blood Donation Management System',
      category: 'Database Systems & Python',
      tags: ['Python', 'MySQL', 'Database Design', 'UI Layout', 'SQL Queries'],
      description: 'A centralized desktop & web database management platform designed to streamline blood donor registrations, maintain real-time blood group inventory records, and process urgent donor match queries.',
      features: [
        'Donor registry management with eligibility verification & contact storage.',
        'Real-time blood stock count categorization across A+, B+, O+, AB+, and negative blood types.',
        'Automated low-inventory warning alerts for hospital coordinators.',
        'Custom SQL query builder for emergency blood unit availability searches.'
      ],
      impact: 'Optimized blood inventory request processing time for regional medical workflows.'
    },
    portfolio: {
      title: 'Personal Developer Portfolio & Contact API',
      category: 'Full Stack Web',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'JSON DB', 'Glassmorphism'],
      description: 'A state-of-the-art full-stack developer portfolio showcasing technical projects, internship achievements, certifications, and an interactive contact backend with admin inquiry management.',
      features: [
        'Dark/Light mode persistence using local storage & CSS variables.',
        'Responsive layout across mobile, tablet, and widescreen desktops.',
        'Express REST backend (`/api/contact`) for persistent message storage in `messages.json`.',
        'Private Admin Inbox portal (`/admin/messages`) for managing recruiter inquiries.'
      ],
      impact: 'Serves as digital proof of work for recruiters, clients, and technical hiring managers.'
    },
    taskmanager: {
      title: 'Smart Task & Workflow Manager',
      category: 'Full Stack Web App',
      tags: ['React', 'Node.js', 'Express', 'REST API', 'JSON Storage'],
      description: 'An intuitive workflow productivity web application for organizing technical tasks, tracking project milestones, and managing sprint goals.',
      features: [
        'Interactive drag-and-drop task boards (To-Do, In-Progress, Completed).',
        'Priority tagging, due date notifications, and task search filtering.',
        'Backend synchronization with REST API endpoints for seamless persistence.',
        'Clean progress indicator visualization.'
      ],
      impact: 'Helps students and developer teams organize project milestones efficiently.'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];

      if (!data) return;

      modalBody.innerHTML = `
        <span class="project-category-badge">${data.category}</span>
        <h2 class="modal-detail-heading gradient-text" style="margin-top:0.75rem;">${data.title}</h2>
        
        <div class="modal-tech-list">
          ${data.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>

        <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6;">${data.description}</p>

        <h3 class="modal-section-title"><i class="fa-solid fa-check-double"></i> Key Features</h3>
        <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.7;">
          ${data.features.map((feat) => `<li style="margin-bottom:0.4rem;">${feat}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title"><i class="fa-solid fa-chart-line"></i> Practical Impact</h3>
        <p style="color: var(--text-secondary);">${data.impact}</p>
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  // ==========================================
  // 8. Contact Form Handling & Backend Fetch
  // ==========================================
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic Validation
      if (!name || !email || !message) {
        showStatus('Please complete all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      showStatus('Submitting your message to Karthik...', '');

      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      })
        .then((res) => res.json())
        .then((data) => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

          if (data.error) {
            showStatus(data.error, 'error');
          } else {
            showStatus(data.message || 'Thank you! Your message was sent successfully.', 'success');
            form.reset();
            loadInboxMessages(); // Automatically refresh inbox on new message
          }
        })
        .catch(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
          showStatus('Unable to reach backend server right now. Please try emailing karthikgowdacy@gmail.com directly.', 'error');
        });
    });
  }

  function showStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = 'form-status';
    if (type) {
      formStatus.classList.add(type);
    }
  }

  // ==========================================
  // 9. Password Protected Inbox Section Handlers
  // ==========================================
  const lockScreen = document.getElementById('inbox-lock-screen');
  const unlockedView = document.getElementById('inbox-unlocked-view');
  const authForm = document.getElementById('inbox-auth-form');
  const passInput = document.getElementById('inbox-password-input');
  const authStatus = document.getElementById('inbox-auth-status');
  const inboxContainer = document.getElementById('inbox-messages-container');
  const inboxCountBadge = document.getElementById('inbox-count-badge');
  const inboxRefreshBtn = document.getElementById('inbox-refresh-btn');
  const inboxLockBtn = document.getElementById('inbox-lock-btn');

  let adminPassword = sessionStorage.getItem('inbox_admin_pass') || '';

  function checkInboxAuth() {
    if (!adminPassword) {
      showLockScreen();
      return;
    }

    // Verify stored password with backend
    fetch('/api/messages', {
      headers: { 'x-admin-password': adminPassword }
    })
      .then((res) => {
        if (res.status === 401) {
          adminPassword = '';
          sessionStorage.removeItem('inbox_admin_pass');
          showLockScreen('Password expired or invalid. Please login again.', 'error');
        } else return res.json();
      })
      .then((messages) => {
        if (messages) {
          showUnlockedView(messages);
        }
      })
      .catch(() => {
        showLockScreen('Failed to connect to backend server.', 'error');
      });
  }

  function showLockScreen(msg = '', type = '') {
    if (lockScreen) lockScreen.style.display = 'block';
    if (unlockedView) unlockedView.style.display = 'none';
    if (authStatus) {
      authStatus.textContent = msg;
      authStatus.className = 'form-status';
      if (type) authStatus.classList.add(type);
    }
  }

  function showUnlockedView(messages) {
    if (lockScreen) lockScreen.style.display = 'none';
    if (unlockedView) unlockedView.style.display = 'block';

    const count = messages ? messages.length : 0;
    if (inboxCountBadge) {
      inboxCountBadge.textContent = `${count} Message${count === 1 ? '' : 's'}`;
    }

    if (!messages || messages.length === 0) {
      inboxContainer.innerHTML = `
        <div class="inbox-empty-card glass-card">
          <i class="fa-solid fa-envelope-open" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3>No Messages Received Yet</h3>
          <p style="color: var(--text-secondary); max-width: 460px; margin: 0.5rem auto 0;">Use the contact form above to send a test message, and it will immediately appear here once unlocked!</p>
        </div>
      `;
      return;
    }

    inboxContainer.innerHTML = messages.map((msg) => `
      <div class="inbox-msg-card glass-card">
        <div class="inbox-msg-header">
          <div>
            <h4 class="inbox-sender-name">${escapeHtml(msg.name)}</h4>
            <a href="mailto:${escapeHtml(msg.email)}" class="inbox-sender-email">
              <i class="fa-solid fa-envelope"></i> ${escapeHtml(msg.email)}
            </a>
          </div>
          <div class="inbox-msg-meta">
            <span class="inbox-time-badge"><i class="fa-regular fa-clock"></i> ${new Date(msg.receivedAt).toLocaleString()}</span>
            <button class="delete-inbox-btn" onclick="deleteInboxMsg('${msg.id}')" title="Delete message">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="inbox-msg-body">
          ${escapeHtml(msg.message)}
        </div>
      </div>
    `).join('');
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPass = passInput.value.trim();

      if (!enteredPass) return;

      fetch('/api/messages', {
        headers: { 'x-admin-password': enteredPass }
      })
        .then((res) => {
          if (res.status === 401) {
            showLockScreen('Incorrect password. (Default pass: karthik123)', 'error');
            return null;
          }
          return res.json();
        })
        .then((messages) => {
          if (messages) {
            adminPassword = enteredPass;
            sessionStorage.setItem('inbox_admin_pass', enteredPass);
            passInput.value = '';
            showUnlockedView(messages);
          }
        })
        .catch(() => {
          showLockScreen('Error connecting to backend server.', 'error');
        });
    });
  }

  window.deleteInboxMsg = function(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': adminPassword }
    })
      .then((res) => res.json())
      .then(() => checkInboxAuth())
      .catch(() => alert('Could not delete message.'));
  };

  function escapeHtml(str) {
    return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  if (inboxRefreshBtn) {
    inboxRefreshBtn.addEventListener('click', checkInboxAuth);
  }

  if (inboxLockBtn) {
    inboxLockBtn.addEventListener('click', () => {
      adminPassword = '';
      sessionStorage.removeItem('inbox_admin_pass');
      showLockScreen('Inbox locked.', 'success');
    });
  }

  // Initial Auth Check
  checkInboxAuth();
});
