import Vue, { VNode, VueConstructor } from 'vue'

export interface Command {
  icon?: string,
  iconColor?: Number|String,
  text?: string,
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
      icon: 'mdi-check-bold',
      iconColor: 'success',
      disabled: () => false
    },
    {
      target: component,
      action: 'Close',
      text: 'Close',
      icon: 'mdi-close',
      iconColor: 'error',
      disabled: () => false
    },
    {
      target: component,
      action: 'ExpandAll',
      text: 'Expand all',
      icon: 'mdi-arrow-expand-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'CollapseAll',
      text: 'Collapse all',
      icon: 'mdi-arrow-collapse-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'SelectAll',
      text: 'Select all',
      icon: 'mdi-select-all',
      disabled: () => false
    },
    {
      target: component,
      action: 'InvertSelection',
      text: 'Invert selection',
      icon: 'mdi-select-inverse',
      disabled: () => false
    },
    {
      target: component,
      action: 'UnselectAll',
      text: 'Unselect all',
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
      icon: 'mdi-check-bold',
      iconColor: 'success',
      disabled: () => false
    },
    {
      target: component,
      action: 'Close',
      text: 'Close',
      icon: 'mdi-close',
      iconColor: 'error',
      disabled: () => false
    },
    {
      target: component,
      action: 'InvertSelection',
      text: 'Invert selection',
      icon: 'mdi-select-inverse',
      disabled: () => false
    }
  ]
}
