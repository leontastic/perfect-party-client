import React from 'react'
import { flow, fromPairs, invoke, tap } from 'lodash/fp'

const Form = ({ children, onSubmit, ...props }) => (
  <form
    onSubmit={flow(
      tap(invoke('preventDefault')),
      ({ target }) => [...new FormData(target).entries()],
      fromPairs,
      onSubmit,
    )}
    {...props}
  >
    {children}
  </form>
)

export default Form
