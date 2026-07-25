import {
  AuthResponse,
  User,
  Lead,
  QuoteRequest,
  Product,
  Project,
  BlogArticle,
  ServiceItem,
  SubsidyDetail,
  Testimonial,
  FAQItem,
  GalleryItem,
  JobOpening,
  JobApplication,
  AppSettings,
  HeroSlide,
  AuditLog,
  VisitorLog,
  EmailNotification
} from '../types';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('sarva_solar_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      if (json && json.error) errorMsg = json.error;
    } catch {
      if (text) errorMsg = text;
    }
    throw new Error(errorMsg);
  }
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new Error(text || 'Invalid JSON response from server');
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(err.error || 'Login failed');
  }
  return res.json();
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('sarva_solar_token');
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  } catch (e) {
    return null;
  }
}

export const fetchCurrentUser = getCurrentUser;

export async function fetchSettings(): Promise<AppSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error('Failed to load settings');
  return res.json();
}

export async function updateSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(settings)
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json();
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/services`);
  return res.json();
}

export async function createService(svc: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const res = await fetch(`${API_BASE}/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(svc)
  });
  return res.json();
}

export async function updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch(`${API_BASE}/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteService(id: string): Promise<void> {
  await fetch(`${API_BASE}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchSubsidies(): Promise<SubsidyDetail[]> {
  const res = await fetch(`${API_BASE}/subsidies`);
  return res.json();
}

export async function createSubsidy(sub: Omit<SubsidyDetail, 'id' | 'updatedDate'>): Promise<SubsidyDetail> {
  const res = await fetch(`${API_BASE}/subsidies`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(sub)
  });
  return res.json();
}

export async function updateSubsidy(id: string, updates: Partial<SubsidyDetail>): Promise<SubsidyDetail> {
  const res = await fetch(`${API_BASE}/subsidies/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteSubsidy(id: string): Promise<void> {
  await fetch(`${API_BASE}/subsidies/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function createProduct(prod: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(prod)
  });
  return res.json();
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function createProject(proj: Omit<Project, 'id'>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(proj)
  });
  return res.json();
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchBlogs(): Promise<BlogArticle[]> {
  const res = await fetch(`${API_BASE}/blogs`);
  return res.json();
}

export async function createBlog(blog: Omit<BlogArticle, 'id'>): Promise<BlogArticle> {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(blog)
  });
  return res.json();
}

export async function updateBlog(id: string, updates: Partial<BlogArticle>): Promise<BlogArticle> {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteBlog(id: string): Promise<void> {
  await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE}/testimonials`);
  return res.json();
}

export async function createTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(t)
  });
  return res.json();
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteTestimonial(id: string): Promise<void> {
  await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchFaqs(): Promise<FAQItem[]> {
  const res = await fetch(`${API_BASE}/faqs`);
  return res.json();
}

export async function createFaq(faq: Omit<FAQItem, 'id'>): Promise<FAQItem> {
  const res = await fetch(`${API_BASE}/faqs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(faq)
  });
  return res.json();
}

export async function updateFaq(id: string, updates: Partial<FAQItem>): Promise<FAQItem> {
  const res = await fetch(`${API_BASE}/faqs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteFaq(id: string): Promise<void> {
  await fetch(`${API_BASE}/faqs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const res = await fetch(`${API_BASE}/gallery`);
  return res.json();
}

export async function createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(item)
  });
  return res.json();
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  const res = await fetch(`${API_BASE}/audit-logs`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function submitLead(data: any): Promise<{ message: string; lead: Lead }> {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(`${API_BASE}/leads`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const res = await fetch(`${API_BASE}/leads/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteLead(id: string): Promise<void> {
  await fetch(`${API_BASE}/leads/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function submitQuote(data: any): Promise<{ message: string; quote: QuoteRequest }> {
  const res = await fetch(`${API_BASE}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Quote request failed');
  return res.json();
}

export async function fetchQuotes(): Promise<QuoteRequest[]> {
  const res = await fetch(`${API_BASE}/quotes`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function updateQuoteStatus(id: string, status: QuoteRequest['status']): Promise<QuoteRequest> {
  const res = await fetch(`${API_BASE}/quotes/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return res.json();
}

export async function fetchAnalyticsSummary(): Promise<any> {
  const res = await fetch(`${API_BASE}/analytics/summary`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function fetchJobs(): Promise<JobOpening[]> {
  const res = await fetch(`${API_BASE}/jobs`);
  return res.json();
}

export async function createJob(job: Omit<JobOpening, 'id'>): Promise<JobOpening> {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(job)
  });
  return res.json();
}

export async function updateJob(id: string, updates: Partial<JobOpening>): Promise<JobOpening> {
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return res.json();
}

export async function deleteJob(id: string): Promise<void> {
  await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function fetchJobApplications(): Promise<JobApplication[]> {
  const res = await fetch(`${API_BASE}/job-applications`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function submitJobApplication(data: Omit<JobApplication, 'id' | 'createdAt' | 'status'>): Promise<{ message: string; application: JobApplication }> {
  const res = await fetch(`${API_BASE}/job-applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Application submission failed');
  return res.json();
}

export async function updateJobApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication> {
  const res = await fetch(`${API_BASE}/job-applications/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return res.json();
}

export async function deleteJobApplication(id: string): Promise<void> {
  await fetch(`${API_BASE}/job-applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
}

export async function logVisitor(pathName?: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/analytics/visitor-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathName || window.location.pathname,
        referrer: document.referrer || 'Direct Visit',
        userAgent: navigator.userAgent
      })
    });
  } catch (err) {
    console.error('Visitor logging error:', err);
  }
}

export async function fetchVisitorLogs(): Promise<VisitorLog[]> {
  const res = await fetch(`${API_BASE}/analytics/visitor-logs`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function fetchEmailNotifications(): Promise<EmailNotification[]> {
  const res = await fetch(`${API_BASE}/admin/email-notifications`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function triggerTestEmail(): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/admin/test-email`, {
    method: 'POST',
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function changeUserPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update password');
  return data;
}

export async function updateUserProfile(updates: { name?: string; email?: string; phone?: string }): Promise<{ success: boolean; user: any; token: string; message: string }> {
  const res = await fetch(`${API_BASE}/auth/update-profile`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update profile');
  return data;
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch staff accounts');
  return res.json();
}

export async function createStaffUser(data: { name: string; email: string; role: 'Admin' | 'Manager' | 'Sales' | 'Technician'; phone?: string; password: string }): Promise<User> {
  const res = await fetch(`${API_BASE}/admin/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to create staff account');
  return resData;
}

export async function updateStaffUser(id: string, data: { name?: string; email?: string; role?: 'Admin' | 'Manager' | 'Sales' | 'Technician'; phone?: string; password?: string }): Promise<User> {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to update staff account');
  return resData;
}

export async function deleteStaffUser(id: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to delete staff account');
  return resData;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const res = await fetch(`${API_BASE}/hero-slides`);
  if (!res.ok) throw new Error('Failed to fetch hero slides');
  return res.json();
}

export async function createHeroSlide(data: Omit<HeroSlide, 'id'>): Promise<HeroSlide> {
  const res = await fetch(`${API_BASE}/hero-slides`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to create hero slide');
  return resData;
}

export async function updateHeroSlide(id: string, updates: Partial<HeroSlide>): Promise<HeroSlide> {
  const res = await fetch(`${API_BASE}/hero-slides/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to update hero slide');
  return resData;
}

export async function deleteHeroSlide(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/hero-slides/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.error || 'Failed to delete hero slide');
  return resData;
}

