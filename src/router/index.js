import Vue from "vue";
import VueRouter from "vue-router";

/**解决router重复报错 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/individuation",
  },
  {
    path: "/individuation",
    component: () => import("@/views/individuation/Individuation"),
  },
  {
    path: "/allmusiclist",
    component: () => import("@/views/music-list/all-music-list"),
  },
  {
    path: "/ranklist",
    component: () => import("@/views/rank-list/rank-list"),
  },
  {
    path: "/artist-list",
    component: () => import("@/views/artist-list/artist-category"),
  },
  {
    path: "/followPage/:userId/:nickname/:follow",
    component: () => import("@/views/follow/follow"),
  },
  {
    path: "/mv",
    component: () => import("@/views/mv/mv"),
  },
  {
    path: "/new-songs",
    component: () => import("@/views/new-songs/new-songs"),
  },
  {
    path: "/album-detail",
    component: () => import("@/views/album-detail/album-detail"),
  },
  {
    path: "/mv-detail/:id",
    component: () => import("@/views/mv/mv-detail"),
  },
  {
    path: "/mv-list",
    component: () => import("@/views/mv/mv-category"),
  },
  {
    path: "/artist-detail",
    name: "artist-detail",
    component: () => import("@/views/artist-detail/artist-detail"),
  },
  {
    path: "/user-information/:uid",
    name: "user-information",
    component: () => import("@/views/user-information/user-information"),
  },
  {
    path: "/musiclistdetail/:id/:time",
    component: () => import("@/views/list-detail/MusicListDetail"),
  },
  {
    path: "/recommendSonglistDetail",
    component: () =>
      import("@/views/recommendSonglistDetail/recommendSonglistDetail"),
  },
  {
    path: "/search-detail/:keywords",
    // name: "search-detail",
    component: () => import("@/views/search-detail/search-detail"),
    children: [
      {
        path: "/",
        redirect: "songs",
      },
      {
        path: "songs",
        name: "search-songs",
        component: () =>
          import("@/views/search-detail/childsPage/search-songs"),
      },
      {
        path: "artist",
        name: "search-artist",
        component: () =>
          import("@/views/search-detail/childsPage/search-artist"),
      },
      {
        path: "playlist",
        name: "search-playlist",
        component: () =>
          import("@/views/search-detail/childsPage/search-playlist"),
      },
      {
        path: "mv",
        name: "search-mv",
        component: () => import("@/views/search-detail/childsPage/search-mv"),
      },
      {
        path: "album",
        name: "search-album",
        component: () =>
          import("@/views/search-detail/childsPage/search-album"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
