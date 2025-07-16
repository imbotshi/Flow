<template>
  <div class="partner-profile-page">
    <!-- Header with Status -->
    <div class="partner-profile-page__header">
      <div
        class="partner-profile-page__header-bg"
        :class="`partner-profile-page__header-bg--${partner.status}`"
      >
        <div class="partner-profile-page__nav">
          <button class="partner-profile-page__back-btn" @click="goBack">
            <BackIcon />
          </button>
          <VBadge
            :variant="getStatusVariant(partner.status)"
            class="partner-profile-page__status"
          >
            {{ getStatusText(partner.status) }}
          </VBadge>
          <button class="partner-profile-page__more-btn">
            <MoreIcon />
          </button>
        </div>
      </div>

      <!-- Partner Info -->
      <div class="partner-profile-page__profile">
        <VAvatar :src="partner.avatar" :alt="partner.name" size="xl" />
        <div class="partner-profile-page__info">
          <h1 class="partner-profile-page__name">{{ partner.name }}</h1>
          <p class="partner-profile-page__role">{{ partner.role }}</p>
        </div>
        <p class="partner-profile-page__phone">{{ partner.phone }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="partner-profile-page__actions">
      <button
        class="partner-profile-page__action-btn partner-profile-page__action-btn--secondary"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15.1667 1L15.7646 2.11777C16.1689 2.87346 16.371 3.25131 16.2374 3.41313C16.1037 3.57495 15.6635 3.44426 14.7831 3.18288C13.9029 2.92155 12.9684 2.78095 12 2.78095C6.75329 2.78095 2.5 6.90846 2.5 12C2.5 13.6791 2.96262 15.2535 3.77093 16.6095M8.83333 23L8.23536 21.8822C7.83108 21.1265 7.62894 20.7486 7.7626 20.5868C7.89627 20.425 8.33649 20.5557 9.21689 20.8171C10.0971 21.0784 11.0316 21.219 12 21.219C17.2467 21.219 21.5 17.0915 21.5 12C21.5 10.3208 21.0374 8.74647 20.2291 7.39047"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <VButton
        variant="accent"
        size="large"
        class="partner-profile-page__edit-btn"
        @click="editPartner"
      >
        <svg width="24" height="24" viewBox="0 0 25 24" fill="none">
          <path
            d="M16.9249 4.60509L17.9149 3.6151C18.7351 2.79497 20.0648 2.79497 20.8849 3.6151C21.705 4.43524 21.705 5.76493 20.8849 6.58507L19.8949 7.57506M16.9249 4.60509L10.2656 11.2644C9.75807 11.772 9.39804 12.4078 9.22397 13.1041L8.5 16L11.3959 15.276C12.0922 15.102 12.728 14.7419 13.2356 14.2344L19.8949 7.57506M16.9249 4.60509L19.8949 7.57506"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <path
            d="M19.4999 13.5C19.4999 16.7875 19.4999 18.4312 18.592 19.5376C18.4258 19.7401 18.2401 19.9258 18.0375 20.092C16.9312 21 15.2874 21 11.9999 21H11.5C7.72876 21 5.84316 21 4.67159 19.8284C3.50003 18.6569 3.5 16.7712 3.5 13V12.5C3.5 9.21252 3.5 7.56879 4.40794 6.46244C4.57417 6.2599 4.7599 6.07417 4.96244 5.90794C6.06879 5 7.71252 5 11 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Modifier
      </VButton>
      <button
        class="partner-profile-page__action-btn partner-profile-page__action-btn--secondary"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Partner Details -->
    <div class="partner-profile-page__details">
      <div class="partner-profile-page__detail-item">
        <div class="partner-profile-page__detail-icon">
          <svg width="22" height="22" viewBox="0 0 23 22" fill="none">
            <path
              d="M14.1824 2.66861L8.08406 5.59597C7.61472 5.82126 7.11323 5.87771 6.60202 5.76318C6.26746 5.68823 6.10015 5.65076 5.96544 5.63538C4.29264 5.44436 3.25 6.7683 3.25 8.29074V9.12625C3.25 10.6487 4.29264 11.9727 5.96544 11.7816C6.10015 11.7662 6.26747 11.7287 6.60202 11.6538C7.11323 11.5393 7.61472 11.5957 8.08406 11.821L14.1824 14.7484C15.5823 15.4204 16.2822 15.7564 17.0627 15.4945C17.8431 15.2326 18.1109 14.6706 18.6467 13.5467C20.1178 10.4604 20.1178 6.95661 18.6467 3.87029C18.1109 2.74637 17.8431 2.1844 17.0627 1.9225C16.2822 1.66061 15.5823 1.99661 14.1824 2.66861Z"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.375"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.0036 19.0398L9.63651 20.1665C6.55505 17.7226 6.93151 16.5571 6.93151 11.9165H7.97085C8.39263 14.539 9.38752 15.7812 10.7603 16.6804C11.6059 17.2343 11.7803 18.3996 11.0036 19.0398Z"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.375"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.375 11.4585V5.9585"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.375"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="partner-profile-page__detail-text">Projet</span>
      </div>
      <div class="partner-profile-page__detail-item">
        <div class="partner-profile-page__detail-icon">
          <MoneyIcon />
        </div>
        <span class="partner-profile-page__detail-text"
          >{{ partner.amount }} FCFA</span
        >
      </div>
      <div class="partner-profile-page__detail-item">
        <div class="partner-profile-page__detail-icon">
          <svg width="22" height="22" viewBox="0 0 23 22" fill="none">
            <path
              d="M15.1663 1.83301V5.49967M7.83301 1.83301V5.49967"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.4167 3.6665H10.5833C7.12636 3.6665 5.39789 3.6665 4.32394 4.74044C3.25 5.81439 3.25 7.54287 3.25 10.9998V12.8332C3.25 16.2901 3.25 18.0187 4.32394 19.0925C5.39789 20.1665 7.12636 20.1665 10.5833 20.1665H12.4167C15.8736 20.1665 17.6022 20.1665 18.676 19.0925C19.75 18.0187 19.75 16.2901 19.75 12.8332V10.9998C19.75 7.54287 19.75 5.81439 18.676 4.74044C17.6022 3.6665 15.8736 3.6665 12.4167 3.6665Z"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.25 9.1665H19.75"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.4955 12.833H11.5038M11.4955 16.4997H11.5038M15.1581 12.833H15.1663M7.83301 12.833H7.84123M7.83301 16.4997H7.84123"
              stroke="currentColor"
              stroke-opacity="0.64"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="partner-profile-page__detail-text">{{
          partner.dueDate
        }}</span>
      </div>
    </div>

    <!-- Programmed Message Section -->
    <div class="partner-profile-page__section">
      <h2 class="partner-profile-page__section-title">Mon message programmé</h2>
      <VCard class="partner-profile-page__message-card">
        <div class="partner-profile-page__message-content">
          <div class="partner-profile-page__message-text">
            <p>{{ programmedMessage.text }}</p>
            <div class="partner-profile-page__message-sync">
              <span>Synchronisé sur</span>
              <svg width="14" height="14" viewBox="0 0 14 15" fill="none">
                <path
                  d="M14 10.9941C14 11.0708 13.9976 11.2363 13.9928 11.3657C13.9808 11.6798 13.9568 12.0849 13.9185 12.2695C13.861 12.5476 13.7771 12.8089 13.6644 13.027C13.5325 13.2859 13.3647 13.5161 13.1634 13.715C12.9644 13.914 12.7342 14.0818 12.4753 14.2137C12.2572 14.3263 11.9935 14.4102 11.713 14.4678C11.5308 14.5037 11.1281 14.5301 10.8164 14.5397C10.687 14.5445 10.5216 14.5469 10.4449 14.5469H3.55034C3.47363 14.5469 3.30822 14.5445 3.17877 14.5397C2.86473 14.5277 2.45959 14.5037 2.275 14.4654C1.99692 14.4078 1.73562 14.3239 1.51747 14.2113C1.25856 14.0794 1.02842 13.9116 0.829452 13.7102C0.630479 13.5113 0.462671 13.2811 0.330822 13.0222C0.218151 12.8041 0.134247 12.5404 0.0767123 12.2599C0.0407534 12.0777 0.0143836 11.675 0.00479452 11.3633C0.00239726 11.2363 0 11.0708 0 10.9941V4.09961C0 4.0229 0.00239726 3.85749 0.00719178 3.72804C0.0191781 3.414 0.0431507 3.00886 0.0815068 2.82427C0.139041 2.54619 0.222945 2.28489 0.335616 2.06674C0.467466 1.80783 0.635274 1.5777 0.834247 1.37872C1.03322 1.17975 1.26336 1.01194 1.52226 0.880094C1.74041 0.767423 2.00411 0.683519 2.28459 0.625985C2.46678 0.590026 2.86952 0.563656 3.18116 0.554067C3.31062 0.549272 3.47603 0.546875 3.55274 0.546875H10.4473C10.524 0.546875 10.6894 0.549272 10.8188 0.554067C11.1329 0.566053 11.538 0.590026 11.7226 0.628382C12.0007 0.685916 12.262 0.76982 12.4801 0.882491C12.739 1.01434 12.9692 1.18215 13.1681 1.38352C13.3671 1.58249 13.5349 1.81263 13.6668 2.07153C13.7795 2.28968 13.8634 2.55338 13.9209 2.83386C13.9568 3.01605 13.9832 3.41879 13.9928 3.73044C13.9976 3.85989 14 4.0253 14 4.10201V10.9941Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="7.00053"
                    y1="14.5479"
                    x2="7.00053"
                    y2="0.546875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#25CF43" />
                    <stop offset="1" stop-color="#61FD7D" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div class="partner-profile-page__message-schedule">
            <VBadge variant="info">{{ programmedMessage.date }}</VBadge>
            <VBadge variant="info">{{ programmedMessage.time }}</VBadge>
          </div>
        </div>
        <VButton
          variant="accent"
          size="large"
          full-width
          @click="scheduleMessage"
        >
          Programmer le message 🪙
        </VButton>
      </VCard>
    </div>

    <!-- Recent Actions -->
    <div class="partner-profile-page__section">
      <h2 class="partner-profile-page__section-title">Actions récentes</h2>
      <VCard class="partner-profile-page__actions-card">
        <div
          class="partner-profile-page__action-item"
          v-for="action in recentActions"
          :key="action.id"
        >
          <div class="partner-profile-page__action-info">
            <component
              :is="action.icon"
              class="partner-profile-page__action-icon"
            />
            <span class="partner-profile-page__action-text">{{
              action.text
            }}</span>
          </div>
          <span class="partner-profile-page__action-time">{{
            action.time
          }}</span>
        </div>
        <div class="partner-profile-page__action-divider"></div>
        <button class="partner-profile-page__show-more">
          <MoreIcon />
          <span>Afficher plus</span>
        </button>
      </VCard>
    </div>

    <!-- Floating Action Button -->
    <button class="partner-profile-page__fab">
      <UserAddIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

import VCard from "../components/atoms/VCard.vue";
import VAvatar from "../components/atoms/VAvatar.vue";
import VBadge from "../components/atoms/VBadge.vue";
import VButton from "../components/atoms/VButton.vue";
import BackIcon from "../components/atoms/icons/BackIcon.vue";
import MoreIcon from "../components/atoms/icons/MoreIcon.vue";
import UserAddIcon from "../components/atoms/icons/UserAddIcon.vue";
import MoneyIcon from "../components/atoms/icons/MoneyIcon.vue";

const router = useRouter();
const route = useRoute();

// Mock partner data - in real app this would come from API
const partner = reactive({
  id: route.params.id || 1,
  name: "Martin Obiang",
  role: "Comptable",
  phone: "+237 698 651 245",
  avatar: "https://via.placeholder.com/80x80/31920B/ffffff?text=JD",
  status: "no_due", // overdue, due_soon, no_due
  amount: "200.000",
  dueDate: "09 Juil. 2025",
});

const programmedMessage = reactive({
  text: "Salut {utilisateur}, Vous venez de dépasser les délais de paiement pour notre prestation du {date}. Je souhaite avoir un appel afin de comprendre ce qui bloque le projet.",
  date: "10 juil. 2025",
  time: "09:48",
});

const recentActions = ref([
  {
    id: 1,
    icon: "MoneyIcon",
    text: "Paiement reçu par Martin",
    time: "7h",
  },
  {
    id: 2,
    icon: "MailIcon",
    text: "Relance envoyée à Martin",
    time: "1h",
  },
  {
    id: 3,
    icon: "UserAddIcon",
    text: "Nouveau partenaire ajouté",
    time: "6h",
  },
]);

const getStatusVariant = (status: string) => {
  switch (status) {
    case "overdue":
      return "error";
    case "due_soon":
      return "warning";
    case "no_due":
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "overdue":
      return "En retard";
    case "due_soon":
      return "Échéance dans 12j";
    case "no_due":
      return "Aucune échéance";
    default:
      return "Status inconnu";
  }
};

const goBack = () => {
  router.go(-1);
};

const editPartner = () => {
  router.push(`/partner/${partner.id}/edit`);
};

const scheduleMessage = () => {
  // TODO: Implement message scheduling
  console.log("Scheduling message for partner:", partner.name);
};
</script>

<style scoped>
.partner-profile-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  position: relative;
}

