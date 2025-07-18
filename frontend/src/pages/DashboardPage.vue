<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- User Header Section -->
      <header class="user-header">
        <div class="user-info">
          <div class="user-avatar">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/01f5cbda9f8ae931a5d85847b4db7dc680bdee67?width=92"
              alt="Profile de Eric Tshimba Lokole"
              class="avatar-image"
            />
          </div>
          <div class="user-details">
            <div class="user-name-row">
              <h1 class="user-name">Eric Tshimba Lokole</h1>
              <div class="dropdown-container">
                <button
                  class="dropdown-btn"
                  aria-label="Options utilisateur"
                  @click="toggleUserMenu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                      stroke="#141B34"
                      stroke-width="1.5"
                    />
                    <path
                      d="M8 10.5C8 10.5 10.946 13.5 12 13.5C13.0541 13.5 16 10.5 16 10.5"
                      stroke="#141B34"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div v-if="showUserMenu" class="dropdown-menu user-menu">
                  <button class="dropdown-item" @click="editProfile">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                        fill="#153D1C"
                      />
                      <path
                        d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z"
                        fill="#153D1C"
                      />
                    </svg>
                    Modifier mon profil
                  </button>
                  <button class="dropdown-item" @click="openArchives">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 2C2 1.44772 2.44772 1 3 1H13C13.5523 1 14 1.44772 14 2V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2Z"
                        fill="#153D1C"
                      />
                      <path
                        d="M5 5H11M5 8H11M5 11H8"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    Archives
                  </button>
                  <button class="dropdown-item" @click="logout">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M11 11L14 8L11 5M14 8H6"
                        stroke="#153D1C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
            <div class="credits-info">
              <div class="country-flag">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/e618e18f51d15f192c7dc0b848f9165b1b48142d?width=24"
                  alt="Drapeau"
                  class="flag-icon"
                />
              </div>
              <div class="separator-dot"></div>
              <div class="credits-display">
                <span class="credits-text">3 crédits</span>
                <span class="credits-emoji">🪙</span>
              </div>
            </div>
          </div>
        </div>
        <div class="more-menu-container">
          <button
            class="more-options-btn"
            aria-label="Plus d'options"
            @click="toggleMoreMenu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11.9961 12H12.0051"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 12H18.009"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 12H6.00898"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div v-if="showMoreMenu" class="dropdown-menu more-menu">
            <button class="dropdown-item" @click="upgradePlan">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L8 15M8 1L12 5M8 1L4 5"
                  stroke="#153D1C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Passer à un forfait supérieur
            </button>
            <button class="dropdown-item" @click="openMembers">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 6C6.10457 6 7 5.10457 7 4C7 2.89543 6.10457 2 5 2C3.89543 2 3 2.89543 3 4C3 5.10457 3.89543 6 5 6Z"
                  fill="#153D1C"
                />
                <path
                  d="M11 6C12.1046 6 13 5.10457 13 4C13 2.89543 12.1046 2 11 2C9.89543 2 9 2.89543 9 4C9 5.10457 9.89543 6 11 6Z"
                  fill="#153D1C"
                />
                <path
                  d="M5 8C2.23858 8 0 10.2386 0 13H10C10 10.2386 7.76142 8 5 8Z"
                  fill="#153D1C"
                />
                <path
                  d="M16 13C16 10.7909 14.2091 9 12 9C11.2808 9 10.6056 9.1892 10 9.52624"
                  fill="#153D1C"
                />
              </svg>
              Membres
            </button>
            <button class="dropdown-item" @click="openHelp">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="#153D1C"
                  stroke-width="1.5"
                />
                <path
                  d="M6.5 6C6.5 5.17157 7.17157 4.5 8 4.5C8.82843 4.5 9.5 5.17157 9.5 6C9.5 6.82843 8.82843 7.5 8 7.5V8.5M8 11.5H8.005"
                  stroke="#153D1C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Aide et service client
            </button>
          </div>
        </div>
      </header>

      <!-- Partners Overview Section -->
      <section class="partners-section">
        <h2 class="section-title">Mes partenaires en un coup d'Œil...</h2>
        <div class="partners-carousel">
          <div class="partner-card partner-card--overdue">
            <div class="partner-status-header">
              <span class="status-text">En retard</span>
            </div>
            <div class="partner-content">
              <div class="partner-avatar">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="url(#pattern_martin)" />
                  <defs>
                    <pattern
                      id="pattern_martin"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <rect width="48" height="48" fill="#E0E0E0" />
                      <circle cx="24" cy="20" r="8" fill="#888" />
                      <ellipse cx="24" cy="40" rx="12" ry="8" fill="#888" />
                    </pattern>
                  </defs>
                </svg>
              </div>
              <div class="partner-info">
                <h3 class="partner-name">Martin Obiang</h3>
                <p class="partner-role">Comptable</p>
              </div>
            </div>
          </div>

          <div class="partner-card partner-card--due-soon">
            <div class="partner-status-header">
              <span class="status-text">Échéance dans 12j</span>
            </div>
            <div class="partner-content">
              <div class="partner-avatar">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="url(#pattern_nembot)" />
                  <defs>
                    <pattern
                      id="pattern_nembot"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <rect width="48" height="48" fill="#E0E0E0" />
                      <circle cx="24" cy="20" r="8" fill="#888" />
                      <ellipse cx="24" cy="40" rx="12" ry="8" fill="#888" />
                    </pattern>
                  </defs>
                </svg>
              </div>
              <div class="partner-info">
                <h3 class="partner-name">Nembot Fokam</h3>
                <p class="partner-role">Entrepreneur</p>
              </div>
            </div>
          </div>

          <div class="partner-card partner-card--due-soon">
            <div class="partner-status-header">
              <span class="status-text">Échéance dans 20j</span>
            </div>
            <div class="partner-content">
              <div class="partner-avatar">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="url(#pattern_sarah)" />
                  <defs>
                    <pattern
                      id="pattern_sarah"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <rect width="48" height="48" fill="#E0E0E0" />
                      <circle cx="24" cy="20" r="8" fill="#888" />
                      <ellipse cx="24" cy="40" rx="12" ry="8" fill="#888" />
                    </pattern>
                  </defs>
                </svg>
              </div>
              <div class="partner-info">
                <h3 class="partner-name">Sarah Mandeng</h3>
                <p class="partner-role">Sécrétaire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Group Messages Section -->
      <section class="messages-section">
        <h2 class="section-title">Mes relances groupées</h2>
        <div class="message-card">
          <div class="message-content">
            <div class="message-bubble">
              <p class="message-text">
                Salut {utilisateur}, Vous venez de dépasser les délais de
                paiement pour votre loyer du {date}. Appelez urgemment afin de
                conformer au contrat de bail initial. Merci.
              </p>
              <div class="sync-indicator">
                <span class="sync-text">Synchronisé sur</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <g clip-path="url(#clip0_2277_1251)">
                    <path
                      d="M14 10.4473C14 10.524 13.9976 10.6894 13.9928 10.8188C13.9808 11.1329 13.9568 11.538 13.9185 11.7226C13.861 12.0007 13.7771 12.262 13.6644 12.4801C13.5325 12.739 13.3647 12.9692 13.1634 13.1681C12.9644 13.3671 12.7342 13.5349 12.4753 13.6668C12.2572 13.7795 11.9935 13.8634 11.713 13.9209C11.5308 13.9568 11.1281 13.9832 10.8164 13.9928C10.687 13.9976 10.5216 14 10.4449 14H3.55034C3.47363 14 3.30822 13.9976 3.17877 13.9928C2.86473 13.9808 2.45959 13.9568 2.275 13.9185C1.99692 13.861 1.73562 13.7771 1.51747 13.6644C1.25856 13.5325 1.02842 13.3647 0.829452 13.1634C0.630479 12.9644 0.462671 12.7342 0.330822 12.4753C0.218151 12.2572 0.134247 11.9935 0.0767123 11.713C0.0407534 11.5308 0.0143836 11.1281 0.00479452 10.8164C0.00239726 10.6894 0 10.524 0 10.4473V3.55274C0 3.47603 0.00239726 3.31062 0.00719178 3.18116C0.0191781 2.86712 0.0431507 2.46199 0.0815068 2.2774C0.139041 1.99932 0.222945 1.73801 0.335616 1.51986C0.467466 1.26096 0.635274 1.03082 0.834247 0.831849C1.03322 0.632877 1.26336 0.465068 1.52226 0.333219C1.74041 0.220548 2.00411 0.136644 2.28459 0.0791096C2.46678 0.0431507 2.86952 0.0167808 3.18116 0.00719178C3.31062 0.00239726 3.47603 0 3.55274 0H10.4473C10.524 0 10.6894 0.00239726 10.8188 0.00719178C11.1329 0.0191781 11.538 0.0431507 11.7226 0.0815068C12.0007 0.139041 12.262 0.222945 12.4801 0.335616C12.739 0.467466 12.9692 0.635274 13.1681 0.836644C13.3671 1.03562 13.5349 1.26575 13.6668 1.52466C13.7795 1.74281 13.8634 2.00651 13.9209 2.28699C13.9568 2.46918 13.9832 2.87192 13.9928 3.18356C13.9976 3.31301 14 3.47842 14 3.55514V10.4473Z"
                      fill="url(#paint0_linear_2277_1251)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.6822 3.35149C9.74003 2.40937 8.48626 1.88916 7.15099 1.88916C4.39894 1.88916 2.16229 4.1282 2.15989 6.87786C2.15989 7.75765 2.39003 8.61587 2.82633 9.37101L2.11914 11.9577L4.76572 11.2648C5.49448 11.6628 6.31435 11.8714 7.15099 11.8714H7.15339C9.90305 11.8714 12.1421 9.63231 12.1445 6.88265C12.1445 5.54738 11.6243 4.29361 10.6822 3.35149ZM7.15339 11.0275C6.40784 11.0275 5.67668 10.8261 5.0414 10.4498L4.89037 10.3611L3.32017 10.7734L3.73969 9.24396L3.6414 9.08813C3.22667 8.42889 3.00613 7.66416 3.00613 6.88026C3.00613 4.59327 4.8688 2.733 7.15579 2.733C8.26332 2.733 9.30613 3.1645 10.0876 3.94841C10.8715 4.73231 11.303 5.77512 11.3006 6.88265C11.2983 9.16724 9.43798 11.0275 7.15339 11.0275ZM9.42839 7.92306C9.30373 7.86074 8.69003 7.55868 8.57736 7.51793C8.46229 7.47717 8.38079 7.4556 8.29688 7.58026C8.21298 7.70491 7.97565 7.98539 7.90133 8.0693C7.82942 8.1532 7.7551 8.16279 7.63044 8.10046C7.50578 8.03813 7.10305 7.90628 6.62839 7.48197C6.25681 7.15115 6.0075 6.74361 5.93558 6.61896C5.86366 6.4943 5.92839 6.42717 5.99072 6.36485C6.04585 6.30971 6.11537 6.21861 6.1777 6.14669C6.24003 6.07478 6.26161 6.02204 6.30236 5.93813C6.34311 5.85423 6.32394 5.78231 6.29277 5.71998C6.26161 5.65765 6.01229 5.04395 5.90921 4.79464C5.80852 4.55252 5.70544 4.58368 5.62873 4.58128C5.55681 4.57649 5.47291 4.57649 5.389 4.57649C5.3051 4.57649 5.17085 4.60765 5.05578 4.73231C4.94072 4.85697 4.61948 5.15902 4.61948 5.77272C4.61948 6.38642 5.06537 6.97854 5.1277 7.06245C5.19003 7.14635 6.0075 8.40491 7.25887 8.9443C7.55613 9.07375 7.78866 9.15046 7.97085 9.208C8.27051 9.30389 8.5414 9.2895 8.75715 9.25834C8.99688 9.22238 9.49551 8.95628 9.59859 8.66622C9.70168 8.37615 9.70168 8.12443 9.67051 8.07409C9.63455 8.01656 9.55305 7.98539 9.42839 7.92306Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_2277_1251"
                      x1="7.00053"
                      y1="14.0011"
                      x2="7.00053"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#25CF43" />
                      <stop offset="1" stop-color="#61FD7D" />
                    </linearGradient>
                    <clipPath id="clip0_2277_1251">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div class="message-schedule">
              <div class="schedule-item">10 juil. 2025</div>
              <div class="schedule-item">09:48</div>
            </div>

            <div class="reminder-controls">
              <div class="reminder-settings">
                <h3 class="reminder-title">Relances automatiques</h3>
                <div class="reminder-tags">
                  <span class="reminder-tag removable">
                    Martin
                    <button class="remove-tag-btn" aria-label="Retirer Martin">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M13.5 4.5L4.50061 13.4994M13.4994 13.5L4.5 4.50064"
                          stroke="#FFF9CE"
                          stroke-width="1.125"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </span>
                  <button class="reminder-tag add-tag">
                    Ajouter
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M2.25 15V13.4778C2.25 12.5461 2.66945 11.6324 3.51726 11.246C4.55138 10.7746 5.79159 10.5 7.125 10.5C8.0586 10.5 8.94652 10.6346 9.75 10.8771"
                        stroke="white"
                        stroke-width="1.125"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.125 8.25C8.57475 8.25 9.75 7.07475 9.75 5.625C9.75 4.17525 8.57475 3 7.125 3C5.67525 3 4.5 4.17525 4.5 5.625C4.5 7.07475 5.67525 8.25 7.125 8.25Z"
                        stroke="white"
                        stroke-width="1.125"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.875 3.1084C11.9593 3.43111 12.75 4.43556 12.75 5.62469C12.75 6.81383 11.9593 7.8183 10.875 8.14103"
                        stroke="white"
                        stroke-width="1.125"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.5 10.5V15M11.25 12.75H15.75"
                        stroke="white"
                        stroke-width="1.125"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="toggle-switch">
                <input type="checkbox" id="auto-reminders" checked />
                <label for="auto-reminders" class="toggle-slider">
                  <span class="toggle-handle"></span>
                </label>
              </div>
            </div>

            <button class="schedule-btn">
              Programmer le message
              <span class="coin-emoji">🪙</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Recent Actions Section -->
      <section class="actions-section">
        <h2 class="section-title">Actions récentes</h2>
        <div class="actions-card">
          <div class="action-item">
            <div class="action-info">
              <svg
                class="action-icon"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M13.5 20.0371C12.0328 20.0563 10.5713 20.0473 9.09883 20.0103C5.95033 19.9312 4.37608 19.8917 3.24496 18.7563C2.11383 17.6208 2.08114 16.0881 2.01577 13.0225C1.99475 12.0368 1.99474 11.057 2.01576 10.0713C2.08114 7.00573 2.11382 5.47296 3.24495 4.33753C4.37608 3.20209 5.95033 3.16254 9.09882 3.08344C11.0393 3.03469 12.9607 3.03469 14.9012 3.08345C18.0497 3.16256 19.6239 3.20211 20.7551 4.33754C21.8862 5.47297 21.9189 7.00574 21.9842 10.0713C21.9947 10.5641 22 11.0555 22 11.5469"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 5.54688L8.91302 9.47149C11.4387 10.9054 12.5613 10.9054 15.087 9.47149L22 5.54688"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 16.5469C16.4915 16.0412 17.7998 14.0469 18.5 14.0469M18.5 14.0469C19.2002 14.0469 20.5085 16.0412 21 16.5469M18.5 14.0469V22.0469"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="action-text">Relance envoyée à Salma</span>
            </div>
            <span class="action-time">1h</span>
          </div>

          <div class="action-divider"></div>

          <div class="action-item">
            <div class="action-info">
              <svg
                class="action-icon"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M12 8.04688C12 9.97987 10.433 11.5469 8.5 11.5469C6.567 11.5469 5 9.97987 5 8.04688C5 6.11388 6.567 4.54688 8.5 4.54688C10.433 4.54688 12 6.11388 12 8.04688Z"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                />
                <path
                  d="M13.5 11.5469C15.433 11.5469 17 9.97987 17 8.04688C17 6.11388 15.433 4.54688 13.5 4.54688"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M13.1429 20.5469H3.85714C2.83147 20.5469 2 19.7794 2 18.8326C2 16.4657 4.07868 14.5469 6.64286 14.5469H10.3571C11.4023 14.5469 12.3669 14.8657 13.1429 15.4037"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 14.5469V20.5469M22 17.5469H16"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <span class="action-text">Nouveau partenaire ajouté</span>
            </div>
            <span class="action-time">6h</span>
          </div>

          <div class="action-divider"></div>

          <div class="action-item">
            <div class="action-info">
              <svg
                class="action-icon"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M14.5 14.5479C14.5 15.9286 13.3807 17.0479 12 17.0479C10.6192 17.0479 9.5 15.9286 9.5 14.5479C9.5 13.1672 10.6192 12.0479 12 12.0479C13.3807 12.0479 14.5 13.1672 14.5 14.5479Z"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 7.5498C18.9452 7.63454 20.3228 7.95362 21.1329 8.20467C21.6756 8.37286 22 8.88724 22 9.4554V19.2302C22 20.3453 20.7719 21.1844 19.6762 20.9774C18.7361 20.7999 17.5107 20.6573 16 20.6573C11.2491 20.6573 10.1096 22.463 3.1448 20.9271C2.47265 20.7789 2 20.1744 2 19.4861V9.46904C2 8.49319 2.92079 7.78154 3.87798 7.97148C5.31598 8.25684 6.49012 8.39037 7.5 8.4264"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 11.5479C3.95133 11.5479 5.70483 9.95292 5.92901 8.30201M18.5005 8.04785C18.5005 10.0875 20.2655 12.0169 22 12.0169M22 17.5479C20.1009 17.5479 18.2601 18.8581 18.102 20.6462M6.00049 21.044C6.00049 18.8348 4.20963 17.044 2.00049 17.044"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 9.04785V3.54785M12 9.04785C12.7002 9.04785 14.5 6.54785 14.5 6.54785M12 9.04785C11.2998 9.04785 9.5 6.54785 9.5 6.54785"
                  stroke="#153D1C"
                  stroke-opacity="0.64"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="action-text">Paiement reçu par Martin</span>
            </div>
            <span class="action-time">7h</span>
          </div>

          <div class="action-divider"></div>

          <button class="show-more-btn">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path
                d="M11.9961 12.5469H12.0051"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 12.5469H18.009"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 12.5469H6.00898"
                stroke="#153D1C"
                stroke-opacity="0.64"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Afficher plus
          </button>
        </div>
      </section>
    </div>

    <!-- Floating Action Button -->
    <div class="fab-container">
      <button class="floating-action-btn" aria-label="Ajouter un partenaire">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 8.5C14 5.73858 11.7614 3.5 9 3.5C6.23858 3.5 4 5.73858 4 8.5C4 11.2614 6.23858 13.5 9 13.5C11.7614 13.5 14 11.2614 14 8.5Z"
            fill="#141B34"
            stroke="#141B34"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 20.5C16 16.634 12.866 13.5 9 13.5C5.13401 13.5 2 16.634 2 20.5H16Z"
            fill="#141B34"
            stroke="#141B34"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M19 9V15M22 12H16"
            stroke="#141B34"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// State
