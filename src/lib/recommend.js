import { REGION_COORDS, restaurants } from "../data.js";

export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function resolveRegion(rawName) {
  if (!rawName) return null;
  const name = rawName.trim();
  if (!name) return null;
  if (REGION_COORDS[name]) return REGION_COORDS[name];
  const key = Object.keys(REGION_COORDS).find((k) => k.includes(name) || name.includes(k));
  return key ? REGION_COORDS[key] : null;
}

export function getTargetCoord(answers) {
  if (answers.regionMode === "single") {
    return answers.region1Coord || resolveRegion(answers.region1);
  }
  const a = answers.regionACoord || resolveRegion(answers.regionA);
  const b = answers.regionBCoord || resolveRegion(answers.regionB);
  if (!a || !b) return null;
  return { lat: (a.lat + b.lat) / 2, lng: (a.lng + b.lng) / 2 };
}

function restaurantMatchesTag(r, tag) {
  return r.moodTags.includes(tag) || r.reviewSummary.includes(tag);
}

function restaurantMatchesCuisine(r, tag) {
  return (
    r.cuisineType === tag ||
    r.menuTags.includes(tag) ||
    r.menu.some((m) => m.includes(tag)) ||
    r.reviewSummary.includes(tag)
  );
}

function partySizeBonus(partySize, r) {
  switch (partySize) {
    case "5명 이상":
      return r.moodTags.includes("단체석") ? 6 : 0;
    case "3~4명":
      return r.moodTags.includes("회식") || r.moodTags.includes("단체석") ? 3 : 0;
    case "2명":
      return r.moodTags.includes("데이트") ? 4 : 0;
    case "1명":
      return r.moodTags.includes("혼술") ? 5 : 0;
    default:
      return 0;
  }
}

function conceptBonus(concept, r) {
  switch (concept) {
    case "가볍게 한잔":
      return (r.recommendedRound.includes("2차") ? 6 : 0) + (r.moodTags.includes("시끌벅적") ? 4 : 0);
    case "든든하게 식사":
      return (r.recommendedRound.includes("1차") ? 6 : 0) + (r.moodTags.includes("조용한") ? 4 : 0);
    case "대화 위주의 조용한 모임":
      return (
        (r.moodTags.includes("조용한") ? 5 : 0) +
        (r.moodTags.includes("데이트") ? 3 : 0) +
        (r.moodTags.includes("감성") ? 3 : 0)
      );
    case "만취 목표":
      return (
        (r.moodTags.includes("시끌벅적") ? 5 : 0) +
        (r.moodTags.includes("혼술") ? 4 : 0) +
        (r.recommendedRound.includes("2차") || r.recommendedRound.includes("3차 이상") ? 5 : 0)
      );
    default:
      return 0;
  }
}

export function getRecommendations(answers) {
  const target = getTargetCoord(answers);
  if (!target) return [];

  let pool = restaurants.map((r) => ({ ...r, distance: haversineKm(target.lat, target.lng, r.lat, r.lng) }));
  pool.sort((a, b) => a.distance - b.distance);

  let near = pool.filter((r) => r.distance <= 3);
  if (near.length < 4) near = pool.slice(0, 8);

  if (answers.round && answers.round !== "모르겠어요") {
    near = near.filter((r) => r.recommendedRound.includes(answers.round));
  }

  if (answers.concept === "술 없이 맛집 탐방") {
    near = near.filter((r) => r.recommendedRound.includes("1차"));
  }

  const allCuisines = [...answers.cuisines, ...answers.customCuisines];
  if (allCuisines.length && !answers.cuisines.includes("모르겠어요")) {
    near = near.filter((r) => allCuisines.some((tag) => restaurantMatchesCuisine(r, tag)));
  }

  if (answers.menuTags.length) {
    near = near.filter((r) => r.menuTags.some((t) => answers.menuTags.includes(t)));
  }

  const allMoods = [...answers.moods, ...answers.customMoods];
  if (allMoods.length && !answers.moods.includes("모르겠어요")) {
    near = near.filter((r) => allMoods.some((tag) => restaurantMatchesTag(r, tag)));
  }

  near.forEach((r) => {
    let score = r.rating * 2 - r.distance * 0.5;
    score += r.moodTags.filter((t) => allMoods.includes(t)).length * 8;
    score += conceptBonus(answers.concept, r);
    score += partySizeBonus(answers.partySize, r);
    r.score = score;
  });
  near.sort((a, b) => b.score - a.score);

  return near;
}
