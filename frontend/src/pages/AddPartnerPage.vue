<template>
  <div class="add-partner-page">
    <!-- Header -->
    <div class="header">
      <button @click="goBack" class="back-button" aria-label="Retour">
        <BackIcon />
      </button>
      <button class="more-button" aria-label="Plus d'options">
        <MoreIcon />
      </button>
    </div>

    <!-- Title -->
    <h1 class="title">Ajouter un nouveau partenaire</h1>

    <!-- Step Indicators -->
    <div class="step-indicators">
      <div 
        v-for="(step, index) in steps" 
        :key="step.id"
        class="step-indicator"
        :class="{
          'step-indicator--active': currentStep.index === index,
          'step-indicator--completed': index < currentStep.index,
          'step-indicator--disabled': index > currentStep.index
        }"
        @click="goToStep(index)"
      >
        <div class="step-number">
          <span v-if="index < currentStep.index">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: overallProgress + '%' }"></div>
      </div>
      <div class="progress-text">
        Étape {{ currentStep.index + 1 }} sur {{ steps.length }}
      </div>
    </div>

    <!-- Step Content -->
    <div class="step-content">
      <!-- Step 1: Personal Information -->
      <div v-if="currentStep.index === 0" class="step-panel">
        <h2 class="step-title">Informations personnelles</h2>
        <p class="step-description">Commencez par les informations de base du partenaire</p>
        
        <!-- Photo Upload Section -->
        <div class="photo-section">
          <div style="width:100%;display:flex;flex-direction:column;align-items:flex-start;">
            <label style="margin-bottom:8px;font-size:16px;color:#153d1c;">Photo de profil</label>
            <VPhotoUpload
              v-model="form.photo"
              class="profile-photo-upload"
              :data-error="errors.photo"
              aria-label="Télécharger la photo de profil du partenaire"
              shape="rounded"
              size="small"
            />
          </div>
        </div>

        <!-- Name Fields -->
        <div class="form-fields">
          <div class="field-row" :class="{ 'field-row--filled': form.lastName }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00684 11.5599C2.00684 8.10293 2.00684 6.37445 3.08078 5.3005C4.15472 4.22656 5.8832 4.22656 9.34017 4.22656H13.0068C16.4638 4.22656 18.1923 4.22656 19.2662 5.3005C20.3402 6.37445 20.3402 8.10293 20.3402 11.5599C20.3402 15.0168 20.3402 16.7454 19.2662 17.8193C18.1923 18.8932 16.4638 18.8932 13.0068 18.8932H9.34017C5.8832 18.8932 4.15472 18.8932 3.08078 17.8193C2.00684 16.7454 2.00684 15.0168 2.00684 11.5599Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.2575 9.72591C10.2575 8.71339 9.4367 7.89258 8.42415 7.89258C7.41163 7.89258 6.59082 8.71339 6.59082 9.72591C6.59082 10.7385 7.41163 11.5592 8.42415 11.5592C9.4367 11.5592 10.2575 10.7385 10.2575 9.72591Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0902 15.2262C12.0902 13.2012 10.4485 11.5596 8.4235 11.5596C6.39846 11.5596 4.75684 13.2012 4.75684 15.2262" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9238 8.80957H17.5905" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9238 11.5596H17.5905" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Nom</span>
            </div>
            <input
              v-model="form.lastName"
              type="text"
              class="field-input"
              placeholder="Entrez le nom"
              @focus="handleFieldFocus('lastName')"
              @blur="handleFieldBlur('lastName')"
            />
          </div>

          <div class="field-row" :class="{ 'field-row--filled': form.firstName }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00684 11.5599C2.00684 8.10293 2.00684 6.37445 3.08078 5.3005C4.15472 4.22656 5.8832 4.22656 9.34017 4.22656H13.0068C16.4638 4.22656 18.1923 4.22656 19.2662 5.3005C20.3402 6.37445 20.3402 8.10293 20.3402 11.5599C20.3402 15.0168 20.3402 16.7454 19.2662 17.8193C18.1923 18.8932 16.4638 18.8932 13.0068 18.8932H9.34017C5.8832 18.8932 4.15472 18.8932 3.08078 17.8193C2.00684 16.7454 2.00684 15.0168 2.00684 11.5599Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.2575 9.72591C10.2575 8.71339 9.4367 7.89258 8.42415 7.89258C7.41163 7.89258 6.59082 8.71339 6.59082 9.72591C6.59082 10.7385 7.41163 11.5592 8.42415 11.5592C9.4367 11.5592 10.2575 10.7385 10.2575 9.72591Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0902 15.2262C12.0902 13.2012 10.4485 11.5596 8.4235 11.5596C6.39846 11.5596 4.75684 13.2012 4.75684 15.2262" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9238 8.80957H17.5905" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9238 11.5596H17.5905" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Prénom</span>
            </div>
            <input
              v-model="form.firstName"
              type="text"
              class="field-input"
              placeholder="Entrez le prénom"
              @focus="handleFieldFocus('firstName')"
              @blur="handleFieldBlur('firstName')"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Contact & Profession -->
      <div v-if="currentStep.index === 1" class="step-panel">
        <h2 class="step-title">Contact et profession</h2>
        <p class="step-description">Ajoutez les informations de contact et la profession</p>
        
        <div class="form-fields">
          <div class="field-row" :class="{ 'field-row--filled': form.whatsapp }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1738 17.9761H11.1838" stroke="#153D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5492 2.39258H9.79915C7.63855 2.39258 6.55825 2.39258 5.88703 3.06379C5.21582 3.73501 5.21582 4.81531 5.21582 6.97591V16.1426C5.21582 18.3032 5.21582 19.3835 5.88703 20.0547C6.55825 20.7259 7.63855 20.7259 9.79915 20.7259H12.5492C14.7097 20.7259 15.79 20.7259 16.4613 20.0547C17.1325 19.3835 17.1325 18.3032 17.1325 16.1426V6.97591C17.1325 4.81531 17.1325 3.73501 16.4613 3.06379C15.79 2.39258 14.7097 2.39258 12.5492 2.39258Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">WhatsApp</span>
            </div>
            <input
              v-model="form.whatsapp"
              type="tel"
              class="field-input"
              placeholder="+33 6 12 34 56 78"
              @focus="handleFieldFocus('whatsapp')"
              @blur="handleFieldBlur('whatsapp')"
            />
          </div>

          <div class="field-row" :class="{ 'field-row--filled': form.profession }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00684 13.3932C2.00684 10.8184 2.00684 9.53096 2.62478 8.60614C2.8923 8.20578 3.23605 7.86203 3.63641 7.59451C4.56123 6.97656 5.84866 6.97656 8.4235 6.97656H13.9235C16.4983 6.97656 17.7858 6.97656 18.7106 7.59451C19.1109 7.86203 19.4547 8.20578 19.7222 8.60614C20.3402 9.53096 20.3402 10.8184 20.3402 13.3932C20.3402 15.9681 20.3402 17.2555 19.7222 18.1803C19.4547 18.5806 19.1109 18.9244 18.7106 19.192C17.7858 19.8099 16.4983 19.8099 13.9235 19.8099H8.4235C5.84866 19.8099 4.56123 19.8099 3.63641 19.192C3.23605 18.9244 2.8923 18.5806 2.62478 18.1803C2.00684 17.2555 2.00684 15.9681 2.00684 13.3932Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.8402 6.97624C14.8402 5.24775 14.8402 4.38351 14.3032 3.84654C13.7662 3.30957 12.902 3.30957 11.1735 3.30957C9.44504 3.30957 8.58077 3.30957 8.04381 3.84654C7.50684 4.38351 7.50684 5.24775 7.50684 6.97624" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.67383 10.6431L6.27147 10.8282C9.4185 11.8036 12.9292 11.8036 16.0762 10.8282L16.6738 10.6431M11.1738 11.5597V13.3931" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Profession</span>
            </div>
            <input
              v-model="form.profession"
              type="text"
              class="field-input"
              placeholder="Ex: Architecte, Médecin..."
              @focus="handleFieldFocus('profession')"
              @blur="handleFieldBlur('profession')"
            />
          </div>

          <div class="field-row field-row--with-tag" :class="{ 'field-row--filled': form.propertyType }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.36993 6.37917L10.0325 8.71859C10.3712 9.19519 10.5406 9.43348 10.628 9.70778C10.7155 9.9821 10.7155 10.2749 10.7155 10.8606V18.8927H5.21549C3.48701 18.8927 2.62277 18.8927 2.0858 18.353C1.54883 17.8134 1.54883 16.9447 1.54883 15.2075V10.8606C1.54883 10.2749 1.54883 9.9821 1.63629 9.70778C1.72375 9.43348 1.8931 9.19519 2.23181 8.71859L3.89439 6.37917C4.91451 4.94377 5.42456 4.22607 6.13216 4.22607C6.83976 4.22607 7.34982 4.94377 8.36993 6.37917Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.96549 18.8931V15.2264C7.96549 14.541 7.96549 14.1984 7.81812 13.9431C7.72158 13.7759 7.58271 13.637 7.41549 13.5405C7.16024 13.3931 6.81754 13.3931 6.13216 13.3931C5.44678 13.3931 5.10408 13.3931 4.84883 13.5405C4.68161 13.637 4.54274 13.7759 4.4462 13.9431C4.29883 14.1984 4.29883 14.541 4.29883 15.2264V18.8931" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.96517 18.8932H17.1318C18.8603 18.8932 19.7245 18.8932 20.2615 18.3562C20.7985 17.8193 20.7985 16.955 20.7985 15.2266V11.0541C20.7985 10.3971 20.7985 10.0687 20.689 9.76616C20.5795 9.46375 20.3692 9.21141 19.9487 8.70673L17.3146 5.54588C16.774 4.89712 16.5036 4.57273 16.1341 4.39965C15.7645 4.22656 15.3423 4.22656 14.4978 4.22656H6.13184" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.3408 9.72656H10.7158" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Bien</span>
            </div>
            <div class="field-tag">
              <div class="tag-indicator"></div>
              <span class="tag-text">{{ form.propertyType }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Financial Information -->
      <div v-if="currentStep.index === 2" class="step-panel">
        <h2 class="step-title">Informations financières</h2>
        <p class="step-description">Définissez les détails du paiement et ajoutez une note</p>
        
        <div class="form-fields">
          <div class="field-row" :class="{ 'field-row--filled': form.amount }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.2988 5.14307H7.04883C6.62172 5.14307 6.40816 5.14307 6.2397 5.07329C6.01509 4.98026 5.83664 4.8018 5.7436 4.57719C5.67383 4.40873 5.67383 4.19518 5.67383 3.76807C5.67383 3.34095 5.67383 3.1274 5.7436 2.95894C5.83664 2.73433 6.01509 2.55588 6.2397 2.46284C6.40816 2.39307 6.62172 2.39307 7.04883 2.39307H15.2988C15.7259 2.39307 15.9395 2.39307 16.108 2.46284C16.3326 2.55588 16.511 2.73433 16.6041 2.95894C16.6738 3.1274 16.6738 3.34095 16.6738 3.76807C16.6738 4.19518 16.6738 4.40873 16.6041 4.57719C16.511 4.8018 16.3326 4.98026 16.108 5.07329C15.9395 5.14307 15.7259 5.14307 15.2988 5.14307Z" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round"/>
                <path d="M7.0485 5.14258L6.88148 5.34302C5.83005 6.60472 5.30434 7.23557 5.03059 7.99169C4.75684 8.74782 4.75684 9.569 4.75684 11.2114V15.2259C4.75684 17.8186 4.75684 19.115 5.56229 19.9204C6.36775 20.7259 7.66411 20.7259 10.2568 20.7259H12.0902C14.6829 20.7259 15.9792 20.7259 16.7847 19.9204C17.5902 19.115 17.5902 17.8186 17.5902 15.2259V11.2114C17.5902 9.569 17.5902 8.74782 17.3165 7.99169C17.0426 7.23557 16.5169 6.60472 15.4655 5.34302L15.2985 5.14258" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round"/>
                <path d="M9.34017 12.7462V11.0207L11.1735 9.72656L13.0068 11.0207V12.7462M9.34017 12.7462L11.1735 14.0403M9.34017 12.7462L7.50684 14.0403V15.7657L9.34017 17.0599L11.1735 15.7657M13.0068 12.7462L11.1735 14.0403M13.0068 12.7462L14.8402 14.0403V15.7657L13.0068 17.0599L11.1735 15.7657M11.1735 14.0403V15.7657" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Montant</span>
            </div>
            <input
              v-model="form.amount"
              type="number"
              class="field-input"
              placeholder="0 €"
              @focus="handleFieldFocus('amount')"
              @blur="handleFieldBlur('amount')"
            />
          </div>

          <div class="field-row field-row--with-tag" :class="{ 'field-row--filled': form.paymentDate }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8402 2.39258V6.05924M7.50684 2.39258V6.05924" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0905 4.22607H10.2572C6.80019 4.22607 5.07172 4.22607 3.99777 5.30001C2.92383 6.37396 2.92383 8.10244 2.92383 11.5594V13.3927C2.92383 16.8497 2.92383 18.5782 3.99777 19.6521C5.07172 20.7261 6.80019 20.7261 10.2572 20.7261H12.0905C15.5474 20.7261 17.276 20.7261 18.3499 19.6521C19.4238 18.5782 19.4238 16.8497 19.4238 13.3927V11.5594C19.4238 8.10244 19.4238 6.37396 18.3499 5.30001C17.276 4.22607 15.5474 4.22607 12.0905 4.22607Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.92383 9.72607H19.4238" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.1694 13.3926H11.1776M11.1694 17.0592H11.1776M14.8319 13.3926H14.8402M7.50684 13.3926H7.51506M7.50684 17.0592H7.51506" stroke="#153D1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Date de paiement</span>
            </div>
            <div class="field-tag field-tag--date">
              <span class="tag-text">{{ form.paymentDate }}</span>
            </div>
          </div>

          <div class="field-row field-row--with-tag" :class="{ 'field-row--filled': form.paymentMethod }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0905 3.76807H13.0072C13.8597 3.76807 14.2859 3.76807 14.6356 3.86177C15.5846 4.11605 16.3259 4.85731 16.5801 5.80631C16.6738 6.15602 16.6738 6.58226 16.6738 7.43473H4.75716C3.74464 7.43473 2.92383 6.61392 2.92383 5.6014C2.92383 4.58888 3.74464 3.76807 4.75716 3.76807H7.50716" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.92383 5.60107V14.7677C2.92383 17.3604 2.92383 18.6568 3.72928 19.4623C4.53474 20.2677 5.8311 20.2677 8.42383 20.2677H13.9238C16.5165 20.2677 17.8129 20.2677 18.6184 19.4623C19.4238 18.6568 19.4238 17.3604 19.4238 14.7677V12.9344C19.4238 10.3417 19.4238 9.04532 18.6184 8.23986C17.8129 7.43441 16.5165 7.43441 13.9238 7.43441H6.59049" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.4235 12.0176H17.5902C17.1639 12.0176 16.9508 12.0176 16.776 12.0644C16.3014 12.1916 15.9308 12.5622 15.8037 13.0367C15.7568 13.2115 15.7568 13.4247 15.7568 13.8509C15.7568 14.2772 15.7568 14.4903 15.8037 14.6651C15.9308 15.1397 16.3014 15.5103 16.776 15.6374C16.9508 15.6842 17.1639 15.6842 17.5902 15.6842H19.4235" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.79915 2.85156C11.5711 2.85156 13.0075 4.28798 13.0075 6.0599C13.0075 6.55196 12.8968 7.01815 12.6988 7.4349H6.89957C6.7016 7.01815 6.59082 6.55196 6.59082 6.0599C6.59082 4.28798 8.02724 2.85156 9.79915 2.85156Z" stroke="#153D1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Mode de Paiement</span>
            </div>
            <div class="field-tag field-tag--payment">
              <span class="tag-text">{{ form.paymentMethod }}</span>
            </div>
          </div>

          <div class="field-row" :class="{ 'field-row--filled': form.note }">
            <div class="field-info">
              <svg width="24" height="24" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.92383 3.30957H19.4238" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.92383 8.80957H10.2572" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.92383 14.3096H19.4238" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.92383 19.8096H10.2572" stroke="#153D1C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="field-label">Note</span>
            </div>
            <textarea
              v-model="form.note"
              class="field-input field-input--textarea"
              placeholder="Ajoutez une note optionnelle..."
              rows="2"
              @focus="handleFieldFocus('note')"
              @blur="handleFieldBlur('note')"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="step-navigation">
      <button 
        v-if="currentStep.index > 0" 
        @click="previousStep" 
        class="btn btn--secondary"
      >
        Précédent
      </button>
      
      <button 
        v-if="currentStep.index < steps.length - 1" 
        @click="nextStep" 
        class="btn btn--primary"
        :disabled="!canProceedToNextStep"
      >
        Suivant
      </button>
      
      <button 
        v-if="currentStep.index === steps.length - 1" 
        @click="savePartner" 
        class="btn btn--primary"
        :disabled="!isFormComplete"
      >
        Enregistrer le partenaire
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import BackIcon from "../components/atoms/icons/BackIcon.vue";
import MoreIcon from "../components/atoms/icons/MoreIcon.vue";
import VPhotoUpload from "../components/molecules/VPhotoUpload.vue";

const router = useRouter();

// Steps configuration
const steps = [
  {
    id: 'personal',
    label: 'Personnel',
    fields: ['photo', 'lastName', 'firstName']
  },
  {
    id: 'contact',
    label: 'Contact',
    fields: ['whatsapp', 'profession', 'propertyType']
  },
  {
    id: 'financial',
    label: 'Financier',
    fields: ['amount', 'paymentDate', 'paymentMethod', 'note']
  }
];

// Current step
const currentStep = reactive({
  index: 0
});

// Form reactive object
const form = reactive({
  photo: null,
  lastName: "",
  firstName: "",
  whatsapp: "",
  profession: "",
  propertyType: "Maison",
  amount: "",
  paymentDate: "09/07/2025",
  paymentMethod: "Virement",
  note: "",
});

// Errors object
const errors = reactive({
  photo: false,
  lastName: false,
  firstName: false,
  whatsapp: false,
  profession: false,
  amount: false,
});

// Focused field tracking
const focusedField = reactive({
  current: null,
});

// Computed values
const overallProgress = computed(() => {
  return Math.round(((currentStep.index + 1) / steps.length) * 100);
});

const canProceedToNextStep = computed(() => {
  const currentStepFields = steps[currentStep.index].fields;
  return currentStepFields.every(field => {
    const value = form[field];
    return value && value.toString().trim() !== "";
  });
});

const isFormComplete = computed(() => {
  const allFields = steps.flatMap(step => step.fields);
  return allFields.every(field => {
    const value = form[field];
    return value && value.toString().trim() !== "";
  });
});

// Methods
const goBack = () => {
  router.go(-1);
};

const goToStep = (stepIndex) => {
  // Only allow navigation to completed steps or current step
  if (stepIndex <= currentStep.index) {
    currentStep.index = stepIndex;
  }
};

const nextStep = () => {
  if (currentStep.index < steps.length - 1 && canProceedToNextStep.value) {
    currentStep.index++;
  }
};

const previousStep = () => {
  if (currentStep.index > 0) {
    currentStep.index--;
  }
};

const handleFieldFocus = (fieldName) => {
  focusedField.current = fieldName;
  // Clear error when user starts typing
  if (errors[fieldName]) {
    errors[fieldName] = false;
  }
};

const handleFieldBlur = (fieldName) => {
  focusedField.current = null;
  // Validate field on blur
  validateField(fieldName);
};

const validateField = (fieldName) => {
  const value = form[fieldName];
  
  switch (fieldName) {
    case 'lastName':
    case 'firstName':
      errors[fieldName] = !value || value.trim().length < 2;
      break;
    case 'whatsapp':
      errors[fieldName] = !value || value.trim().length < 8;
      break;
    case 'profession':
      errors[fieldName] = !value || value.trim().length < 2;
      break;
    case 'amount':
      errors[fieldName] = !value || parseFloat(value) <= 0;
      break;
    default:
      errors[fieldName] = false;
  }
};

const validateCurrentStep = () => {
  const currentStepFields = steps[currentStep.index].fields;
  currentStepFields.forEach(validateField);
  
  return !currentStepFields.some(field => errors[field]);
};

const validateForm = () => {
  const allFields = steps.flatMap(step => step.fields);
  allFields.forEach(validateField);
  
  return !Object.values(errors).some(error => error);
};

const savePartner = () => {
  if (!validateForm()) {
    // Show error message or highlight invalid fields
    console.log("Form validation failed:", errors);
    return;
  }
  
  // TODO: Implement save logic
  console.log("Saving partner:", form);
  router.push("/dashboard");
};

const cancel = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.add-partner-page {
  width: 100%;
  max-width: 440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 46px 31px 38px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(21, 61, 28, 0.05);
}

.more-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  opacity: 0.64;
}

