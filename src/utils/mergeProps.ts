const mergeProps = (targetProps: any, sourceProps: any, propNameSource: any) => {
  for (const name in propNameSource) {
    // eslint-disable-next-line no-prototype-builtins
    if (sourceProps[name] || (sourceProps as any).hasOwnProperty(name)) {
      (targetProps as any)[name] = sourceProps[name]
    }
  }
}

export { mergeProps }
