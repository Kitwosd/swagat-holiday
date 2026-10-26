import { toast } from "react-toastify";

const API_BASE_URL =
  "http://localhost:5000/api" ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/**
 * Helper to make API requests with automatic JWT token attachment.
 * (No toasts here — toasts live in each api.* function below.)
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("travels_token");
  const headers = { ...(options.headers || {}) };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMsg =
      data?.message || `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // ---------- Auth ----------
  login: async (email, password) => {
    try {
      const res = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.token) {
        localStorage.setItem("travels_token", res.token);
        localStorage.setItem("travels_user", JSON.stringify(res.user));
      }
      toast.success("Welcome back!");
      return res;
    } catch (e) {
      toast.error(e.message || "Login failed");
      return e;
    }
  },

  register: async (userData) => {
    try {
      const res = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      toast.success("Account created!");
      return res;
    } catch (e) {
      toast.error(e.message || "Registration failed");
      return e;
    }
  },

  getMe: async () => {
    try {
      return await request("/auth/me");
    } catch (e) {
      // silent on purpose — often called when not logged in
      return e;
    }
  },

  logout: () => {
    localStorage.removeItem("travels_token");
    localStorage.removeItem("travels_user");
  },

  // ---------- Trips ----------
  getTrips: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    try {
      return await request(`/trips${query ? `?${query}` : ""}`);
    } catch (e) {
      toast.error(e.message || "Failed to load trips");
      return e;
    }
  },

  getTrip: async (idOrSlug) => {
    try {
      return await request(`/trips/${idOrSlug}`);
    } catch (e) {
      toast.error(e.message || "Failed to load trip");
      return e;
    }
  },

  createTrip: async (tripData) => {
    try {
      const res = await request("/trips", {
        method: "POST",
        body: JSON.stringify(tripData),
      });
      toast.success("Trip created");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to create trip");
      return e;
    }
  },

  updateTrip: async (idOrSlug, tripData) => {
    try {
      const res = await request(`/trips/${idOrSlug}`, {
        method: "PUT",
        body: JSON.stringify(tripData),
      });
      toast.success("Trip updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update trip");
      return e;
    }
  },

  deleteTrip: async (idOrSlug) => {
    try {
      const res = await request(`/trips/${idOrSlug}`, { method: "DELETE" });
      toast.success("Trip deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete trip");
      return e;
    }
  },

  // ---------- Destinations ----------
  getDestinations: async () => {
    try {
      return await request("/destinations");
    } catch (e) {
      toast.error(e.message || "Failed to load destinations");
      return e;
    }
  },

  getDestination: async (idOrSlug) => {
    try {
      return await request(`/destinations/${idOrSlug}`);
    } catch (e) {
      toast.error(e.message || "Failed to load destination");
      return e;
    }
  },

  createDestination: async (data) => {
    try {
      const res = await request("/destinations", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Destination created");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to create destination");
      return e;
    }
  },

  updateDestination: async (idOrSlug, data) => {
    try {
      const res = await request(`/destinations/${idOrSlug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Destination updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update destination");
      return e;
    }
  },

  deleteDestination: async (idOrSlug) => {
    try {
      const res = await request(`/destinations/${idOrSlug}`, {
        method: "DELETE",
      });
      toast.success("Destination deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete destination");
      return e;
    }
  },

  // ---------- Activities ----------
  getActivities: async () => {
    try {
      return await request("/activities");
    } catch (e) {
      toast.error(e.message || "Failed to load activities");
      return e;
    }
  },

  getActivity: async (idOrSlug) => {
    try {
      return await request(`/activities/${idOrSlug}`);
    } catch (e) {
      toast.error(e.message || "Failed to load activity");
      return e;
    }
  },

  createActivity: async (data) => {
    try {
      const res = await request("/activities", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Activity created");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to create activity");
      return e;
    }
  },

  updateActivity: async (idOrSlug, data) => {
    try {
      const res = await request(`/activities/${idOrSlug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Activity updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update activity");
      return e;
    }
  },

  deleteActivity: async (idOrSlug) => {
    try {
      const res = await request(`/activities/${idOrSlug}`, {
        method: "DELETE",
      });
      toast.success("Activity deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete activity");
      return e;
    }
  },

  // ---------- Reviews ----------
  getReviews: async () => {
    try {
      return await request("/reviews");
    } catch (e) {
      toast.error(e.message || "Failed to load reviews");
      return e;
    }
  },

  createReview: async (data) => {
    try {
      const res = await request("/reviews", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Review submitted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to submit review");
      return e;
    }
  },

  updateReview: async (id, data) => {
    try {
      const res = await request(`/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Review updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update review");
      return e;
    }
  },

  deleteReview: async (id) => {
    try {
      const res = await request(`/reviews/${id}`, { method: "DELETE" });
      toast.success("Review deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete review");
      return e;
    }
  },

  // ---------- Blogs ----------
  getBlogs: async () => {
    try {
      return await request("/blogs");
    } catch (e) {
      toast.error(e.message || "Failed to load blogs");
      return e;
    }
  },

  getBlog: async (idOrSlug) => {
    try {
      return await request(`/blogs/${idOrSlug}`);
    } catch (e) {
      toast.error(e.message || "Failed to load blog");
      return e;
    }
  },

  createBlog: async (data) => {
    try {
      const res = await request("/blogs", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Blog post created");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to create blog post");
      return e;
    }
  },

  updateBlog: async (idOrSlug, data) => {
    try {
      const res = await request(`/blogs/${idOrSlug}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Blog post updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update blog post");
      return e;
    }
  },

  deleteBlog: async (idOrSlug) => {
    try {
      const res = await request(`/blogs/${idOrSlug}`, { method: "DELETE" });
      toast.success("Blog post deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete blog post");
      return e;
    }
  },

  // ---------- FAQs ----------
  getFaqs: async () => {
    try {
      return await request("/faqs");
    } catch (e) {
      toast.error(e.message || "Failed to load FAQs");
      return e;
    }
  },

  createFaq: async (data) => {
    try {
      const res = await request("/faqs", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("FAQ created");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to create FAQ");
      return e;
    }
  },

  updateFaq: async (id, data) => {
    try {
      const res = await request(`/faqs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("FAQ updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update FAQ");
      return e;
    }
  },

  deleteFaq: async (id) => {
    try {
      const res = await request(`/faqs/${id}`, { method: "DELETE" });
      toast.success("FAQ deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete FAQ");
      return e;
    }
  },

  // ---------- Inquiries / Bookings / Contact ----------
  createInquiry: async (data) => {
    try {
      const res = await request("/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Inquiry sent! We'll get back to you soon.");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to send inquiry");
      return e;
    }
  },

  getInquiries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    try {
      return await request(`/inquiries${query ? `?${query}` : ""}`);
    } catch (e) {
      toast.error(e.message || "Failed to load inquiries");
      return e;
    }
  },

  updateInquiryStatus: async (id, status) => {
    try {
      const res = await request(`/inquiries/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      toast.success("Status updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update status");
      return e;
    }
  },

  deleteInquiry: async (id) => {
    try {
      const res = await request(`/inquiries/${id}`, { method: "DELETE" });
      toast.success("Inquiry deleted");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to delete inquiry");
      return e;
    }
  },

  // ---------- Site Content ----------
  getContent: async () => {
    try {
      return await request("/content");
    } catch (e) {
      toast.error(e.message || "Failed to load content");
      return e;
    }
  },

  getContentByKey: async (key) => {
    try {
      return await request(`/content/${key}`);
    } catch (e) {
      toast.error(e.message || "Failed to load content");
      return e;
    }
  },

  updateContent: async (key, data) => {
    try {
      const res = await request(`/content/${key}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Content updated");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to update content");
      return e;
    }
  },

  // ---------- Upload ----------
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await request("/upload", {
        method: "POST",
        body: formData,
      });
      toast.success("Image uploaded");
      return res;
    } catch (e) {
      toast.error(e.message || "Failed to upload image");
      return e;
    }
  },
};