.more-button:hover {
  background: rgba(21, 61, 28, 0.05);
  opacity: 1;
}

/* Title */
.title {
  color: #153d1c;
  font-size: 28px;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: -0.28px;
  margin: 0 0 60px 0;
  text-align: left;
}

/* Step Indicators */
.step-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 0 16px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
}

.step-indicator:hover {
  background: rgba(21, 61, 28, 0.05);
}

.step-indicator--active {
  transform: scale(1.05);
}

.step-indicator--active .step-number {
  background: #0b5444;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(11, 84, 68, 0.3);
}

.step-indicator--completed .step-number {
  background: #31920b;
  color: #ffffff;
}

.step-indicator--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-indicator--disabled:hover {
  background: transparent;
  transform: none;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.step-label {
  color: #153d1c;
  font-size: 12px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.12px;
  text-align: center;
  transition: all 0.3s ease;
}

.step-indicator--active .step-label {
  color: #0b5444;
  font-weight: 600;
}

.step-indicator--completed .step-label {
  color: #31920b;
}

/* Progress Bar */
.progress-section {
  margin-bottom: 24px;
  width: 100%;
}

.progress-bar {
  height: 8px;
  background: rgba(21, 61, 28, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0b5444 0%, #31920b 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-text {
  color: #153d1c;
  font-size: 14px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.14px;
  margin-top: 8px;
  text-align: center;
}

/* Step Content */
.step-content {
  flex: 1;
}

.step-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.step-title {
  color: #153d1c;
  font-size: 24px;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: -0.24px;
}

.step-description {
  color: #153d1c;
  font-size: 16px;
  font-weight: 400;
  line-height: 142%;
  letter-spacing: -0.16px;
}

/* Photo Section */
.photo-section {
  margin-bottom: 24px;
  width: 100%;
}

.profile-photo-upload {
  width: 100%;
  max-width: 80px;
}

/* Form Fields */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.field-row:hover {
  background: rgba(21, 61, 28, 0.05);
  transform: translateX(4px);
}

.field-row:focus-within {
  background: rgba(21, 61, 28, 0.1);
  border-color: rgba(21, 61, 28, 0.2);
  box-shadow: 0 0 0 2px rgba(21, 61, 28, 0.1);
}

.field-row--filled {
  background: rgba(21, 61, 28, 0.05);
}

.field-row--filled:hover {
  background: rgba(21, 61, 28, 0.08);
}

.field-row--with-tag {
  justify-content: space-between;
  gap: 16px;
}

.field-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.field-label {
  color: #153d1c;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}

/* Input Fields */
.field-input {
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  color: #153d1c;
  text-align: right;
  min-width: 120px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.field-input::placeholder {
  color: #9ca3af;
  font-style: italic;
  font-weight: 400;
}

.field-input:focus {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 2px rgba(21, 61, 28, 0.2);
}

.field-input--textarea {
  resize: none;
  min-height: 40px;
  max-height: 80px;
  text-align: left;
  line-height: 1.4;
}

/* Field Tags */
.field-tag {
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #fff;
  transition: all 0.2s ease;
}

.field-tag:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.02);
}

.field-tag--date {
  background: transparent;
  padding: 0;
}

.field-tag--date .tag-text {
  color: #153d1c;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
}

.field-tag--payment {
  background: #f5f5f5;
  padding: 8px 16px;
}

.field-tag--payment .tag-text {
  color: #166534;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
}

.tag-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fef200;
}

.tag-text {
  color: #153d1c;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}

/* Error States */
.field-row[data-error="true"] {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.05);
}

.field-row[data-error="true"] .field-input {
  color: #dc2626;
}

.field-row[data-error="true"] .field-label {
  color: #dc2626;
}

/* Success States */
.field-row--filled:not([data-error="true"]) {
  border-color: rgba(49, 146, 11, 0.3);
}

/* Navigation Buttons */
.step-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  gap: 16px;
}

