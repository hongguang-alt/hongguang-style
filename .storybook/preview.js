//配置样式文件
import '../src/styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab,fas)

//预览配置参数
export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*",
  },
  options: {
    storySort: {
      order: ['welcome', 'components'],
    },
  },
}