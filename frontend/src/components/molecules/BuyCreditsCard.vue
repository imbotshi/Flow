<template>
  <div class="buy-credits-card">
    <div class="buy-credits-icon">
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" class="credits-icon-buy">
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
    <div class="buy-credits-content">
      <h3 class="buy-credits-title">Achetez des crédits</h3>
      <p class="buy-credits-desc">
        Rechargez votre solde pour continuer à relancer vos partenaires sans interruption.
      </p>
      <button class="buy-credits-btn" @click="goToBuyCredits">
        Acheter des crédits
        <span class="btn-glow"></span>
      </button>
      <div class="buy-credits-badges">
        <span class="buy-credits-badge">Sécurisé</span>
        <span class="buy-credits-badge">Instantané</span>
        <span class="buy-credits-badge">Fiable</span>
        <span class="buy-credits-badge">Sans engagement</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goToBuyCredits() {
  console.log(`[FRONTEND] [${new Date().toISOString()}] Action achat crédits déclenchée.`);
  router.push('/buy-credits');
}
</script>

<style scoped>
.buy-credits-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #2a3d31;
  border-radius: 32px;
  box-shadow: 0 4px 24px 0 #1e2c2211;
  border: 1.5px solid #eaffea;
  padding: 36px 32px 32px 28px;
  margin: 40px 0 40px 0;
  position: relative;
  overflow: hidden;
  max-width: 440px;
  width: 100%;
  z-index: 2;
  animation: fadeInUp 0.4s;
}
.buy-credits-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.10);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 10px 0 rgba(30,245,36,0.10);
}
.credits-icon-buy {
  width: 32px;
  height: 32px;
  display: block;
}
.buy-credits-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.buy-credits-title {
  font-family: 'Figtree', sans-serif;
  font-size: 23px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px #153d1c22;
}
.buy-credits-desc {
  font-size: 15.5px;
  color: #eaffea;
  margin-bottom: 22px;
  line-height: 1.45;
  text-shadow: 0 1px 4px #153d1c11;
}
.buy-credits-btn {
  background: linear-gradient(90deg, #fef200 60%, #fff9cc 100%);
  color: #153d1c;
  font-weight: 800;
  font-size: 17px;
  border: none;
  border-radius: 999px;
  padding: 14px 38px;
  box-shadow: 0 2px 12px 0 #fef20033;
  cursor: pointer;
  position: relative;
  overflow: visible;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
  outline: none;
}
.buy-credits-btn:focus {
  box-shadow: 0 0 0 3px #fff9cc, 0 2px 12px 0 #fef20033;
}
.buy-credits-btn:hover, .buy-credits-btn:active {
  background: linear-gradient(90deg, #fff9cc 0%, #fef200 100%);
  color: #153d1c;
  box-shadow: 0 6px 24px 0 #fef20066;
  transform: translateY(-1.5px) scale(1.025);
}
.btn-glow {
  position: absolute;
  left: -2px; right: -2px; top: -2px; bottom: -2px;
  border-radius: 999px;
  box-shadow: 0 0 12px 2px #fef20055;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.18s, box-shadow 0.18s;
  z-index: 1;
}
.buy-credits-btn:hover .btn-glow,
.buy-credits-btn:focus .btn-glow {
  opacity: 0.8;
  box-shadow: 0 0 20px 6px #fef20088;
}
.buy-credits-badges {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.buy-credits-badge {
  background: #f5f5f5;
  color: #15a357;
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  padding: 2.5px 10px;
  box-shadow: none;
  letter-spacing: 0.1px;
  border: 1px solid #eaffea;
}
@media (max-width: 600px) {
  .buy-credits-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 22px 10px 18px 10px;
    gap: 12px;
    max-width: 100%;
    margin: 28px 0 28px 0;
  }
  .buy-credits-icon {
    width: 44px;
    height: 44px;
  }
  .buy-credits-title {
    font-size: 18px;
  }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: none;}
}
</style> 