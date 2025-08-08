<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- User Header Section -->
      <header class="user-header">
        <div class="user-info">
          <div class="user-avatar">
            <img
              :src="userPhoto"
              :alt="`Profile de ${userName}`"
              class="avatar-image"
              loading="lazy"
            />
          </div>
          <div class="user-details">
            <div class="user-name-row">
              <h1 class="user-name">{{ userFullName }}</h1>
              <div class="dropdown-container">
                <button
                  class="dropdown-btn"
                  aria-label="Menu utilisateur"
                  @click="showDashboardMenu = !showDashboardMenu"
                  tabindex="0"
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
                <transition name="fade-slide">
                  <DashboardMenu v-if="showDashboardMenu" @select="handleMenuSelect" style="position:absolute;top:110%;right:0;z-index:1001;" />
                </transition>
              </div>
            </div>
            <div class="credits-info">
              <div class="country-flag">
                <img
                  :src="userCountryFlag"
                  :alt="`Drapeau ${userCountry}`"
                  class="flag-icon"
                  loading="lazy"
                />
              </div>
              <div class="separator-dot"></div>
              <div class="credits-display">
                <span class="credits-text">{{ userCredits }} crédits</span>
                <svg 
                  class="credits-icon" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  aria-label="Icône de crédits"
                >
                  <defs>
                    <linearGradient id="creditGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#31920b;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#153d1c;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <circle cx="8" cy="8" r="7" fill="url(#creditGradient)" stroke="#31920b" stroke-width="0.5"/>
                  <path d="M8 3L8 13M5 6L8 3L11 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="8" cy="10" r="1.5" fill="white" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="more-menu-container">
          <button
            class="more-options-btn"
            aria-label="Plus d'options"
            aria-haspopup="true"
            :aria-expanded="showMoreMenu.toString()"
            aria-controls="more-menu-dropdown"
            @click="toggleMoreMenu"
            @keydown.down.prevent="focusFirstMoreMenuItem"
            @keydown.enter.prevent="toggleMoreMenu"
            @keydown.esc="closeMoreMenu"
            tabindex="0"
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
          <transition name="fade-slide">
            <div
              v-if="showMoreMenu"
              class="dropdown-menu more-menu"
              id="more-menu-dropdown"
              role="menu"
              @keydown.esc="closeMoreMenu"
              @keydown.tab="closeMoreMenu"
              @focusout="onMoreMenuBlur"
            >
              <button class="dropdown-item" role="menuitem" ref="moreMenuFirstItem" @click="upgradePlan" tabindex="0">
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
              <button class="dropdown-item" role="menuitem" @click="openMembers" tabindex="0">
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
              <button class="dropdown-item" role="menuitem" @click="openHelp" tabindex="0">
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
          </transition>
        </div>
      </header>
      <!-- Buy Credits Card Section -->
      <BuyCreditsCard />
      <!-- Partners Overview Section -->
      <section class="partners-section">
        <h2 class="section-title">Mes partenaires en un coup d'Œil...</h2>
        <div v-if="partnersLoading" class="section-loader">Chargement des partenaires...</div>
        <div v-else-if="partnersError" class="section-error">{{ partnersError }}</div>
        <div v-else-if="!partners.length" class="section-empty">Aucun partenaire à afficher.</div>
        <div v-else class="partners-carousel">
          <transition-group name="fade-slide" tag="div" class="partners-carousel">
            <PartnerCard
              v-for="(partner, idx) in partners"
              :key="partner.id || partner.name"
              v-bind="partner"
              @click="goToPartnerProfile(partner)"
            />
          </transition-group>
        </div>
      </section>

      <!-- Group Messages Section -->
      <section class="messages-section">
        <h2 class="section-title">Mes relances groupées</h2>
        <div v-if="relancesLoading" class="section-loader">Chargement des relances...</div>
        <div v-else-if="relancesError" class="section-error">{{ relancesError }}</div>
        <div v-else-if="!relances.length" class="section-empty">Aucune relance à afficher.</div>
        <div class="message-card">
          <div class="message-content">
            <div class="message-bubble">
              <div class="edit-message-row-stable">
                <template v-if="isEditingMessage">
                  <textarea
                    id="edit-message-textarea"
                    v-model="messageText"
                    class="edit-message-textarea"
                    rows="4"
                    :placeholder="'Écrivez votre message…'"
                    @keydown.enter.exact.prevent="saveEditMessage"
                    @blur="saveEditMessage"
                  ></textarea>
                  <button class="edit-message-btn" @click="saveEditMessage" aria-label="Valider le message">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#31920b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </button>
                </template>
                <template v-else>
                  <p class="message-text" :class="{'message-placeholder': !messageText}">{{ messageText || 'Écrivez votre message…' }}</p>
                  <button class="edit-message-btn edit-message-btn-absolute" @click="startEditMessage" aria-label="Éditer le message">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 17.25V14.8787C3 14.3161 3.31607 13.7893 3.82843 13.5L14.5 7.5C15.0124 7.21071 15.6839 7.21071 16.1962 7.5L17.25 8.12132C17.7624 8.41061 18.0784 8.93739 18.0784 9.5V11.8713C18.0784 12.4339 17.7624 12.9607 17.25 13.25L6.57843 19.25C6.06607 19.5393 5.39462 19.5393 4.88226 19.25L3.82843 18.6287C3.31607 18.3394 3 17.8126 3 17.25Z" stroke="#153d1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </button>
                </template>
              </div>
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

            <div class="message-schedule-calendly">
              <div class="schedule-item-calendly" tabindex="0" @click="openDatePicker" @keydown.enter.prevent="openDatePicker" aria-label="Choisir la date" ref="dateBtnRef">
                <span class="schedule-icon-calendly">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="11" rx="4" fill="#fff"/><rect x="3" y="6" width="14" height="11" rx="4" stroke="#31920b" stroke-width="1.5"/><rect x="6" y="2" width="2" height="4" rx="1" fill="#31920b"/><rect x="12" y="2" width="2" height="4" rx="1" fill="#31920b"/><rect x="3" y="9" width="14" height="1.5" fill="#1ef524"/></svg>
                </span>
                <span class="schedule-text-calendly">{{ formatDate(selectedDate) }}</span>
                <div v-if="showDatePicker" class="datepicker-popover-vanialog" tabindex="-1" ref="datePickerRef">
                  <div class="datepicker-header">
                    <button class="datepicker-nav" @click.stop="prevMonth" aria-label="Mois précédent">‹</button>
                    <span class="datepicker-title">{{ monthNames[pickerMonth] }} {{ pickerYear }}</span>
                    <button class="datepicker-nav" @click.stop="nextMonth" aria-label="Mois suivant">›</button>
                  </div>
                  <div class="datepicker-grid">
                    <span v-for="d in ['L','M','M','J','V','S','D']" :key="d" class="datepicker-dayname">{{ d }}</span>
                    <span v-for="n in firstDay" :key="'empty'+n" class="datepicker-empty"></span>
                    <button v-for="day in daysInMonth" :key="day" class="datepicker-day"
                      :class="{selected: isSelected(day), today: isToday(day)}"
                      @click.stop="selectDate(day)"
                      :aria-label="'Choisir le ' + day + ' ' + monthNames[pickerMonth] + ' ' + pickerYear"
                    >{{ day }}</button>
                  </div>
                  <button class="datepicker-today-btn" @click.stop="selectDate(today.getDate())">Aujourd'hui</button>
                </div>
              </div>
              <div class="schedule-item-calendly" tabindex="0" @click="openTimePicker" @keydown.enter.prevent="openTimePicker" aria-label="Choisir l'heure" ref="timeBtnRef">
                <span class="schedule-icon-calendly">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff" stroke="#31920b" stroke-width="1.5"/><path d="M10 6V10L13 12" stroke="#31920b" stroke-width="1.5" stroke-linecap="round"/></svg>
                </span>
                <span class="schedule-text-calendly">{{ selectedTime }}</span>
                <div v-if="showCustomTimePicker" class="timepicker-popover-vanialog" tabindex="-1" ref="timePickerRef">
                  <div class="timepicker-header">Heure</div>
                  <div class="timepicker-doublecol">
                    <div class="timepicker-col timepicker-col-hour">
                      <div class="timepicker-col-title">Heure</div>
                      <div class="timepicker-col-list">
                        <button v-for="h in hours" :key="h" class="timepicker-col-btn"
                          :class="{selected: pickedHour === h}"
                          @click.stop="pickHour(h)"
                          :aria-label="'Choisir ' + h + 'h'"
                        >{{ h }}</button>
                      </div>
                    </div>
                    <div class="timepicker-col timepicker-col-minute">
                      <div class="timepicker-col-title">Minute</div>
                      <div class="timepicker-col-list">
                        <button v-for="m in minutes" :key="m" class="timepicker-col-btn"
                          :class="{selected: pickedMinute === m}"
                          @click.stop="pickMinute(m)"
                          :aria-label="'Choisir ' + pickedHour + 'h' + m"
                        >{{ m }}</button>
                      </div>
                    </div>
                  </div>
                  <button class="timepicker-now-btn" @click.stop="setNow">Maintenant</button>
                </div>
              </div>
            </div>

            <div class="reminder-controls">
              <div class="reminder-settings-premium">
                <div class="reminder-title-row-premium">
                <h3 class="reminder-title">Relances automatiques</h3>
                  <span class="recipients-count-badge-premium">{{ recipients.length }}</span>
                </div>
                <div class="recipients-chips-row" tabindex="0" aria-label="Liste des destinataires">
                  <transition-group name="fade-slide" tag="div" class="chips-scrollable">
                    <span v-for="(recipient, idx) in recipients.slice(0, 4)" :key="recipient.name" class="recipient-chip">
                      <img :src="recipient.avatar" :alt="recipient.name" class="recipient-chip-avatar" />
                      <span class="recipient-chip-name">{{ recipient.name }}</span>
                      <button class="recipient-chip-remove" aria-label="Retirer {{recipient.name}}" @click="removeRecipient(idx)">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </button>
                  </span>
                  </transition-group>
                  <span v-if="recipients.length > 4" class="recipients-badge-premium">+{{ recipients.length - 4 }}</span>
                  <button class="recipient-chip-add" @click="openPartnerModal" aria-label="Ajouter un destinataire">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#31920B"/><path d="M10 6V14M6 10H14" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <button class="schedule-btn" @click="scheduleMessage">
              Programmer le message
              <span class="credit-btn-group">
                <span class="credit-count-btn">{{ recipients.length }}</span>
                <span class="credit-icon-btn">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-label="Icône de crédits">
                    <defs>
                      <linearGradient id="creditGradientBtn" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#31920b;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#153d1c;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <circle cx="8" cy="8" r="7" fill="url(#creditGradientBtn)" stroke="#31920b" stroke-width="0.5"/>
                    <path d="M8 3L8 13M5 6L8 3L11 6" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="8" cy="10" r="1.5" fill="white" opacity="0.8"/>
                  </svg>
                </span>
              </span>
            </button>
            <transition name="fade-slide">
              <div v-if="showToast" class="toast-success">
                ✅ Message programmé avec succès !
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- Recent Actions Section -->
      <section class="actions-section">
        <h2 class="section-title">Actions récentes</h2>
        <div v-if="actionsLoading" class="section-loader">Chargement des actions...</div>
        <div v-else-if="actionsError" class="section-error">{{ actionsError }}</div>
        <div v-else-if="!actions.length" class="section-empty">Aucune action récente.</div>
        <div v-else class="actions-card">
          <div class="action-item" v-for="action in actions" :key="action.id">
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
              <span class="action-text">{{ action.text }}</span>
            </div>
            <span class="action-time">{{ action.time }}</span>
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

          <button v-if="actionsHasMore && !actionsLoading" class="show-more-btn" @click="showMoreActions" aria-label="Afficher plus d'actions">Afficher plus</button>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="stats-section">
        <h2 class="section-title">Statistiques</h2>
        <div v-if="statsLoading" class="section-loader">Chargement des statistiques...</div>
        <div v-else-if="statsError" class="section-error">{{ statsError }}</div>
        <div v-else-if="!stats" class="section-empty">Aucune statistique à afficher.</div>
        <div v-else class="stats-content">
          <!-- Affichage des stats dynamiques, ex : -->
          <div>Nombre de relances : {{ stats.nbRelances }}</div>
          <div>Montant total : {{ stats.montantTotal }}</div>
          <!-- ... -->
        </div>
      </section>

      <!-- Floating Action Button -->
      <div class="fab-container">
        <button class="floating-action-btn" @click="goToAddPartner">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 7V29M7 18H29"
              stroke="#141B34"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <PopupSuccess :visible="showSuccessPopup" :message="successMessage" @close="showSuccessPopup = false" />
      <PopupError :visible="showErrorPopup" :message="errorMessage" @close="showErrorPopup = false" />
    </div>
  </div>

  <!-- MODAL PARTENAIRES : placer tout en bas du template -->
  <transition name="fade-slide">
    <div v-if="showPartnerModal" class="partner-modal-overlay premium" @click.self="closePartnerModal" tabindex="-1" aria-modal="true" role="dialog">
      <div class="partner-modal premium">
        <div class="partner-modal-header premium">
          <h2 class="partner-modal-title premium">Ajouter un partenaire à la relance</h2>
          <button class="partner-modal-close premium" @click="closePartnerModal" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
        <input class="partner-modal-search premium" v-model="searchPartner" placeholder="Rechercher un partenaire…" aria-label="Rechercher un partenaire" />
        <div class="partner-modal-list premium">
          <div v-for="partner in filteredPartners" :key="partner.name" class="partner-modal-item premium" @click="togglePartnerSelection(partner.name)" :aria-checked="selectedPartners.includes(partner.name)" role="checkbox" tabindex="0">
            <img :src="partner.avatar" :alt="partner.name" class="partner-modal-avatar premium" />
            <div class="partner-modal-info premium">
              <span class="partner-modal-name premium">{{ partner.name }}</span>
              <span class="partner-modal-role premium">{{ partner.role }}</span>
            </div>
            <span class="partner-modal-checkbox premium" :class="{selected: selectedPartners.includes(partner.name)}">
              <svg v-if="selectedPartners.includes(partner.name)" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#39FF14"/><path d="M5 9.5L8 12.5L13 7.5" stroke="#181818" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
          </div>
        </div>
        <button class="partner-modal-validate premium" @click="validatePartnerSelection">✔️ Ajouter à la relance</button>
      </div>
      <div class="partner-modal-glow">
        <span class="partner-modal-glow-icon">⚡</span> Sélectionnez vos partenaires
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "../stores/user.js";
import { getFlagPath } from "../utils/countryUtils.js";
import PartnerCard from '../components/molecules/PartnerCard.vue';
import BuyCreditsCard from '../components/molecules/BuyCreditsCard.vue';
import DashboardMenu from '../components/molecules/DashboardMenu.vue';
import { useRouter } from 'vue-router';
import PopupSuccess from '../components/molecules/PopupSuccess.vue';
import PopupError from '../components/molecules/PopupError.vue';
import PartnerService from '../services/partnerService.js';
import RelanceService from '../services/relanceService.js';
import ActionsService from '../services/actionsService.js';
import StatsService from '../services/statsService.js';

// Store
const userStore = useUserStore();
const router = useRouter();

// State
const showUserMenu = ref(false);
const showMoreMenu = ref(false);
const userMenuFirstItem = ref(null);
const moreMenuFirstItem = ref(null);
const isDarkMode = ref(false);
const showToast = ref(false);
const isEditingMessage = ref(false);
const messageText = ref("Salut utilisateur, Vous venez de dépasser les délais de paiement pour votre loyer du date. Appelez urgemment afin de conformer au contrat de bail initial. Merci.");
const showPartnerModal = ref(false);
const partners = ref([]);
const partnersLoading = ref(false);
const partnersError = ref("");
const searchPartner = ref('');
const selectedPartners = ref([]);
const selectedDate = ref('2025-07-10');
const selectedTime = ref('09:48');
const showDatePicker = ref(false);
const showTimePicker = ref(false);
const today = new Date();
const dateObj = computed(() => new Date(selectedDate.value));
const pickerMonth = ref(dateObj.value.getMonth());
const pickerYear = ref(dateObj.value.getFullYear());
const daysInMonth = computed(() => new Date(pickerYear.value, pickerMonth.value + 1, 0).getDate());
const firstDay = computed(() => new Date(pickerYear.value, pickerMonth.value, 1).getDay());
const monthNames = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const showCustomTimePicker = ref(false);
const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({length: 12}, (_, i) => (i*5).toString().padStart(2, '0'));
const pickedHour = ref(selectedTime.value.split(':')[0]);
const pickedMinute = ref(selectedTime.value.split(':')[1]);
const datePickerRef = ref(null);
const timePickerRef = ref(null);
const dateBtnRef = ref(null);
const timeBtnRef = ref(null);

// Menu state
const showDashboardMenu = ref(false);
const showSuccessPopup = ref(false);
const showErrorPopup = ref(false);
const successMessage = ref('Message programmé avec succès !');
const errorMessage = ref('Crédits insuffisants pour programmer la relance.');

const relances = ref([]);
const relancesLoading = ref(false);
const relancesError = ref("");

const actions = ref([]);
const actionsLoading = ref(false);
const actionsError = ref("");
const actionsPage = ref(1);
const actionsHasMore = ref(true);

const stats = ref(null);
const statsLoading = ref(false);
const statsError = ref("");

function handleMenuSelect(action) {
  showDashboardMenu.value = false;
  console.log(`[FRONTEND] [${new Date().toISOString()}] Navigation vers page: ${action}`);
  switch(action) {
    case 'editProfile':
      router.push('/user-info-modify');
      break;
    case 'archives':
      router.push('/archives');
      break;
    case 'upgrade':
      router.push('/credits');
      break;
    case 'members':
      router.push('/userinfopage');
      break;
    case 'help':
      router.push('/faq');
      break;
    case 'logout':
      logout();
      break;
  }
}

function handleClickOutside(e) {
  // Ne pas fermer si on clique sur le bouton qui ouvre le picker
  if (dateBtnRef.value && dateBtnRef.value.contains(e.target)) return;
  if (timeBtnRef.value && timeBtnRef.value.contains(e.target)) return;
  if (showDatePicker.value && datePickerRef.value && !datePickerRef.value.contains(e.target)) {
    showDatePicker.value = false;
  }
  if (showCustomTimePicker.value && timePickerRef.value && !timePickerRef.value.contains(e.target)) {
    showCustomTimePicker.value = false;
  }
}
function handleEscape(e) {
  if (e.key === 'Escape') {
    if (showDatePicker.value) showDatePicker.value = false;
    if (showCustomTimePicker.value) showCustomTimePicker.value = false;
  }
}
onMounted(() => {
  console.log(`[FRONTEND] [${new Date().toISOString()}] Chargement profil utilisateur...`);
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});

// Initialisation des données utilisateur
onMounted(async () => {
  // Si pas de données utilisateur dans le store, essayer de les récupérer
  if (!userStore.utilisateur) {
    const phone = localStorage.getItem('otpPhone') || '';
    if (phone) {
      console.log('🔄 Chargement des données utilisateur pour le dashboard...');
      await userStore.verifierUtilisateur(phone);
    }
  }
  // Charger dynamiquement les partenaires
  partnersLoading.value = true;
  partnersError.value = "";
  try {
    const data = await PartnerService.getPartners();
    partners.value = Array.isArray(data) ? data : (data.partners || []);
  } catch (err) {
    partnersError.value = err.message || 'Erreur lors du chargement des partenaires';
  } finally {
    partnersLoading.value = false;
  }
  // Charger dynamiquement les relances
  relancesLoading.value = true;
  relancesError.value = "";
  try {
    const data = await RelanceService.getRelances();
    relances.value = Array.isArray(data) ? data : (data.relances || []);
  } catch (err) {
    relancesError.value = err.message || 'Erreur lors du chargement des relances';
  } finally {
    relancesLoading.value = false;
  }
  // Charger dynamiquement les actions
  await loadActions(1);
  // Charger dynamiquement les statistiques
  await loadStats();
});

// Computed properties from store
const userData = computed(() => {
  const data = userStore.utilisateur;
  console.log('📋 Données utilisateur complètes:', data);
  return data;
});
const userName = computed(() => userData.value?.nom || "Utilisateur");
const userPhoto = computed(() => {
  const photoProfil = userData.value?.photoProfil;
  console.log('📸 Photo de profil:', photoProfil);
  
  if (!photoProfil) {
    // Image par défaut moderne et engageante
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23153d1c;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2331920b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='50' fill='url(%23grad1)'/%3E%3Ccircle cx='50' cy='35' r='15' fill='white' opacity='0.9'/%3E%3Cpath d='M25 75 Q50 55 75 75' fill='white' opacity='0.9'/%3E%3C/svg%3E";
  }
  
  // Si c'est déjà une URL complète, l'utiliser
  if (photoProfil.startsWith('http')) {
    return photoProfil;
  }
  
  // Sinon, construire l'URL avec le nouveau système
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const photoUrl = `${baseUrl}/static/profile-photos/${photoProfil}`;
  console.log('🔗 URL construite:', photoUrl);
  return photoUrl;
});
const userCredits = computed(() => userData.value?.credits || 3);

// Computed properties for full name and country flag
const userFullName = computed(() => {
  const nom = userData.value?.nom || "";
  const prenom = userData.value?.prenom || "";
  console.log('👤 Nom:', nom, 'Prénom:', prenom);
  
  if (nom && prenom) {
    const fullName = `${nom} ${prenom}`;
    console.log('✅ Nom complet:', fullName);
    return fullName;
  } else if (nom) {
    console.log('✅ Nom seulement:', nom);
    return nom;
  } else if (prenom) {
    console.log('✅ Prénom seulement:', prenom);
    return prenom;
  }
  console.log('⚠️ Aucun nom trouvé, utilisation de "Utilisateur"');
  return "Utilisateur";
});

const userCountry = computed(() => {
  const country = userData.value?.country || "";
  console.log('🌍 Pays de l\'utilisateur:', country);
  return country;
});

const userCountryFlag = computed(() => {
  const flagPath = getFlagPath(userCountry.value);
  console.log('🏁 Chemin du drapeau:', flagPath);
  return flagPath;
});

// Dynamic data for message template
const utilisateur = ref("utilisateur");
const date = ref("date");

// Methods
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
  router.push('/buy-credits');
  showMoreMenu.value = false;
};

