import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './styles/index.css'
import { useComponents } from './useComponents'
import ExDesign from 'ex-design'

export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.use(ExDesign)
    useComponents(app)
  }
}
