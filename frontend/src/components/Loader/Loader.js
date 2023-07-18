function Loader() {
  return (
    <div className="loader">
      <div className="loader__center">
        <svg width="50px" height="50px" viewBox="0 0 50 50">
          <circle className="loader__bg" cx="25" cy="25" r="23" />
          <circle className="loader__circle" cx="25" cy="25" r="23" />
        </svg>
      </div>
    </div>
  )
}

export default Loader
