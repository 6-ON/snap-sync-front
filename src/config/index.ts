import './axios'

import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import nProgress from 'nprogress'
TimeAgo.addDefaultLocale(en)
nProgress.configure({ showSpinner: false })