const openMembers = () => {
  router.push('/userinfopage');
  showMoreMenu.value = false;
};

const openHelp = () => {
  router.push('/faq');
  showMoreMenu.value = false;
};

const removePartner = () => {
  // Logic to remove partner from reminders
};

const addRecipient = () => {
  recipients.value.push({ name: 'Nouveau', avatar: 'https://ui-avatars.com/api/?name=Nouveau&background=31920B&color=fff' });
};

const removeRecipient = (idx) => {
  recipients.value.splice(idx, 1);
};

async function scheduleMessage() {
  if (userCredits.value >= recipients.value.length) {
    try {
      // Construire les données de relance à envoyer
      const relanceData = {
        destinataires: recipients.value.map(r => r.id || r.name),
        message: messageText.value,
        date: selectedDate.value,
        heure: selectedTime.value
      };
      console.log(`[FRONTEND] [${new Date().toISOString()}] Action: Programmation relance, Payload:`, relanceData);
      const result = await RelanceService.createRelance(relanceData);
      if (result && result.success) {
        showSuccessPopup.value = true;
        // Rafraîchir la liste des relances
        try {
          const data = await RelanceService.getRelances();
          relances.value = Array.isArray(data) ? data : (data.relances || []);
        } catch {}
        // Rafraîchir le solde utilisateur
        await userStore.forcerRecuperationUtilisateur(userStore.telephone);
      } else {
        showErrorPopup.value = true;
        errorMessage.value = result.message || 'Erreur lors de la programmation de la relance';
      }
    } catch (err) {
      showErrorPopup.value = true;
      errorMessage.value = err.message || 'Erreur lors de la programmation de la relance';
    }
  } else {
    showErrorPopup.value = true;
    errorMessage.value = 'Crédits insuffisants pour programmer la relance.';
  }
  showToast.value = false;
}

