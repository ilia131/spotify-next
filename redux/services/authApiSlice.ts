import { apiSlice } from './apiSlice';

interface User {
	first_name: string;
	last_name: string;
	email: string;
}

type RegisterRequest = {
	first_name: string
	last_name: string
	username: string
	email: string
	password: string
	re_password: string
	favorite_artists: string[]
  }
  
  type RegisterResponse = {
	id: number
	email: string
	username: string
	first_name: string
	last_name: string
	favorite_artists?: string[]
  }


const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/jwt/create/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
		query: (body) => ({
			url: "/users/",
			method: "POST",
			body,
		}),
		}),
		verify: builder.mutation({
			query: (body) => ({
				url: '/jwt/verify/',
				method: 'POST',
				body
				
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/logout/',
				method: 'POST',
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
		resetPassword: builder.mutation({
			query: email => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;