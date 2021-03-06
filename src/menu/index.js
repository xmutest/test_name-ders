import {
  uniqueId
} from 'lodash'

import ControllerLink from './modules/ControllerLink/ControllerLink';
import SystemComposition from './modules/SystemComposition/SystemComposition';
import siteVerification from './modules/on-siteVerification/siteVerification';
import GlobalAssessment from './modules/GlobalAssessment/GlobalAssessment';
import AssessmentAnd from './modules/AssessmentAnd/AssessmentAnd';
import OverallEvaluation from './modules/OverallEvaluation/OverallEvaluation';
/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuAside = supplementPath([
  ControllerLink,
  SystemComposition,
  siteVerification,
  GlobalAssessment,
  AssessmentAnd,
  OverallEvaluation
])


export const menuHeader = supplementPath([
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  ControllerLink,
  SystemComposition,
  siteVerification,
  GlobalAssessment,
  AssessmentAnd,
  OverallEvaluation
])

