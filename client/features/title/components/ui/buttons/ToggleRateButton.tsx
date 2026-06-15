

import React from 'react'

function ToggleRateButton({ children }: { children: (state: boolean) => React.ReactNode }) {
  return (
    <div>
      {children(true)}
    </div>
  )
}

export default ToggleRateButton
