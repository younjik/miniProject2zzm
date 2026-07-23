// 네이버 지도 검색 URL — API 키 없이 이름으로 장소를 찾아 길찾기 버튼까지 한 번에 연결
export function getNaverMapUrl(restaurant) {
  return `https://map.naver.com/p/search/${encodeURIComponent(restaurant.name)}`;
}