const autoReminders = ref(true);
const showUserMenu = ref(false);
const showMoreMenu = ref(false);

// Methods
const toggleAutoReminders = () => {
  autoReminders.value = !autoReminders.value;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showMoreMenu.value) showMoreMenu.value = false;
};

const toggleMoreMenu = () => {
  showMoreMenu.value = !showMoreMenu.value;
  if (showUserMenu.value) showUserMenu.value = false;
};

const editProfile = () => {
  console.log("Modifier profil");
  showUserMenu.value = false;
};

const openArchives = () => {
  console.log("Ouvrir archives");
  showUserMenu.value = false;
};

const logout = () => {
  console.log("Déconnexion");
  showUserMenu.value = false;
};

const upgradePlan = () => {
  console.log("Passer à un forfait supérieur");
  showMoreMenu.value = false;
};

const openMembers = () => {
  console.log("Ouvrir membres");
  showMoreMenu.value = false;
};

const openHelp = () => {
  console.log("Aide et service client");
  showMoreMenu.value = false;
};

const removePartner = () => {
  // Logic to remove partner from reminders
};

const addPartner = () => {
  // Logic to add partner to reminders
};

const scheduleMessage = () => {
  // Logic to schedule message
};

const showMoreActions = () => {
  // Logic to show more actions
};
</script>

