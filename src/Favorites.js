const Favorites = ({ favoriteUsers, removeFavorite, getUserTweets }) => {
  const styleIcon = {
    fontSize: "1rem",
  };
  return (
    <div className="col-auto me-4 pe-3 border-end">
      <div className="row mb-4 border-bottom">
        <div className="d-line h6">Favorites List</div>
      </div>
      <ul>
        {favoriteUsers.map((user) => (
          <li key={user.username} className="col-auto d-flex mt-3">
            <button
              onClick={() => getUserTweets(user.author_id)}
              className="border rounded-pill ps-3 pe-3 shadow-sm bg-body"
            >
              @{user.username}
            </button>
            <button
              onClick={() => removeFavorite(user.username)}
              className="ms-4 border-0 bg-body text-info float-md-end"
            >
              <i className="bi bi-person-dash-fill" style={styleIcon}></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Favorites;
