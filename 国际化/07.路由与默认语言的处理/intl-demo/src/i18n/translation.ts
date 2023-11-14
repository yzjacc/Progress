import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { LANGUAGES } from "./constants";
import i18n from "@/i18n";

const Translation = {
  get supportedLocales() { 
    return LANGUAGES;
  },

  //当前语言的属性
  get currentLocale() { 
    return i18n.global.locale.value
  },

  set currentLocale(newLocale: string) { 
    i18n.global.locale.value = newLocale;
  },

  //获取.env中默认的语言设置
  get defaultLocale() { 
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  //判断语言常量中支不支持当前参数的语言
  isLocaleSupported(locale: string) { 
    return locale in Translation.supportedLocales;
  },

  //获取用户浏览器默认的语言
  getUserLocale() { 
    let locale = navigator.language ? navigator.language : Translation.defaultLocale;
    return {
      locale,//zh-CN,en-US
      localeNoRegion:locale.split('-')[0] //zh,en
    }
  },

  //获取用户本地持久化的语言
  getPersistedLocale() { 
    let persistedLocale = localStorage.getItem("user-locale") || "";

    if (Translation.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    }
    else { 
      return null;
    }
  },

  //获取当前默认语言
  guessDefaultLocale() { 
    const userPersistedLocale = Translation.getPersistedLocale();

    //如果用户本地持久化了语言，就返回持久化的语言
    if (userPersistedLocale) { 
      return userPersistedLocale;
    }

    const userPreferredLocale = Translation.getUserLocale();

    //如果用户浏览器的语言被支持，就返回浏览器的语言
    //如果带有地区信息的语言被支持，就直接返回
    if (Translation.isLocaleSupported(userPreferredLocale.locale)) { 
      return userPreferredLocale.locale;
    }

    //返回不带地区信息的语言
    if(Translation.isLocaleSupported(userPreferredLocale.localeNoRegion)) { 
      return userPreferredLocale.localeNoRegion;
    }

    //如果以上都不满足，就返回程序环境变量中的默认语言
    return Translation.defaultLocale;
  },

  //路由守卫，每次切换语言的时候加上路由参数
  routerMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) { 
    const paramLocale = to.params.locale as string;

    if(!Translation.isLocaleSupported(paramLocale)) { 
      const defaultLocale = Translation.guessDefaultLocale();
      return next(defaultLocale);
    }

    Translation.switchLanguage(paramLocale);

    return next();
  },

  i18nRoute(to:any) { 
    return {
      ...to,
      params: { locale: Translation.currentLocale },
      ...to.params
    }
  },


  switchLanguage(newLocale: string) { 
    Translation.currentLocale = newLocale;
    //将html标签的lang属性设置为新的语言
    document.documentElement.lang = newLocale;
    //将当前语言保存到localStorage中
    localStorage.setItem("user-locale", newLocale);
  }
}

export default Translation