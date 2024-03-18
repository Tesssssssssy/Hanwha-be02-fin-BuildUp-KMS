import { createRouter, createWebHistory } from "vue-router";
import VueJwtDecode from "vue-jwt-decode";

import MainPage from "@/pages/MainPage.vue";
import AuthSignupPage from "@/pages/AuthSignupPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import MyActivePage from "@/pages/MyActivePage.vue";
import MyProfilePage from "@/pages/MyProfilePage.vue";
import SearchResultPage from "@/pages/SearchResultPage.vue";
import BoardWritePage from "@/pages/BoardWritePage.vue";
import ReviewWritePage from "@/pages/ReviewWritePage.vue";
import StudyBoardListPage from "@/pages/StudyBoardListPage.vue";
import SelectSignupPage from "@/pages/SelectSignupPage.vue";
import BoardDetailsPage from "@/pages/BoardDetailsPage.vue";
import ReviewDetailsPage from "@/pages/ReviewDetailsPage.vue";
import ReviewListPage from "@/pages/ReviewListPage.vue";
import EmailValidationPage from "@/pages/EmailValidationPage.vue";
import NoticeBoardListPage from "@/pages/NoticeBoardListPage.vue";
import KakaoLogIn from "@/pages/KakaoLogIn.vue";
import KnowledgeBoardListPage from "@/pages/KnowledgeBoardListPage.vue";
import QnABoardListPage from "@/pages/QnABoardListPage.vue";
import BoardUpdatePage from "@/pages/BoardUpdatePage.vue";
import StudyDetailPage from "@/pages/StudyDetailPage.vue";
import HotListPage from "@/pages/HotListPage.vue";
import TagBoardListPage from "@/pages/TagBoardListPage.vue";

import AdminMainPage from "@/pages/AdminMainPage.vue";
import AdminWithdrawPage from "@/pages/AdminWithdrawPage.vue";
import AdminBoardCategoryRegisterPage from "@/pages/AdminBoardCategoryRegisterPage.vue";
import AdminReviewCategoryRegisterPage from "@/pages/AdminReviewCategoryRegisterPage.vue";
import AdminTagRegisterPage from "@/pages/AdminTagRegisterPage.vue";
import AdminBoardCategoryListPage from "@/pages/AdminBoardCategoryListPage.vue";
import AdminReviewCategoryListPage from "@/pages/AdminReviewCategoryListPage.vue";
import AdminTagListPage from "@/pages/AdminTagListPage.vue";
import AdminUserListPage from "@/pages/AdminUserListPage.vue";
import AdminSignUpPage from "@/pages/AdminSignUpPage.vue";
import AdminLoginPage from "@/pages/AdminLoginPage.vue";
import AdminReviewCategoryUpdatePage from "@/pages/AdminReviewCategoryUpdatePage";
import AdminBoardCategoryUpdatePage from "@/pages/AdminBoardCategoryUpdatePage";
import AdminTagUpdatePage from "@/pages/AdminTagUpdatePage";

const requireAuth = () => (from, to, next) => {
  const storedToken = window.localStorage.getItem("token");
  if (storedToken === null) {
    alert("로그인 후 이용할 수 있습니다.");
    next("/");
  } else {
    const tokenData = VueJwtDecode.decode(storedToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenData.exp < currentTime) {
      alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("token");
      next("/");
    } else {
      next();
    }
  }
};

const requireUserAuth = () => (from, to, next) => {
  const storedToken = window.localStorage.getItem("token");

  if (storedToken === null) {
    alert("로그인 후 이용할 수 있습니다.");
    next("/");
  } else {
    const tokenData = VueJwtDecode.decode(storedToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenData.exp < currentTime) {
      alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("token");
      next("/");
    } else if (tokenData.ROLE !== "ROLE_AUTHUSER") {
      alert("인증회원만 후기글을 작성할 수 있습니다.");
      next("/review");
    } else {
      next();
    }
  }
};

const requireAdminAuth = () => (from, to, next) => {
  const token = window.localStorage.getItem("a_token");
  if (token === null) {
    alert("로그인 후 이용할 수 있습니다.");
    next("/admin/login");
  } else {
    const tokenData = VueJwtDecode.decode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenData.exp < currentTime) {
      alert("로그인 유지시간이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("a_token");
      next("/admin/login");
    } else {
      next();
    }
  }
};

const routes = [
  { path: "/", component: MainPage },
  {
    path: "/KakaoLogIn/:token",
    name: "KakaoLogIn",
    component: () => import("@/pages/KakaoLogIn.vue"),
    props: true,
  },
  {
    path: '/admin/review/category/update/:categoryIdx',
    name: 'AdminReviewCategoryUpdate',
    component: AdminReviewCategoryUpdatePage,
    props: true
  },
  {
    path: '/admin/board/category/update/:categoryIdx',
    name: 'AdminBoardCategoryUpdate',
    component: AdminBoardCategoryUpdatePage,
    props: true
  },
  {
    path: '/admin/tag/update/:categoryIdx',
    name: 'AdminBoardCategoryUpdate',
    component: AdminTagUpdatePage,
    props: true
  },
  { path: "/auth/signup", component: AuthSignupPage },
  { path: "/KakaoLogIn", component: KakaoLogIn },
  { path: "/signup", component: SignupPage },
  { path: "/profile", component: MyProfilePage, beforeEnter: requireAuth() },
  { path: "/mypage", component: MyActivePage, beforeEnter: requireAuth() },
  { path: "/result", component: SearchResultPage },
  { path: "/board/new", component: BoardWritePage, beforeEnter: requireAuth() },
  {
    path: "/review/new",
    component: ReviewWritePage,
    beforeEnter: requireUserAuth(),
  },
  { path: "/study", component: StudyBoardListPage },
  { path: "/board/:boardIdx", component: BoardDetailsPage },
  { path: "/review/:idx", component: ReviewDetailsPage },
  { path: "/board/knowledge", component: KnowledgeBoardListPage },
  { path: "/board/tag", component: TagBoardListPage },
  { path: "/board/qna", component: QnABoardListPage },
  { path: "/review", component: ReviewListPage },
  { path: "/hot", component: HotListPage },
  { path: "/select/signup", component: SelectSignupPage },
  { path: "/email/verify", component: EmailValidationPage },
  { path: "/notice", component: NoticeBoardListPage },
  { path: "/board/mywrite/:boardIdx", component: BoardUpdatePage },
  { path: "/study/detail/:boardIdx", component: StudyDetailPage },
  { path: "/admin", component: AdminMainPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/withdraw", component: AdminWithdrawPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/board/category/register", component: AdminBoardCategoryRegisterPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/review/category/register", component: AdminReviewCategoryRegisterPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/board/category/update", component: AdminBoardCategoryUpdatePage, beforeEnter: requireAdminAuth() },
  { path: "/admin/review/category/update", component: AdminReviewCategoryUpdatePage, beforeEnter: requireAdminAuth() },
  { path: "/admin/tag/update", component: AdminTagUpdatePage, beforeEnter: requireAdminAuth() },
  { path: "/admin/tag/register", component: AdminTagRegisterPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/board/category", component: AdminBoardCategoryListPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/review/category", component: AdminReviewCategoryListPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/tag", component: AdminTagListPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/user", component: AdminUserListPage, beforeEnter: requireAdminAuth() },
  { path: "/admin/signup", component: AdminSignUpPage },
  { path: "/admin/login", component: AdminLoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
