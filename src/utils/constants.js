const ENDPOINTS = {
  login: {
    path: "oauth/token",
    method: "POST",
    auth: false,
  },
  register: {
    path: "api/register",
    method: "POST",
    auth: false,
  },
  refreshToken: {
    path: "oauth/token",
    method: "POST",
    auth: true,
  },
  user: {
    path: "api/user",
    method: "GET",
    auth: true,
  },
  updateUser: {
    path: "api/user",
    method: "POST",
    auth: true,
  },
  orders: {
    path: "api/private/orders",
    method: "GET",
    auth: true,
  },
  //
  ownedProducts: {
    path: "api/private/owned-products",
    method: "GET",
    auth: true,
  },
  showPDF: {
    path: "api/private/show-pdf",
    method: "GET",
    auth: true,
  },
  showPreviewPDF: {
    path: "api/show-preview",
    method: "GET",
    auth: false,
  },
  sliders: {
    path: "api/sliders",
    method: "GET",
    auth: false,
  },
  products: {
    path: "api/products",
    method: "GET",
    auth: false,
  },
  productsByCategory: {
    path: "api/category",
    method: "GET",
    auth: false,
  },
  productWithAuth: {
    path: "api/private/product",
    method: "GET",
    auth: true,
  },
  productWithoutAuth: {
    path: "api/product",
    method: "GET",
    auth: false,
  },
  categories: {
    path: "api/categories",
    method: "GET",
    auth: false,
  },
  createSupportRecord: {
    path: "api/support-records",
    method: "POST",
    auth: false,
  },
  supportRecordsWithAuth: {
    path: "api/support-records",
    method: "GET",
    auth: true,
  },
  supportRecordsWithoutAuth: {
    path: "api/private/support-records",
    method: "GET",
    auth: false,
  },
  supportRecord: {
    path: "api/support-records",
    method: "GET",
    auth: false,
  },
  sendMessageToSupportRecord: {
    path: "api/send-message",
    method: "POST",
    auth: false,
  },
}

module.exports = {
  BASE_URL:"https://kitaphane.theozmedia.com/",
  CLIENT_ID:"934de6ff-3d39-4c6f-bc7c-71f1fb236ee7", 
  CLIENT_SECRET:"fbXlq6mZkTLxK0hNFcXMlTswAKdPAG7IIilCbyo1",
  endpoints: ENDPOINTS,
  primaryColor: "#3B82F6",
  bookCoverRatio: 1.50,
}
