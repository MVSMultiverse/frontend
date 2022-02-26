import { Language } from '@pancakeswap/uikit'

// export const BN: Language = { locale: 'bn-BD', language: 'বাংলা', code: 'bn' }
// export const DE: Language = { locale: 'de-DE', language: 'Deutsch', code: 'de' }
// export const EL: Language = { locale: 'el-GR', language: 'Ελληνικά', code: 'el' }
// export const FI: Language = { locale: 'fi-FI', language: 'Suomalainen', code: 'fi' }
// export const FIL: Language = { locale: 'fil-PH', language: 'Filipino', code: 'fil' }
// export const HI: Language = { locale: 'hi-IN', language: 'हिंदी', code: 'hi' }
// export const HU: Language = { locale: 'hu-HU', language: 'Magyar', code: 'hu' }
// export const ID: Language = { locale: 'id-ID', language: 'Bahasa Indonesia', code: 'id' }
// export const IT: Language = { locale: 'it-IT', language: 'Italiano', code: 'it' }
// export const NL: Language = { locale: 'nl-NL', language: 'Nederlands', code: 'nl' }
// export const PL: Language = { locale: 'pl-PL', language: 'Polski', code: 'pl' }
// export const PTBR: Language = { locale: 'pt-BR', language: 'Português (Brazil)', code: 'pt-br' }
// export const SVSE: Language = { locale: 'sv-SE', language: 'Svenska', code: 'sv' }
// export const TA: Language = { locale: 'ta-IN', language: 'தமிழ்', code: 'ta' }
// export const RO: Language = { locale: 'ro-RO', language: 'Română', code: 'ro' }
// export const UK: Language = { locale: 'uk-UA', language: 'Українська', code: 'uk' }
// export const ZHTW: Language = { locale: 'zh-TW', language: '繁體中文', code: 'zh-tw' }
// export const ZHCN: Language = { locale: 'zh-CN', language: '简体中文', code: 'zh-cn' }

export const AR: Language = { locale: 'ar-SA', language: 'العربية', code: 'ar' } // العربية   AR
export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' } // English   EN
export const ESES: Language = { locale: 'es-ES', language: 'Español', code: 'es-ES' } // Español   ESES
export const FR: Language = { locale: 'fr-FR', language: 'Français', code: 'fr' } // Français FR
export const JA: Language = { locale: 'ja-JP', language: '日本語', code: 'ja' }  // 日本語  JA
export const KO: Language = { locale: 'ko-KR', language: '한국어', code: 'ko' }   // 한국어  KO
export const PTPT: Language = { locale: 'pt-PT', language: 'Português', code: 'pt-pt' }  // Português  PTPT
export const RU: Language = { locale: 'ru-RU', language: 'Русский', code: 'ru' }  // Русский  RU
export const TR: Language = { locale: 'tr-TR', language: 'Türkçe', code: 'tr' } // Türkçe TR
export const VI: Language = { locale: 'vi-VN', language: 'Tiếng Việt', code: 'vi' } // Tiếng Việt  VI
export const languages = {
  // 'bn-BD': BN,
  // 'de-DE': DE,
  // 'el-GR': EL,
  // 'fi-FI': FI,
  // 'fil-PH': FIL,
  // 'hi-IN': HI,
  // 'hu-HU': HU,
  // 'id-ID': ID,
  // 'it-IT': IT,
  // 'nl-NL': NL,
  // 'pl-PL': PL,
  // 'pt-BR': PTBR,
  // 'ro-RO': RO,
  // 'sv-SE': SVSE,
  // 'ta-IN': TA,
  // 'uk-UA': UK,
  // 'zh-CN': ZHCN,
  // 'zh-TW': ZHTW,
  'ar-SA': AR,
  'en-US': EN,
  'es-ES': ESES,
  'fr-FR': FR,
  'ja-JP': JA,
  'ko-KR': KO,
  'pt-PT': PTPT,
  'ru-RU': RU,
  'tr-TR': TR,
  'vi-VN': VI,
}

export const languageList = Object.values(languages)
