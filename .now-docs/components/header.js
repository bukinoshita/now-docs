'use strict'

import React from 'react'

const Header = ({ title, description }) => (
  <header className="header">
    <div className="title center">
      <span className="text">{title}</span>
      <span className="subtext">{description}</span>
    </div>
  </header>
)

export default Header
