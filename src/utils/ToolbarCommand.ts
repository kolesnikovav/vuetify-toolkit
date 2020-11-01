import Vue, { VueConstructor } from 'vue'

export interface Command {
  icon?: string,
  iconColor?: Number|String,
  text?: string,
  hint?: string,
  target: VueConstructor<Vue>,
  action: Function | String,
  disabled: ()=> boolean | Boolean
}

export function defaultTreeSelectCommands (component: VueConstructor<Vue>): Command[] {
  return [
    {
      target: component,
      action: 'Ok',
      text: 'OK',
      hint: 'OK',
      icon: 'mdi-check-bold',
      iconColor: 'success',
      disabled: () => false
    },
    {
      target: component,
      action: 'Close',
      text: 'Close',
      hint: 'Close',
      icon: 'mdi-close',
      iconColor: 'error',
      disabled: () => false
    },
    {
      target: component,
      action: 'ExpandAll',
      text: 'Expand',
      hint: 'Expand all items',
      icon: 'mdi-arrow-expand-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'CollapseAll',
      text: 'Collapse',
      hint: 'Collapse all items',
      icon: 'mdi-arrow-collapse-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'SelectAll',
      text: 'Select',
      hint: 'Select all',
      icon: 'mdi-select-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'InvertSelection',
      text: 'Invert',
      hint: 'Invert selection',
      icon: 'mdi-select-inverse',
      disabled: () => false
    },
    {
      target: component,
      action: 'UnselectAll',
      text: 'Unselect',
      hint: 'Unselect all',
      icon: 'mdi-select-off',
      disabled: () => false
    }
  ]
}

export function defaultDataGridSelectCommands (component: VueConstructor<Vue>): Command[] {
  return [
    {
      target: component,
      action: 'Ok',
      text: 'OK',
      hint: 'OK',
      icon: 'mdi-check-bold',
      iconColor: 'success',
      disabled: () => false
    },
    {
      target: component,
      action: 'Close',
      text: 'Close',
      hint: 'Close',
      icon: 'mdi-close',
      iconColor: 'error',
      disabled: () => false
    },
    {
      target: component,
      action: 'InvertSelection',
      hint: 'Invert selection',
      icon: 'mdi-select-inverse',
      disabled: () => false
    }
  ]
}
