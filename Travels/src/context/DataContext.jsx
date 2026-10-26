import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { TRIPS as initialTrips } from '../data/tripsData';
import { DESTINATIONS as initialDestinations } from '../data/destinationsData';
import {
  ACTIVITIES as initialActivities,
  REVIEWS as initialReviews,
  BLOG_POSTS as initialBlogPosts,
  FAQS as initialFaqs,
} from '../data/activitiesData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [trips, setTrips] = useState(initialTrips);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [activities, setActivities] = useState(initialActivities);
  const [reviews, setReviews] = useState(initialReviews);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [siteContent, setSiteContent] = useState({
    hero_content: {
      badge: 'Government Licensed • Sherpa Led • 100% Guaranteed Departures',
      title: 'Your Gateway to the Himalayas',
      subtitle:
        'With years of experience, we craft unforgettable treks, tours and journeys that connect you directly to the heart of the Himalayas.',
      image:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
    },
    company_stats: {
      experienceYears: '18+',
      successRate: '99.4%',
      trekkersGuided: '12,500+',
      averageRating: '4.98',
    },
    contact_info: {
      phone: '+977-1-4700000',
      mobile: '+977-9851000000',
      email: 'hello@swagattravels.com',
      address: 'Amrit Marg, Thamel, Kathmandu 44600, Nepal',
      whatsapp: '+9779851000000',
      googleMapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.240403164478!2d85.30904037546738!3d27.70986277617997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb1555555%3A0x6b13b63b21625d97!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp',
      workingHours: 'Sunday – Friday: 08:30 AM – 06:30 PM (NPT)',
      emergencySupport: '24/7 On-Tour & Mountain SOS Support',
    },
    testimonials_section: {
      title: 'What Our Travelers Say',
      subtitle:
        'Real feedback from travelers, first-time explorers, and families who walked the high Himalayas with Swagat Holidays & Travels.',
      ratingBadge: '5.0 / 5.0',
      rankText: 'Ranked #1 on TripAdvisor & Google Reviews',
    },
  });
  const [loading, setLoading] = useState(true);

  // Fetch all dynamic data from backend API
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [tripsRes, destsRes, actsRes, reviewsRes, blogsRes, faqsRes, contentRes] =
        await Promise.allSettled([
          api.getTrips(),
          api.getDestinations(),
          api.getActivities(),
          api.getReviews(),
          api.getBlogs(),
          api.getFaqs(),
          api.getContent(),
        ]);

      if (tripsRes.status === 'fulfilled' && tripsRes.value?.data?.length > 0) {
        setTrips(tripsRes.value.data);
      }
      if (destsRes.status === 'fulfilled' && destsRes.value?.data?.length > 0) {
        setDestinations(destsRes.value.data);
      }
      if (actsRes.status === 'fulfilled' && actsRes.value?.data?.length > 0) {
        setActivities(actsRes.value.data);
      }
      if (reviewsRes.status === 'fulfilled' && reviewsRes.value?.data?.length > 0) {
        setReviews(reviewsRes.value.data);
      }
      if (blogsRes.status === 'fulfilled' && blogsRes.value?.data?.length > 0) {
        setBlogPosts(blogsRes.value.data);
      }
      if (faqsRes.status === 'fulfilled' && faqsRes.value?.data?.length > 0) {
        setFaqs(faqsRes.value.data);
      }
      if (contentRes.status === 'fulfilled' && contentRes.value?.data) {
        setSiteContent((prev) => ({ ...prev, ...contentRes.value.data }));
      }
    } catch (err) {
      console.warn('Backend API sync notice: Using cached/initial data.', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Helper mutations to update local state immediately and keep synced
  const reloadData = fetchAllData;

  const updateSiteContentLocally = (key, data) => {
    setSiteContent((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || {}), ...data },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        trips,
        setTrips,
        destinations,
        setDestinations,
        activities,
        setActivities,
        reviews,
        setReviews,
        blogPosts,
        setBlogPosts,
        faqs,
        setFaqs,
        siteContent,
        updateSiteContentLocally,
        reloadData,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
