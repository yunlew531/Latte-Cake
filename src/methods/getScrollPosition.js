import { ref, onMounted, onUnmounted } from 'vue';

export default function getPosition() {
  const scrollY = ref(0);

  const getScrollY = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener('scroll', getScrollY);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', getScrollY);
  });
  return {
    scrollY,
  };
}
