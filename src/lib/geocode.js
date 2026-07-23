// 무료 · API 키 없이 쓸 수 있는 OpenStreetMap Nominatim 역지오코딩
export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ko&zoom=17`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const a = data?.address;
    if (!a) return null;

    const parts = [
      a.city_district || a.borough,
      a.suburb || a.neighbourhood || a.quarter,
      a.road,
    ].filter(Boolean);
    const unique = [...new Set(parts)];
    if (unique.length) return unique.join(" ");

    return data.display_name ? data.display_name.split(",").slice(0, 2).join(",").trim() : null;
  } catch {
    return null;
  }
}
