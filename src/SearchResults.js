import Users from "./Users";
import Favorites from "./Favorites";
import Tweets from "./Tweets";

const SearchResults = ({
  userReturned,
  addFavorite,
  removeFavorite,
  favoriteUsers,
  tweetsReturned,
  getUserTweets,
}) => {
  return (
    <div className="container mt-4 ms-4">
      <div className="row">
        <div className="col-auto">
          <Favorites
            favoriteUsers={favoriteUsers}
            removeFavorite={removeFavorite}
            getUserTweets={getUserTweets}
          />
        </div>
        <div className="col">
          {userReturned && (
            <Users userReturned={userReturned} addFavorite={addFavorite} />
          )}
          {tweetsReturned && (
            <Tweets
              tweetsReturned={tweetsReturned}
              addFavorite={addFavorite}
              getUserTweets={getUserTweets}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchResults;
