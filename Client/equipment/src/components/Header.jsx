import React from 'react'
import Logo from '../images/Logo.png'

const Header = () => {
  return (
    <header className='flex justify-between items-center px-14 py-4 bg-amber-500'>
        <div className='flex items-center gap-2'>
            <img src={Logo} alt="equipment" />
            <h1>Equipment.ng</h1>
        </div>
        <div className='flex gap-4'>
            <div>
                <h1>Complete Profile</h1>
            </div>
            <div>
                CART
            </div>
            <div>
                PROFILE
            </div>
        </div>
    </header>
  )
}

export default Header
