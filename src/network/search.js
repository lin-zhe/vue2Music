import { request } from "./request";

/**详细热搜列表 */
export function _hotSearchDetail() {
  return request({
    url: "/search/hot/detail",
  });
}

/**搜索 */
export function _Search(keyword, type) {
  return request({
    url: "/search",
    params: {
      keywords: keyword,
      type,
    },
  });
}

/**搜索建议 */
export function _Suggest(keywords) {
  return request({
    url: "/search/suggest",
    params: {
      keywords: keywords,
    },
  });
}
