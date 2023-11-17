import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";

export const useTheme = () => { 
  const globalStore = useGlobalStore()
  const { isDark } = storeToRefs(globalStore)

  const switchTheme = (init?: Boolean) => {
    if (!init) { 
      globalStore.setGlobalState("isDark", !isDark.value)
    }
    
    const html = document.documentElement as HTMLElement;
    if (isDark.value) html.setAttribute('class', 'dark');
    else html.setAttribute('class', 'primary');
  }

  const initTheme = () => { 
    switchTheme(true)
  }

  return {
    switchTheme,
    initTheme
  }
}