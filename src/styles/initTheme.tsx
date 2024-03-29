import {
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
  themeProperties,
} from './theme'

export const setColorsByTheme = () => {
  const modeProperties = '[MODEPROPERTIES]'
  const colorModeKey = '[COLORMODEKEY]'
  const colorModeCssProp = '[COLORMODECSSPROP]'

  // 사용자 선호도 파악
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMq = mql.matches

  // 로컬 스토리지에 저장된 테마값
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'dark' // 컬러모드 기본값은 다크

  const hasUsedToggle = typeof persistedPreference === 'string' // 로컬스토리지에 저장된 테마값이 있는지 여부를 저장

  if (hasUsedToggle) {
    colorMode = persistedPreference // 저장했으면 로컬스토리지값 대로 컬러모드 지정
  } else {
    colorMode = prefersDarkFromMq ? 'dark' : 'light' // 아니라면 선호도에 따라 컬러모드 지정
  }

  const root = document.documentElement

  // 스타일 태그 속성에 현재 컬러모드 값을 기록
  root.style.setProperty(colorModeCssProp, colorMode)

  // theme 속성값을 기반으로 css 변수를 만들어내기
  // 예를 들어
  //  "card-background": {
  //  		light: themeColors.primary.light,
  //  		dark: themeColors.secondary.dark,
  //   },
  // 라는 테마값은 var(--card-background)로 변화함
  Object.entries(modeProperties).forEach(([name, colorByTheme]) => {
    const cssVarName = `--${name}`
    // @ts-ignore
    root.style.setProperty(cssVarName, colorByTheme[colorMode])
  })
}

export const InitThemeScript = () => {
  const stringifyFn = String(setColorsByTheme)
    // eslint-disable-next-line quotes
    .replace('"[MODEPROPERTIES]"', JSON.stringify(themeProperties)) // JSON은 문자열로 변환시 쌍따옴표가 생겨서 추가적으로 쌍따옴표를 붙여서 처리해야 함.
    .replace('[COLORMODEKEY]', COLOR_MODE_KEY)
    .replace('[COLORMODECSSPROP]', INITIAL_COLOR_MODE_CSS_PROP)

  const fnToRunOnClient = `(${stringifyFn})()`

  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />
}
