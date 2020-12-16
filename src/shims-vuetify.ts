import Vue, { VueConstructor } from 'vue'

import {
  VAutocomplete,
  VDivider,
  VBtn,
  VCheckbox,
  VChip,
  VIcon,
  VList,
  VMenu,
  VSelect,
  VTextField,
  VListItem,
  VListItemContent,
  VListItemAction,
  VListItemTitle,
  VListItemSubtitle,
  VDataTable,
  VSlideGroup,
  VSlideItem,
  VDataIterator,
  VDatePicker,
  VPagination,
  VTimePicker,
  VCard,
  VCardActions,
  VTreeview,
  VTreeviewNode,
  VToolbar,
  VToolbarTitle,
  VTooltip,
  VRow,
  VCol,
  VSpacer,
  VSheet
} from 'vuetify/lib'

function VueComponent (component: any|undefined, name: string): VueConstructor<Vue> {
  if (component) return component as VueConstructor<Vue>
  return (Vue as any).options.components[name] as VueConstructor<Vue>
}

let VAutocompleteC
let VDividerC
let VBtnC
let VCheckboxC
let VChipC
let VIconC
let VListC
let VMenuC
let VSelectC
let VSelectListC
let VTextFieldC
let VListItemC
let VListItemContentC
let VListItemActionC
let VListItemTitleC
let VListItemSubtitleC
let VDataTableC
let VSlideGroupC
let VSlideItemC
let VDataIteratorC
let VDatePickerC
let VPaginationC
let VTimePickerC
let VCardC
let VCardActionsC
let VTreeviewC
let VTreeviewNodeC
let VToolbarC
let VToolbarTitleC
let VTooltipC
let VRowC
let VColC
let VSpacerC
let VSheetC

try {
  VAutocompleteC = VAutocomplete
  VDividerC = VDivider
  VBtnC = VBtn
  VCheckboxC = VCheckbox
  VChipC = VChip
  VIconC = VIcon
  VListC = VList
  VMenuC = VMenu
  VSelectC = VSelect
  VTextFieldC = VTextField
  VListItemC = VListItem
  VListItemContentC = VListItemContent
  VListItemActionC = VListItemAction
  VListItemTitleC = VListItemTitle
  VListItemSubtitleC = VListItemSubtitle
  VDataTableC = VDataTable
  VSlideGroupC = VSlideGroup
  VSlideItemC = VSlideItem
  VDataIteratorC = VDataIterator
  VDatePickerC = VDatePicker
  VPaginationC = VPagination
  VTimePickerC = VTimePicker
  VCardC = VCard
  VCardActionsC = VCardActions
  VTreeviewC = VTreeview
  VTreeviewNodeC = VTreeviewNode
  VToolbarC = VToolbar
  VToolbarTitleC = VToolbarTitle
  VTooltipC = VTooltip
  VRowC = VRow
  VColC = VCol
  VSpacerC = VSpacer
  VSheetC = VSheet
} catch (error) {
  VAutocompleteC = undefined
  VDividerC = undefined
  VBtnC = undefined
  VCheckboxC = undefined
  VChipC = undefined
  VIconC = undefined
  VListC = undefined
  VMenuC = undefined
  VSelectC = undefined
  VSelectListC = undefined
  VTextFieldC = undefined
  VListItemC = undefined
  VListItemContentC = undefined
  VListItemActionC = undefined
  VListItemTitleC = undefined
  VListItemSubtitleC = undefined
  VDataTableC = undefined
  VSlideGroupC = undefined
  VSlideItemC = undefined
  VDataIteratorC = undefined
  VDatePickerC = undefined
  VPaginationC = undefined
  VTimePickerC = undefined
  VCardC = undefined
  VCardActionsC = undefined
  VTreeviewC = undefined
  VTreeviewNodeC = undefined
  VToolbarC = undefined
  VToolbarTitleC = undefined
  VTooltipC = undefined
  VRowC = undefined
  VColC = undefined
  VSpacerC = undefined
  VSheetC = undefined
}

export const VAutocompleteA = VueComponent(VAutocompleteC, 'VAutocomplete')
export const VDividerA = VueComponent(VDividerC, 'VDivider')
export const VBtnA = VueComponent(VBtnC, 'VBtn')
export const VCheckboxA = VueComponent(VCheckboxC, 'VCheckbox')
export const VChipA = VueComponent(VChipC, 'VChip')
export const VIconA = VueComponent(VIconC, 'VIcon')
export const VListA = VueComponent(VListC, 'VList')
export const VMenuA = VueComponent(VMenuC, 'VMenu')
export const VSelectA = VueComponent(VSelectC, 'VSelect')
export const VTextFieldA = VueComponent(VTextFieldC, 'VTextField')
export const VListItemA = VueComponent(VListItemC, 'VListItem')
export const VListItemContentA = VueComponent(VListItemContentC, 'VListItemContent')
export const VListItemActionA = VueComponent(VListItemActionC, 'VListItemAction')
export const VListItemTitleA = VueComponent(VListItemTitleC, 'VListItemTitle')
export const VListItemSubtitleA = VueComponent(VListItemSubtitleC, 'VListItemSubtitle')
export const VDataTableA = VueComponent(VDataTableC, 'VDataTable')
export const VSlideGroupA = VueComponent(VSlideGroupC, 'VSlideGroup')
export const VSlideItemA = VueComponent(VSlideItemC, 'VSlideItem')
export const VDataIteratorA = VueComponent(VDataIteratorC, 'VDataIterator')
export const VDatePickerA = VueComponent(VDatePickerC, 'VDatePicker')
export const VPaginationA = VueComponent(VPaginationC, 'VPagination')
export const VTimePickerA = VueComponent(VTimePickerC, 'VTimePicker')
export const VCardA = VueComponent(VCardC, 'VCard')
export const VCardActionsA = VueComponent(VCardActionsC, 'VCardActions')
export const VTreeviewA = VueComponent(VTreeviewC, 'VTreeview')
export const VTreeviewNodeA = VueComponent(VTreeviewNodeC, 'VTreeviewNode')
export const VToolbarA = VueComponent(VToolbarC, 'VToolbar')
export const VToolbarTitleA = VueComponent(VToolbarTitleC, 'VToolbarTitle')
export const VTooltipA = VueComponent(VTooltipC, 'VTooltip')
export const VRowA = VueComponent(VRowC, 'VRow')
export const VColA = VueComponent(VColC, 'VCol')
export const VSpacerA = VueComponent(VSpacerC, 'VSpacer')
export const VSheetA = VueComponent(VSheetC, 'VSheet')
