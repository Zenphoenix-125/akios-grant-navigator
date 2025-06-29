// API service layer for AKIOS Grant Navigator

export interface Grant {
  id: string;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  match_score: number;
  category: string;
  match_required: boolean;
  days_left: number;
  description?: string;
  eligibility?: string;
  url?: string;
}

export interface GrantFilters {
  search?: string;
  category?: string;
  min_amount?: string;
  max_amount?: string;
  min_match_score?: number;
  max_days_left?: number;
  match_required?: boolean;
}

export interface GrantStats {
  total_grants: number;
  total_value: string;
  average_match_score: number;
  urgent_grants: number;
  high_priority_grants: number;
  category_breakdown: Record<string, {
    count: number;
    total_value: number;
    avg_match_score: number;
  }>;
}

const API_BASE_URL = 'http://localhost:8000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || `HTTP ${response.status}`);
  }
  return response.json();
}

export class GrantService {
  async discoverGrants(filters?: GrantFilters): Promise<Grant[]> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.min_amount) params.append('min_amount', filters.min_amount);
    if (filters?.max_amount) params.append('max_amount', filters.max_amount);
    if (filters?.min_match_score !== undefined) params.append('min_match_score', filters.min_match_score.toString());
    if (filters?.max_days_left !== undefined) params.append('max_days_left', filters.max_days_left.toString());
    if (filters?.match_required !== undefined) params.append('match_required', filters.match_required.toString());

    const url = `${API_BASE_URL}/grants/discover${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url);
    return handleResponse<Grant[]>(response);
  }

  async getGrant(grantId: string): Promise<Grant> {
    const response = await fetch(`${API_BASE_URL}/grants/${grantId}`);
    return handleResponse<Grant>(response);
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/grants/categories`);
    const data = await handleResponse<{ categories: string[] }>(response);
    return data.categories;
  }

  async getStats(): Promise<GrantStats> {
    const response = await fetch(`${API_BASE_URL}/grants/stats`);
    return handleResponse<GrantStats>(response);
  }

  async healthCheck(): Promise<{ status: string; service: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<{ status: string; service: string; timestamp: string }>(response);
  }
}

export const grantService = new GrantService(); 