const showMoreActions = () => {
  if (actionsHasMore.value && !actionsLoading.value) {
    loadActions(actionsPage.value + 1);
  }
};

const closeUserMenu = () => {
  showUserMenu.value = false;
};
const closeMoreMenu = () => {
  showMoreMenu.value = false;
};
const onUserMenuBlur = (e) => {
  // Ferme le menu si focus sort du menu
  if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    closeUserMenu();
  }
};
const onMoreMenuBlur = (e) => {
  if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    closeMoreMenu();
  }
};
const focusFirstUserMenuItem = async () => {
  await nextTick();
  userMenuFirstItem.value?.focus();
};
const focusFirstMoreMenuItem = async () => {
  await nextTick();
  moreMenuFirstItem.value?.focus();
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

const goToAddPartner = () => {
  router.push('/add-partner');
};

const startEditMessage = () => {
  isEditingMessage.value = true;
  nextTick(() => {
    document.getElementById('edit-message-textarea')?.focus();
  });
};
const saveEditMessage = () => {
  isEditingMessage.value = false;
};

// PARTENAIRES PAR DÉFAUT POUR LE DASHBOARD
const partnerCards = [
  {
    id: 1,
    name: "Martin Obiang",
    role: "Comptable",
    status: "overdue",
    statusText: "En Retard"
  },
  {
    id: 2,
    name: "Nembot Fokam",
    role: "Entrepreneur",
    status: "due-soon",
    statusText: "Échéance Dans 12j"
  },
  {
    id: "3",
    name: "Sarah",
    role: "Séc",
    status: "due-soon",
    statusText: "Échéance"
  }
];

const recipients = ref([
  { name: 'Martin', avatar: 'https://ui-avatars.com/api/?name=Martin&background=31920B&color=fff' },
  { name: 'Sarah', avatar: 'https://ui-avatars.com/api/?name=Sarah&background=31920B&color=fff' }
]);
const maxAvatars = 3;

const openPartnerModal = () => {
  console.log(`[FRONTEND] [${new Date().toISOString()}] Modal affiché: Ajout partenaire.`);
  selectedPartners.value = recipients.value.map(r => r.name);
  showPartnerModal.value = true;
};
const closePartnerModal = () => {
  showPartnerModal.value = false;
};
const togglePartnerSelection = (name) => {
  if (selectedPartners.value.includes(name)) {
    selectedPartners.value = selectedPartners.value.filter(n => n !== name);
  } else {
    selectedPartners.value.push(name);
  }
};
const validatePartnerSelection = () => {
  recipients.value = partners.value.filter(p => selectedPartners.value.includes(p.name));
  showPartnerModal.value = false;
};
const filteredPartners = computed(() => {
  if (!searchPartner.value) return partners.value;
  return partners.value.filter(p =>
    p.name.toLowerCase().includes(searchPartner.value.toLowerCase()) ||
    p.role.toLowerCase().includes(searchPartner.value.toLowerCase())
  );
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d.padStart(2, '0')} ${['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'][parseInt(m, 10)-1]} ${y}`;
}

function openDatePicker() {
  showDatePicker.value = true;
  pickerMonth.value = dateObj.value.getMonth();
  pickerYear.value = dateObj.value.getFullYear();
}

function selectDate(day) {
  const m = (pickerMonth.value + 1).toString().padStart(2, '0');
  const d = day.toString().padStart(2, '0');
  selectedDate.value = `${pickerYear.value}-${m}-${d}`;
  showDatePicker.value = false;
}

function prevMonth() {
  if (pickerMonth.value === 0) {
    pickerMonth.value = 11;
    pickerYear.value--;
  } else {
    pickerMonth.value--;
  }
}

function nextMonth() {
  if (pickerMonth.value === 11) {
    pickerMonth.value = 0;
    pickerYear.value++;
  } else {
    pickerMonth.value++;
  }
}

function isToday(day) {
  return (
    today.getDate() === day &&
    today.getMonth() === pickerMonth.value &&
    today.getFullYear() === pickerYear.value
  );
}

function isSelected(day) {
  const d = parseInt(selectedDate.value.split('-')[2], 10);
  const m = parseInt(selectedDate.value.split('-')[1], 10) - 1;
  const y = parseInt(selectedDate.value.split('-')[0], 10);
  return d === day && m === pickerMonth.value && y === pickerYear.value;
}

function openTimePicker() {
  showCustomTimePicker.value = true;
  pickedHour.value = selectedTime.value.split(':')[0];
  pickedMinute.value = selectedTime.value.split(':')[1];
}

function pickHour(h) {
  pickedHour.value = h;
}

function pickMinute(m) {
  pickedMinute.value = m;
  selectedTime.value = `${pickedHour.value}:${pickedMinute.value}`;
  showCustomTimePicker.value = false;
}

function setNow() {
  const now = new Date();
  pickedHour.value = now.getHours().toString().padStart(2, '0');
  pickedMinute.value = now.getMinutes().toString().padStart(2, '0');
  selectedTime.value = `${pickedHour.value}:${pickedMinute.value}`;
  showCustomTimePicker.value = false;
}

function goToPartnerProfile(partner) {
  router.push(`/partner/${partner.id}`);
}

async function loadActions(page = 1) {
  actionsLoading.value = true;
  actionsError.value = "";
  try {
    const data = await ActionsService.getActions({ page, limit: 10 });
    const newActions = Array.isArray(data) ? data : (data.actions || []);
    if (page === 1) {
      actions.value = newActions;
    } else {
      actions.value = [...actions.value, ...newActions];
    }
    actionsHasMore.value = newActions.length === 10; // Suppose 10 par page
    actionsPage.value = page;
  } catch (err) {
    actionsError.value = err.message || 'Erreur lors du chargement des actions récentes';
  } finally {
    actionsLoading.value = false;
  }
}

async function loadStats() {
  statsLoading.value = true;
  statsError.value = "";
  try {
    const data = await StatsService.getOverview();
    stats.value = data;
  } catch (err) {
    statsError.value = err.message || 'Erreur lors du chargement des statistiques';
  } finally {
    statsLoading.value = false;
  }
}
</script>

<style scoped>
@import '../assets/tokens.css';

.dashboard-wrapper {
  min-height: 100vh;
  background: var(--light-gray);
  padding: 35px 32px;
  font-family: var(--font-main);
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
  border-radius: var(--border-radius-lg);
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
  height: 22px;
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(21, 61, 28, 0.1);
  padding: 8px 0;
  min-width: 200px;
  z-index: 1000;
  margin-top: 8px;
}

.user-menu {
 
}

.more-menu {
  right: 0;
  left: auto;
}

.more-menu-container {
  position: relative;
  display: flex;
  align-items: center;
}

.credits-display {
  display: flex;
  align-items: center;
  gap: 5px;
}

.credits-text {
  color: var(--secondary-green);
  font-size: var(--font-size-lg);
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: -0.2px;
}

@media (max-width: 640px) {
  .credits-text {
    font-size: var(--font-size-md);
  }
}

.credits-icon {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 1px 2px rgba(49, 146, 11, 0.2));
  transition: transform 0.2s ease;
}

.credits-icon:hover {
  transform: scale(1.1);
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
  color: var(--dark-green);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.18px;
  margin: 0 0 8px 0;
}

/* Partners Section */
.partners-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.partners-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.partners-carousel::-webkit-scrollbar {
  display: none;
}

.partner-card {
  min-width: 140px;
  height: 160px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.partner-card--overdue {
  background: #fff;
  position: relative;
}

.partner-card--overdue .partner-status-header {
  background: #ef1524;
  height: 60px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.partner-card--due-soon {
  background: #fff;
  position: relative;
}

.partner-card--due-soon .partner-status-header {
  background: #fb9700;
  height: 60px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.partner-card--paid .partner-status-header {
  background: #31920b;
  height: 60px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.partner-status-header {
  width: 100%;
}

.status-text {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.14px;
  text-align: center;
}

.partner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
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
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.16px;
  margin: 0;
}

.partner-role {
  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.14px;
  margin: 0;
}

/* Messages Section */
.messages-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-card {
  padding: 16px;
  background: var(--white);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-bubble {
  background: var(--white);
  border-radius: 18px;
  padding: 20px 16px 20px 16px;
  position: relative;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px rgba(21,61,28,0.07);
}

.edit-message-row-stable {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-height: 48px;
  position: relative;
}
.edit-message-textarea {
  width: 100%;
  min-height: 80px;
  border-radius: 12px;
  border: 1.5px solid var(--secondary-green);
  font-size: 18px;
  font-family: var(--font-main);
  color: var(--primary-green);
  padding: 12px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}
.edit-message-textarea:focus {
  border-color: var(--accent-green);
}
.edit-message-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  background: var(--light-gray);
  box-shadow: 0 1px 4px rgba(21,61,28,0.07);
}
.edit-message-btn:focus {
  outline: 2px solid var(--secondary-green);
}

.message-text {
  width: 100%;
  min-height: 48px;
  font-size: 18px;
  font-family: var(--font-main);
  color: var(--primary-green);
  margin: 0;
  padding-right: 40px;
  word-break: break-word;
  display: flex;
  align-items: center;
}
.message-placeholder {
  color: var(--gray-700);
  font-style: italic;
}

.sync-indicator {
  position: absolute;
  bottom: 8px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sync-text {
  color: var(--primary-green);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.12px;
}

.message-schedule-calendly {
  display: flex;
  gap: 16px;
  margin: 18px 0 10px 0;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.schedule-item-calendly {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(21,61,28,0.06);
  padding: 14px 22px 14px 16px;
  min-width: 140px;
  font-size: 16px;
  font-weight: 600;
  color: #153d1c;
  transition: box-shadow 0.18s, border 0.18s, background 0.18s;
  border: 2px solid #31920b;
  cursor: pointer;
  position: relative;
}
.schedule-item-calendly:focus, .schedule-item-calendly:hover {
  box-shadow: 0 4px 16px rgba(49,146,11,0.12);
  border: 2.5px solid #1ef524;
  outline: none;
  background: #f5f5f5;
}
.schedule-icon-calendly {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
}
.schedule-text-calendly {
  flex: 1;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #153d1c;
}
.datepicker-vanialog-visible, .timepicker-vanialog-visible {
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  z-index: 10;
  border-radius: 18px;
  border: 2px solid #31920b;
  background: #fff;
  box-shadow: 0 4px 16px rgba(49,146,11,0.10);
  font-size: 16px;
  color: #153d1c;
  padding: 0 12px;
  outline: none;
  display: block;
}
.datepicker-vanialog-visible:focus, .timepicker-vanialog-visible:focus {
  border: 2.5px solid #1ef524;
}
@media (max-width: 600px) {
  .message-schedule-calendly {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  .schedule-item-calendly {
    min-width: 0;
    width: 100%;
    justify-content: flex-start;
  }
}

.reminder-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0;
}

.reminder-settings-premium {
  margin: 24px 0 16px 0;
  padding: 0 0 8px 0;
  background: none;
}
.reminder-title-row-premium {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.recipients-count-badge-premium {
  background: var(--cream);
  color: var(--primary-green);
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 700;
  min-width: 28px;
  text-align: center;
}
.recipients-chips-row {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 6px 0 10px 0;
  min-height: 48px;
  background: var(--light-gray);
  border-radius: 18px;
  box-shadow: 0 1px 4px rgba(21,61,28,0.07);
  scrollbar-width: thin;
}
.chips-scrollable {
  display: flex;
  align-items: center;
  gap: 8px;
}
.recipient-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--secondary-green);
  border-radius: 18px;
  padding: 4px 12px 4px 4px;
  color: var(--white);
  font-size: 15px;
  font-weight: 600;
  min-width: 56px;
  min-height: 32px;
  max-height: 32px;
  box-shadow: 0 1px 2px rgba(21,61,28,0.07);
  transition: box-shadow 0.2s;
}
.recipient-chip-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid var(--dark-green);
}
.recipient-chip-name {
  margin-right: 2px;
  font-size: 15px;
  font-weight: 600;
}
.recipient-chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}
.recipient-chip-remove:focus {
  outline: 2px solid var(--accent-green);
}
.recipient-chip-add {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--secondary-green);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  transition: background 0.2s;
  cursor: pointer;
}
.recipient-chip-add:focus {
  outline: 2px solid var(--accent-green);
}
.recipient-chip-add svg {
  width: 20px;
  height: 20px;
}

.schedule-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 14px;
  background: var(--secondary-green);
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

.credit-icon {
  display: flex;
  align-items: center;
  margin-left: 6px;
  height: 20px;
}
.credit-count {
  margin-left: 4px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  min-width: 18px;
  text-align: center;
}

/* Actions Section */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions-card {
  background: var(--white);
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
  color: var(--primary-green);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.16px;
}

.action-time {
  color: var(--primary-green);
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
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}

.floating-action-btn {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--secondary-green) 0%, var(--yellow-accent) 80%);
  border: 2.5px solid var(--white);
  box-shadow: 0 6px 32px 0 rgba(21, 61, 28, 0.18), 0 1.5px 8px 0 #fef20044;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-green);
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
}

.floating-action-btn:hover, .floating-action-btn:focus {
  background: linear-gradient(135deg, var(--yellow-accent) 0%, var(--secondary-green) 100%);
  box-shadow: 0 10px 40px 0 rgba(21, 61, 28, 0.22), 0 2px 12px 0 #fef20066;
  transform: scale(1.07);
  outline: none;
}

.floating-action-btn svg {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 2px 8px #153d1c22);
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
    gap: 16px;
  }

  .partners-carousel .partner-card {
    min-width: 140px;
    height: 208px;
  }

  .message-card {
    padding: 16px;
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
  .recipients-chips-row {
    gap: 4px;
    min-height: 40px;
    padding: 4px 0 8px 0;
  }
  .recipient-chip {
    min-width: 48px;
    font-size: 14px;
    padding: 4px 8px 4px 4px;
  }
  .recipient-chip-avatar {
    width: 24px;
    height: 24px;
  }
  .recipient-chip-add {
    width: 28px;
    height: 28px;
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
    border: 2px solid var(--primary-green);
  }

  .toggle-slider {
    border: 2px solid var(--primary-green);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  font-family: var(--font-main);
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-green);
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
  color: var(--primary-green);
  font-size: var(--font-size-lg);
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
  background: var(--primary-green);
  border-radius: 50%;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.theme-toggle-container {
  display: flex;
  align-items: center;
  margin-left: 12px;
}
.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;
}
.theme-toggle-btn:focus {
  outline: 2px solid var(--secondary-green);
}

.toast-success {
  position: fixed;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);
  background: var(--secondary-green);
  color: var(--white);
  padding: 16px 32px;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(21,61,28,0.12);
  z-index: 2000;
  animation: fadeInOut 2s;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}

.recipients-badge-premium {
  background: var(--secondary-green);
  color: var(--white);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 700;
  margin-left: 4px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.partner-modal-overlay.premium {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(21,61,28,0.18);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInOut 0.3s;
}
.partner-modal.premium {
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 rgba(21,61,28,0.10), 0 2px 12px rgba(21,61,28,0.12);
  width: 95vw;
  max-width: 420px;
  padding: 36px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
}
.partner-modal-header.premium {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.partner-modal-title.premium {
  font-size: 22px;
  font-weight: 700;
  color: #153d1c;
  margin: 0 0 18px 0;
  letter-spacing: -0.5px;
  text-align: center;
}
.partner-modal-close.premium {
  color: #153d1c;
  position: absolute;
  top: 32px;
  right: 24px;
}
.partner-modal-search.premium {
  width: 100%;
  padding: 16px 20px;
  border-radius: 24px;
  border: 2px solid #31920b;
  font-size: 17px;
  font-family: var(--font-main);
  color: #153d1c;
  background: #f5f5f5;
  margin-bottom: 18px;
  outline: none;
  transition: border-color 0.2s;
  text-align: left;
}
.partner-modal-search.premium::placeholder {
  color: #6b7280;
  opacity: 1;
}
.partner-modal-search.premium:focus {
  border-color: #1ef524;
}
.partner-modal-list.premium {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
}
.partner-modal-item.premium {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 22px;
  padding: 16px 20px;
  cursor: pointer;
  transition: box-shadow 0.18s, background 0.18s;
  outline: none;
  box-shadow: 0 1px 4px rgba(21,61,28,0.04);
  border: 1.5px solid transparent;
  min-height: 56px;
}
.partner-modal-item.premium[aria-checked="true"], .partner-modal-item.premium.selected {
  background: #e8ffea;
  border: 1.5px solid #1ef524;
}
.partner-modal-item.premium:hover {
  background: #f5f5f5;
  box-shadow: 0 2px 8px rgba(21,61,28,0.08);
}
.partner-modal-item.premium:focus {
  border: 2px solid #1ef524;
}
.partner-modal-avatar.premium {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid #31920b;
  box-shadow: 0 1px 4px rgba(21,61,28,0.08);
  margin-right: 16px;
}
.partner-modal-info.premium {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  min-width: 0;
}
.partner-modal-name.premium {
  font-size: 18px;
  font-weight: 700;
  color: #153d1c;
  margin-bottom: 2px;
  line-height: 1.1;
}
.partner-modal-role.premium {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.1;
}
.partner-modal-checkbox.premium {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: none;
  margin-left: 18px;
  border: 2px solid #1ef524;
  background: #fff;
  transition: background 0.18s, border 0.18s;
  flex-shrink: 0;
}
.partner-modal-checkbox.premium.selected {
  background: #1ef524;
  border: 2px solid #1ef524;
  animation: popIn 0.18s;
}
@keyframes popIn {
  0% { transform: scale(0.7); opacity: 0.5; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
.partner-modal-checkbox.premium.selected svg {
  filter: drop-shadow(0 1px 2px #fff9);
}
.partner-modal-validate.premium {
  width: 100%;
  background: #31920b;
  color: #fff;
  border: none;
  border-radius: 32px;
  font-size: 18px;
  font-weight: 700;
  padding: 18px 0;
  margin-top: 22px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 12px rgba(21,61,28,0.10);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.partner-modal-validate.premium:focus {
  outline: 2px solid #1ef524;
}
.partner-modal-glow {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  margin-top: -12px;
  background: linear-gradient(90deg, #1ef524 0%, #fef200 100%);
  color: #153d1c;
  border-radius: 0 0 32px 32px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 14px 0 12px 0;
  box-shadow: 0 8px 32px 0 rgba(21,61,28,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.partner-modal-glow-icon {
  font-size: 20px;
  margin-right: 4px;
}
@media (max-width: 600px) {
  .partner-modal.premium {
    max-width: 99vw;
    padding: 12px 4px 8px 4px;
    border-radius: 0 0 32px 32px;
  }
  .partner-modal-title.premium {
    font-size: 17px;
  }
  .partner-modal-list.premium {
    max-height: 180px;
  }
  .partner-modal-glow {
    max-width: 99vw;
    border-radius: 0 0 32px 32px;
    font-size: 15px;
    padding: 10px 0 8px 0;
  }
}

.datepicker-popover-vanialog {
  position: absolute;
  top: 54px;
  left: 0;
  z-index: 20;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(21,61,28,0.13);
  padding: 18px 18px 12px 18px;
  min-width: 260px;
  max-width: 320px;
  border: 2px solid #31920b;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInOut 0.18s;
}
.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}
.datepicker-title {
  font-size: 16px;
  font-weight: 700;
  color: #153d1c;
}
.datepicker-nav {
  background: #f5f5f5;
  border: none;
  color: #31920b;
  font-size: 22px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: background 0.18s;
}
.datepicker-nav:focus {
  outline: 2px solid #1ef524;
}
.datepicker-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  width: 100%;
  margin-bottom: 8px;
}
.datepicker-dayname {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  font-weight: 600;
}
.datepicker-empty {
  height: 32px;
}
.datepicker-day {
  background: #fff;
  border: 1.5px solid transparent;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 15px;
  color: #153d1c;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, border 0.18s;
}
.datepicker-day.today {
  border: 1.5px solid #1ef524;
}
.datepicker-day.selected {
  background: #1ef524;
  color: #153d1c;
  border: 1.5px solid #31920b;
}
.datepicker-day:hover, .datepicker-day:focus {
  background: #e8ffea;
  border: 1.5px solid #31920b;
  outline: none;
}
.datepicker-today-btn {
  margin-top: 6px;
  background: #31920b;
  color: #fff;
  border: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 700;
  padding: 8px 18px;
  cursor: pointer;
  transition: background 0.18s;
}
.datepicker-today-btn:focus {
  outline: 2px solid #1ef524;
}

.timepicker-popover-vanialog {
  position: absolute;
  top: 54px;
  left: 0;
  z-index: 20;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(21,61,28,0.13);
  padding: 18px 18px 12px 18px;
  min-width: 320px;
  max-width: 420px;
  border: 2px solid #31920b;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInOut 0.18s;
}
.timepicker-header {
  font-size: 16px;
  font-weight: 700;
  color: #153d1c;
  margin-bottom: 8px;
}
.timepicker-doublecol {
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 100%;
  justify-content: center;
  margin-bottom: 8px;
}
.timepicker-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timepicker-col-title {
  font-size: 14px;
  font-weight: 600;
  color: #31920b;
  margin-bottom: 4px;
}
.timepicker-col-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 180px;
  overflow-y: auto;
  align-items: center;
}
.timepicker-col-btn {
  background: #fff;
  border: 1.5px solid transparent;
  border-radius: 12px;
  width: 44px;
  height: 32px;
  font-size: 15px;
  color: #153d1c;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2px;
  transition: background 0.18s, border 0.18s;
}
.timepicker-col-btn.selected {
  background: #1ef524;
  color: #153d1c;
  border: 1.5px solid #31920b;
}
.timepicker-col-btn:hover, .timepicker-col-btn:focus {
  background: #e8ffea;
  border: 1.5px solid #31920b;
  outline: none;
}
.timepicker-now-btn {
  margin-top: 6px;
  background: #31920b;
  color: #fff;
  border: none;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 700;
  padding: 8px 18px;
  cursor: pointer;
  transition: background 0.18s;
}
.timepicker-now-btn:focus {
  outline: 2px solid #1ef524;
}

.credit-btn-group {
  display: inline-flex;
  align-items: center;
  margin-left: 12px;
  background: linear-gradient(90deg, #fef200 60%, #fff9cc 100%);
  border-radius: 999px;
  padding: 4px 14px 4px 12px;
  box-shadow: 0 2px 12px 0 #fef20033;
  font-weight: 800;
  font-size: 17px;
  gap: 6px;
}
.credit-count-btn {
  color: #153d1c;
  font-weight: 800;
  font-size: 17px;
  min-width: 18px;
  text-align: center;
  letter-spacing: 0.1px;
}
.credit-icon-btn {
  display: flex;
  align-items: center;
  height: 20px;
}

/* Statistics Section */
.stats-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-loader {
  text-align: center;
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 600;
}

.section-error {
  text-align: center;
  color: var(--error-red);
  font-size: 16px;
  font-weight: 600;
}

.section-empty {
  text-align: center;
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 600;
}
</style>
