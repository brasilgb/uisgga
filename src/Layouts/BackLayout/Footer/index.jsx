import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-4 py-2 bg-white text-center shadow-lg'>
      <p>&copy;{new Date().getFullYear()} ABrasilWeb. Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer;