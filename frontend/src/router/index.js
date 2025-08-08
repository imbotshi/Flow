import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import PhoneEntryPage from "../pages/PhoneEntryPage.vue";
import OTPVerificationPage from "../pages/OTPVerificationPage.vue";
import UserInfoPage from "../pages/UserInfoPage.vue";
import BusinessExperiencePage from "../pages/BusinessExperiencePage.vue";
import BusinessProcessPage from "../pages/BusinessProcessPage.vue";
import ContactMethodPage from "../pages/ContactMethodPage.vue";
import SuccessPage from "../pages/SuccessPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import AddPartnerPage from "../pages/AddPartnerPage.vue";
import PartnerProfilePage from "../pages/PartnerProfilePage.vue";
import EditPartnerPage from "../pages/EditPartnerPage.vue";
import BuyCreditsPage from "../pages/BuyCreditsPage.vue";
import PaymentMethodPage from "../pages/PaymentMethodPage.vue";
import PurchaseSummaryPage from "../pages/PurchaseSummaryPage.vue";
import ProcessLaunchPage from "../pages/ProcessLaunchPage.vue";
import UserInfoModifyPage from '../pages/UserInfoModifyPage.vue';
import ArchivesPage from '../pages/ArchivesPage.vue';
import FaqPage from '../pages/FaqPage.vue';

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      title: "Connexion - Vania Flow",
    },
  },
  {
    path: "/phone",
    name: "PhoneEntry",
    component: PhoneEntryPage,
    meta: {
      title: "Numéro de téléphone - Vania Flow",
    },
  },
  {
    path: "/otp",
    name: "OTPVerification",
    component: OTPVerificationPage,
    meta: {
      title: "Vérification OTP - Vania Flow",
    },
  },
  {
    path: "/user-info",
    name: "UserInfo",
    component: UserInfoPage,
    meta: {
      title: "Informations utilisateur - Vania Flow",
    },
  },
  {
    path: "/user-info-modify",
    name: "UserInfoModify",
    component: UserInfoModifyPage
  },
  {
    path: "/business-experience",
    name: "BusinessExperience",
    component: BusinessExperiencePage,
    meta: {
      title: "Expérience - Vania Flow",
    },
  },
  {
    path: "/business-process",
    name: "BusinessProcess",
    component: BusinessProcessPage,
    meta: {
      title: "Processus de gestion - Vania Flow",
    },
  },
  {
    path: "/contact-method",
    name: "ContactMethod",
    component: ContactMethodPage,
    meta: {
      title: "Méthode de contact - Vania Flow",
    },
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessPage,
    meta: {
      title: "Succès - Vania Flow",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: {
      title: "Tableau de bord - Vania Flow",
    },
  },
  {
    path: "/add-partner",
    name: "AddPartner",
    component: AddPartnerPage,
    meta: {
      title: "Ajouter un partenaire - Vania Flow",
    },
  },
  {
    path: "/partner/:id",
    name: "PartnerProfile",
    component: PartnerProfilePage,
    meta: {
      title: "Profil du partenaire - Vania Flow",
    },
  },
  {
    path: "/partner/:id/edit",
    name: "EditPartner",
    component: EditPartnerPage,
    meta: {
      title: "Modifier le partenaire - Vania Flow",
    },
  },
  {
    path: "/buy-credits",
    name: "BuyCredits",
    component: BuyCreditsPage,
    meta: {
      title: "Acheter des crédits - Vania Flow",
    },
  },
  {
    path: "/payment-method",
    name: "PaymentMethod",
    component: PaymentMethodPage,
    meta: {
      title: "Méthode de paiement - Vania Flow",
    },
  },
  {
    path: "/purchase-summary",
    name: "PurchaseSummary",
    component: PurchaseSummaryPage,
    meta: {
      title: "Résumé de l'achat - Vania Flow",
    },
  },
  {
    path: "/process-launch",
    name: "ProcessLaunch",
    component: ProcessLaunchPage,
    meta: {
      title: "Lancement automatique - Vania Flow",
    },
  },
  {
    path: '/archives',
    name: 'Archives',
    component: ArchivesPage
  },
  {
    path: '/faq',
    name: 'Faq',
    component: FaqPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set page title
router.beforeEach((to) => {
  document.title = to.meta?.title || "Vania Flow";
});

export default router;
