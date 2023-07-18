function Footer() {
  const year = new Date()
  return (
    <footer className="footer">
      <p className="footer__text">&copy; {year.getFullYear()} Mesto Russia</p>
    </footer>
  )
}

export default Footer