.partner-profile-page__header {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.partner-profile-page__header-bg {
  height: 149px;
  position: relative;
}

.partner-profile-page__header-bg--overdue {
  background: #eb002d;
}

.partner-profile-page__header-bg--due_soon {
  background: #f59100;
}

.partner-profile-page__header-bg--no_due {
  background: #31920b;
}

.partner-profile-page__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 46px 31px 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.partner-profile-page__back-btn,
.partner-profile-page__more-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: white;
}

.partner-profile-page__status {
  color: white !important;
}

.partner-profile-page__profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  padding: 103px 21px 21px;
  position: relative;
  z-index: 1;
}

.partner-profile-page__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.partner-profile-page__name {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.18px;
  margin: 0;
}

.partner-profile-page__role {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.16px;
  margin: 0;
}

.partner-profile-page__phone {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.14px;
  margin: 0;
}

.partner-profile-page__actions {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 31px;
}

.partner-profile-page__action-btn {
  display: flex;
  width: 62px;
  height: 62px;
  padding: 24px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
  border: none;
  cursor: pointer;
  color: #153d1c;
}

.partner-profile-page__action-btn--secondary {
  background: #fff;
  opacity: 0.64;
}

.partner-profile-page__edit-btn {
  display: flex;
  width: 225px;
  height: 62px;
  padding: 24px 38px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 28px;
  background: linear-gradient(170deg, #e1f524 0%, #b9f524 97.69%);
  box-shadow:
    0px 1.173px 2.347px 0px #e7ff00,
    0px 0px 0px 3.52px #eeff49;
  color: #153d1c;
  font-size: 20px;
  font-weight: 600;
}

.partner-profile-page__details {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
}

.partner-profile-page__detail-item {
  display: flex;
  padding: 24px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  border-radius: 16px;
  background: #fff;
  flex: 1;
}

.partner-profile-page__detail-icon {
  width: 22px;
  height: 22px;
  color: rgba(21, 61, 28, 0.64);
}

.partner-profile-page__detail-text {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 142%;
  letter-spacing: -0.16px;
  text-transform: uppercase;
}

.partner-profile-page__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 31px;
}

