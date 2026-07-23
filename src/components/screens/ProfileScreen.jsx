import logoUrl from "../../assets/logo.png";

export default function ProfileScreen({ favoriteCount }) {
  return (
    <>
      <h2 className="step-title">프로필</h2>
      <p className="step-desc">이쯤을 소개할게요.</p>

      <div className="profile-card">
        <img src={logoUrl} alt="" className="profile-avatar" />
        <div className="profile-name">게스트</div>
        <div className="profile-sub">번개 모임러</div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <div className="profile-stat-value">{favoriteCount}</div>
          <div className="profile-stat-label">즐겨찾기</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-value">16</div>
          <div className="profile-stat-label">등록된 장소</div>
        </div>
      </div>

      <div className="profile-list">
        <div className="profile-list-item">
          <span>슬로건</span>
          <b>어디서 모일지 고민된다면, 이쯤</b>
        </div>
        <div className="profile-list-item">
          <span>데이터</span>
          <b>하드코딩 샘플 16곳</b>
        </div>
        <div className="profile-list-item">
          <span>버전</span>
          <b>MVP 1.0</b>
        </div>
      </div>
    </>
  );
}
