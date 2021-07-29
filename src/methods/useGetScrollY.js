import { ref, onMounted, onUnmounted } from 'vue';

export default function getScrollY() {
  const scrollY = ref(0);

  const getPosition = () => {
    scrollY.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener('scroll', getPosition);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', getPosition);
  });
  return {
    scrollY,
  };
}
