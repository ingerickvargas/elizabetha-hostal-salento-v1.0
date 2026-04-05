const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type ApiBookingStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export type UiBookingStatus = "pending" | "accepted" | "rejected";

export const status = {
  toUI: (s: ApiBookingStatus): UiBookingStatus =>
    s === "ACCEPTED" ? "accepted" : s === "REJECTED" ? "rejected" : "pending",
  toAPI: (s: UiBookingStatus): ApiBookingStatus =>
    s === "accepted" ? "ACCEPTED" : s === "rejected" ? "REJECTED" : "PENDING",
};

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      throw new Error(`API no devolvió JSON. Status=${res.status}. Body=${text.slice(0, 120)}`);
    }
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Public
  getRooms: () => http("/api/rooms"),
  getRoom: (id: string) => http(`/api/rooms/${id}`),
  checkAvailability: (roomId: string, checkIn: string, checkOut: string) =>
    http(
      `/api/availability?roomId=${encodeURIComponent(roomId)}&checkIn=${encodeURIComponent(
        checkIn
      )}&checkOut=${encodeURIComponent(checkOut)}`
    ),
  createBooking: (payload: any) =>
    http("/api/bookings", { method: "POST", body: JSON.stringify(payload) }),

  // Admin
  adminLogin: (email: string, password: string) =>
    http("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  adminGetRooms: (token: string) =>
    http("/api/admin/rooms", { headers: { Authorization: `Bearer ${token}` } }),

  adminUpdateRoom: (token: string, id: string, data: any) =>
    http(`/api/admin/rooms/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  adminGetBookings: async (token: string) => {
	const data = await http<any[]>("/api/admin/bookings", {
		headers: { Authorization: `Bearer ${token}` },
	});

	return data.map(b => ({
		...b,
		status: status.toUI(b.status as ApiBookingStatus), // "pending" | "accepted" | "rejected"
	}));
  },

  updateBookingStatus: (token: string, id: string, uiStatus: UiBookingStatus) => {
	const apiStatus = status.toAPI(uiStatus);
	console.log("UI status:", uiStatus, "=> API status:", apiStatus);

	return http(`/api/admin/bookings/${encodeURIComponent(id)}/status`, {
		method: "PATCH",
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ status: apiStatus }),
	});
	},

	getBookedDates: (roomId: string) =>
    http<Array<{ start: string; end: string; status: string }>>(
      `/api/booked-dates?roomId=${encodeURIComponent(roomId)}`
    ),

	searchRooms: (checkIn: string, checkOut: string, guests: number) =>
    http<any[]>(`/api/search-rooms?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&guests=${encodeURIComponent(String(guests))}`),
};
