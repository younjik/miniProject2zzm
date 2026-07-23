import { Star, Heart, MessageCircle, MapPin } from "lucide-react";
import { restaurants, COMMUNITY_POSTS } from "../../data.js";

export default function CommunityScreen({ onOpenDetail }) {
  return (
    <>
      <h2 className="step-title">커뮤니티</h2>
      <p className="step-desc">다른 사람들의 모임 후기를 둘러보세요.</p>

      <div className="community-list">
        {COMMUNITY_POSTS.map((post) => {
          const restaurant = restaurants.find((r) => r.id === post.restaurantId);
          if (!restaurant) return null;
          return (
            <div key={post.id} className="community-post">
              <div className="community-post-header">
                <div className="community-avatar">{post.author[0]}</div>
                <div className="community-post-headtext">
                  <div className="community-author">{post.author}</div>
                  <div className="community-post-sub">
                    {post.round} · {post.partySize} · {post.createdAt}
                  </div>
                </div>
              </div>

              <p className="community-post-text">{post.text}</p>

              <button type="button" className="community-place-chip" onClick={() => onOpenDetail(restaurant.id)}>
                <MapPin size={13} />
                <span>{restaurant.name}</span>
                <span className="community-place-rating">
                  <Star size={11} fill="currentColor" /> {restaurant.rating}
                </span>
              </button>

              <div className="community-post-footer">
                <span>
                  <Heart size={14} /> {post.likes}
                </span>
                <span>
                  <MessageCircle size={14} /> {post.comments}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
