'use strict'

import React from 'react'

const Sidebar = ({ items }) => (
  <aside className="sidebar">
    <ul className="menu">
      {items.map(item => {
        const name = item.charAt(0).toUpperCase() + item.slice(1)
        const id = '#' + item.toLowerCase()

        return (
          <li className="menu-item" key={item}>
            <a className="menu__link" href={id}>
              {name}
            </a>
          </li>
        )
      })}
    </ul>
  </aside>
)

export default Sidebar