.partner-profile-page__section-title {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.18px;
  margin: 0;
}

.partner-profile-page__message-card {
  padding: 18px 38px;
}

.partner-profile-page__message-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.partner-profile-page__message-text {
  padding: 18px;
  border-radius: 18px;
  background: #f8f6f4;
  position: relative;
}

.partner-profile-page__message-text p {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 124%;
  letter-spacing: -0.16px;
  margin: 0 0 40px 0;
}

.partner-profile-page__message-sync {
  position: absolute;
  bottom: 11px;
  right: 17px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.partner-profile-page__message-sync span {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 10px;
  font-style: italic;
  font-weight: 500;
  line-height: 124%;
  letter-spacing: -0.1px;
}

.partner-profile-page__message-schedule {
  display: flex;
  gap: 8px;
}

.partner-profile-page__actions-card {
  padding: 20px 16px;
}

.partner-profile-page__action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 0.5px solid rgba(21, 61, 28, 0.14);
}

.partner-profile-page__action-item:last-of-type {
  border-bottom: none;
}

.partner-profile-page__action-info {
  display: flex;
  align-items: center;
  gap: 9px;
}

.partner-profile-page__action-icon {
  width: 24px;
  height: 24px;
  color: rgba(21, 61, 28, 0.64);
}

.partner-profile-page__action-text {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.16px;
}

.partner-profile-page__action-time {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.16px;
}

.partner-profile-page__action-divider {
  width: 100%;
  height: 0.5px;
  background: rgba(21, 61, 28, 0.14);
  margin: 12px 0;
}

.partner-profile-page__show-more {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 100%;
}

.partner-profile-page__show-more span {
  color: rgba(21, 61, 28, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.18px;
}

.partner-profile-page__fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
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

.partner-profile-page__fab:hover {
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .partner-profile-page {
    max-width: 500px;
  }
}
</style>
