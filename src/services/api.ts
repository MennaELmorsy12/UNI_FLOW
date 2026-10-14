
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');

export interface ApiError {
  code: string;
  message: string;
}

export class ApiRequestError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

interface ApiEnvelope<T> {
  data: T;
}

interface ErrorEnvelope {
  error?: {
    code?: string;
    message?: string;
  };
}

function getAuthToken(): string | null {
  try {
    return localStorage.getItem('uniflow:auth-token');
  } catch {
    return null;
  }
}

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, auth = true, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');

  if (body !== undefined) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = getAuthToken();

    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...requestOptions,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiRequestError(
      0,
      'Cannot connect to the server. Please try again later.',
      'NETWORK_ERROR',
    );
  }

  const result = await response.json().catch(() => null) as
    | ApiEnvelope<T>
    | ErrorEnvelope
    | null;

  if (!response.ok) {
    const error = result && 'error' in result ? result.error : undefined;

    throw new ApiRequestError(
      response.status,
      error?.message || `Request failed (${response.status}).`,
      error?.code || 'API_ERROR',
    );
  }

  if (!result || !('data' in result)) {
    throw new ApiRequestError(
      response.status,
      'The server response does not match the expected API format.',
      'INVALID_RESPONSE',
    );
  }

  return result.data;
}

export const api = {
  login(identifier: string, password: string) {
    return apiRequest<{
      token: string;
      tokenType: 'Bearer';
      mustChangePassword: boolean;
      student: {
        id: string;
        fullName: string;
        email: string | null;
        studentNumber: string;
        department: string;
        level: number;
        status: string;
      };
    }>('/auth/login', {
      method: 'POST',
      auth: false,
      body: { identifier, password },
    });
  },

  getMe() {
    return apiRequest<{
      id: string;
      fullName: string;
      firstName: string;
      email: string | null;
      studentNumber: string;
      program: string;
      year: string;
      semester: string;
      advisor: string;
      department: string;
      status: string;
    }>('/me');
  },

  getDashboard(term?: string) {
    const query = term ? `?term=${encodeURIComponent(term)}` : '';
    return apiRequest<unknown>(`/dashboard${query}`);
  },

  getCourses(term?: string) {
    const query = term ? `?term=${encodeURIComponent(term)}` : '';
    return apiRequest<unknown>(`/courses${query}`);
  },

  getSchedule(term?: string) {
    const query = term ? `?term=${encodeURIComponent(term)}` : '';
    return apiRequest<unknown>(`/schedule${query}`);
  },

  getGrades(term?: string) {
    const query = term ? `?term=${encodeURIComponent(term)}` : '';
    return apiRequest<unknown>(`/grades${query}`);
  },

  getProfile() {
    return apiRequest<{
      id: string;
      fullName: string;
      firstName: string;
      email: string | null;
      studentNumber: string;
      program: string;
      year: string;
      semester: string;
      advisor: string;
      department: string;
      status: string;
    }>('/profile');
  },

  updateProfile(input: {
    fullName?: string;
    email?: string | null;
    phone?: string;
  }) {
    return apiRequest<unknown>('/profile', {
      method: 'PATCH',
      body: input,
    });
  },

  getNotifications(params?: {
    page?: number;
    per_page?: number;
    type?: string;
    unread?: boolean;
  }) {
    const query = new URLSearchParams();

    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.per_page !== undefined) {
      query.set('per_page', String(params.per_page));
    }
    if (params?.type) query.set('type', params.type);
    if (params?.unread !== undefined) {
      query.set('unread', String(params.unread));
    }

    const suffix = query.size ? `?${query.toString()}` : '';
    return apiRequest<unknown>(`/notifications${suffix}`);
  },

  markNotificationsRead(ids: string[]) {
    return apiRequest<{ updated: number }>('/notifications/read', {
      method: 'PATCH',
      body: { ids },
    });
  },

  logout() {
    return apiRequest<{ ok: boolean }>('/auth/logout', {
      method: 'POST',
    });
  },
};
