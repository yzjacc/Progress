interface DatetimeFormats { 
  [locale: string]: {
    [formatName:string] : Intl.DateTimeFormatOptions
  }
}

const datetimeFormats:DatetimeFormats = {};

['en-US', 'zh-CN', 'ja-JP'].forEach(locale => { 
  datetimeFormats[locale] = {
    shortFormat: {
      year:'numeric',month:'short', day:'numeric'
    },
    longFormat: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric',second: 'numeric'
    }
  }
})

export default datetimeFormats;