.btn {
  display: flex;
  height: 56px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 28px;
  border: none;
  cursor: pointer;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.16px;
  transition: all 0.2s ease;
  min-width: 140px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn--primary {
  background: #0b5444;
  color: #ffffff;
}

.btn--primary:hover:not(:disabled) {
  background: #0a4a3b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 84, 68, 0.3);
}

.btn--primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn--secondary {
  background: #fff;
  color: #0b5444;
  border: 1px solid #e5e7eb;
}

.btn--secondary:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #0b5444;
  transform: translateY(-1px);
}

.btn--secondary:active:not(:disabled) {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 480px) {
  .add-partner-page {
    max-width: 100%;
    padding: 20px 16px;
    border-radius: 0;
    min-height: 100vh;
  }

  .header {
    margin-bottom: 40px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .step-indicators {
    gap: 12px;
    margin-bottom: 20px;
  }

  .step-indicator {
    padding: 6px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .step-label {
    font-size: 11px;
  }

  .step-title {
    font-size: 20px;
  }

  .step-description {
    font-size: 14px;
  }

  .photo-section {
    margin-bottom: 20px;
  }

  .form-fields {
    margin-bottom: 24px;
  }

  .field-row {
    padding: 10px 12px;
  }

  .field-row--with-tag {
    gap: 12px;
  }

  .field-input {
    min-width: 100px;
    font-size: 14px;
  }

  .step-navigation {
    flex-direction: column;
    gap: 12px;
  }

  .btn {
    width: 100%;
    min-width: auto;
  }
}

@media (min-width: 768px) {
  .add-partner-page {
    max-width: 500px;
  }

  .step-indicators {
    gap: 24px;
  }

  .step-navigation {
    flex-direction: row;
  }
}
</style>