<style scoped>
/* Base styles */
.dashboard-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 35px 32px;
  font-family:
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}

.dashboard-container {
  width: 100%;
  max-width: 381px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* User Header */
.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  width: 100%;
  height: 46px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 640px) {
  .avatar-image {
    height: 52px;
    width: 52px;
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(21, 61, 28, 0.15);
  border: 1px solid rgba(21, 61, 28, 0.1);
  padding: 8px 0;
  min-width: 200px;
  z-index: 1000;
  margin-top: 8px;
}

.user-menu {
  left: 0;
  right: auto;
}

.more-menu {
  right: 0;
  left: auto;
}

.more-menu-container {
  position: relative;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  font-family:
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #153d1c;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(21, 61, 28, 0.05);
}

.dropdown-item svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.user-name {
  color: #153d1c;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.2px;
  margin: 0;
}

.dropdown-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credits-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag-icon {
  width: 12px;
  height: 12px;
}

.separator-dot {
  width: 2px;
  height: 2px;
  background: #153d1c;
  border-radius: 50%;
}

.credits-display {
  display: flex;
  align-items: flex-end;
  gap: 5px;
}

.credits-text {
  color: #31920b;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.2px;
}

@media (max-width: 640px) {
  .credits-text {
    font-size: 16px;
  }
}

.credits-emoji {
  color: #31920b;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.7;
}

.more-options-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Section Titles */
.section-title {
  color: rgba(21, 61, 28, 0.64);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0;
}

/* Partners Section */
.partners-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.partners-carousel {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.partners-carousel::-webkit-scrollbar {
  display: none;
}

.partner-card {
  min-width: 157px;
  height: 185px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.partner-card--overdue {
  background: #fff;
  position: relative;
}

.partner-card--overdue .partner-status-header {
  background: #eb002d;
  height: 84px;
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 21px;
}

.partner-card--due-soon {
  background: #fff;
  position: relative;
}

.partner-card--due-soon .partner-status-header {
  background: #f59100;
  height: 84px;
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 21px;
}

.partner-card--paid .partner-status-header {
  background: #31920b;
  height: 84px;
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 21px;
}

.partner-status-header {
  width: 100%;
}

.status-text {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.14px;
  text-transform: capitalize;
  text-align: center;
}

.partner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  padding: 27px 21px 21px;
  flex: 1;
}

.partner-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.partner-avatar svg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

@media (max-width: 640px) {
  .partner-avatar svg {
    margin-top: -2px;
  }
}

.partner-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.partner-name {
  color: #153d1c;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0;
}

.partner-role {
  color: #153d1c;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
  margin: 0;
}

/* Messages Section */
.messages-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-card {
  padding: 18px 38px;
  background: #fff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-bubble {
  background: #f8f6f4;
  border-radius: 18px;
  padding: 18px;
  position: relative;
  min-height: 142px;
}

.message-text {
  color: rgba(21, 61, 28, 0.64);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.24;
  letter-spacing: -0.16px;
  margin: 0 0 40px 0;
}

.sync-indicator {
  position: absolute;
  bottom: 11px;
  right: 17px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sync-text {
  color: rgba(21, 61, 28, 0.64);
  font-size: 10px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.24;
  letter-spacing: -0.1px;
}

.message-schedule {
  display: flex;
  gap: 8px;
}

.schedule-item {
  flex: 1;
  padding: 16px;
  background: #fff9ce;
  border-radius: 8px;
  color: #153d1c;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
  text-align: center;
}

.reminder-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px;
}

.reminder-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reminder-title {
  color: #153d1c;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0;
}

.reminder-tags {
  display: flex;
  gap: 8px;
}

.reminder-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #31920b;
  border-radius: 48px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.14px;
}

.reminder-tag.removable {
  color: #fff9ce;
}

.reminder-tag.add-tag {
  color: #fff;
}

.remove-tag-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-switch {
  position: relative;
  width: 54px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #153d1c;
  border-radius: 16px;
  transition: 0.3s;
}

.toggle-handle {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .toggle-slider .toggle-handle {
  transform: translateX(-24px);
}

.schedule-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 14px;
  background: #31920b;
  border: none;
  border-radius: 28px;
  color: #fff9ce;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.2px;
  cursor: pointer;
  width: 100%;
}

.coin-emoji {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

/* Actions Section */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions-card {
  background: #fff;
  border-radius: 18px;
  padding: 20px 16px;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.action-info {
  display: flex;
  align-items: center;
  gap: 9px;
}

.action-icon {
  width: 24px;
  height: 24px;
  color: rgba(21, 61, 28, 0.64);
}

.action-text {
  color: #153d1c;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
}

.action-time {
  color: #153d1c;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
}

.action-divider {
  width: 100%;
  height: 0.5px;
  background: rgba(21, 61, 28, 0.14);
  margin: 12px 0;
}

.show-more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  color: rgba(21, 61, 28, 0.64);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.18px;
  width: 100%;
}

/* Floating Action Button */
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.floating-action-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(170deg, #e1f524 0%, #b9f524 97.69%);
  border: 1.75px solid #fff;
  box-shadow:
    0px 0px 0px #eeff49,
    0px 1.173px 2.347px #e7ff00;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #141b34;
  transition: transform 0.2s ease;
}

.floating-action-btn:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-wrapper {
    padding: 20px 16px;
  }

  .dashboard-container {
    max-width: 100%;
  }

  .user-header {
    gap: 20px;
  }

  .partners-carousel {
    gap: 12px;
  }

  .partner-card {
    min-width: 140px;
    height: 160px;
  }

  .message-card {
    padding: 16px 20px;
  }

  .fab-container {
    bottom: 16px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .user-name {
    font-size: 18px;
  }

  .credits-text {
    font-size: 18px;
  }

  .section-title {
    font-size: 16px;
  }

  .reminder-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .dashboard-container {
    max-width: 500px;
  }

  .partners-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(157px, 1fr));
    gap: 20px;
    overflow: visible;
  }

  .message-card {
    padding: 24px 48px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-action-btn,
  .toggle-handle {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .partner-card {
    border: 2px solid #153d1c;
  }

  .toggle-slider {
    border: 2px solid #153d1c;
  }
}
</style>
