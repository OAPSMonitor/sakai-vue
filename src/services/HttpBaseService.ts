import axios from 'axios'
import type {AxiosInstance} from 'axios'
import {consola} from 'consola'
import * as toast from '@/composables/toast'

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api/v1/',
    baseURL: '',
    timeout: 25000,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMSIsImlzQWRtaW4iOnRydWUsImlzV3JpdGVyIjpmYWxzZSwiaXNSZWFkZXIiOmZhbHNlfSwiaWF0IjoxNjgxMTQ5NzUzfQ.8LeCQlrjpICRsMH2AS_Pvyd6vzUqqEEwaX8AdgUqpJI`,
    },
})

// const toast = useToast()

/* // Check if the request is for login
function isLoginRequest(request: InternalAxiosRequestConfig): boolean {
  return request.url?.includes('login') ?? false
} */

// Attach user token if present in localStorage
/* function attachUserToken(
  request: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  console.log('Attach token')
  try {
    const user = JSON.parse(localStorage.getItem('user') as string)
    if (user?.accessToken)
      request.headers.Authorization = `Bearer ${user.accessToken}`
  }
  catch (err) {
    console.error('Error parsing user from localStorage:', err)
  }
  return request
} */

// Request interceptor
/* apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return isLoginRequest(config) ? config : attachUserToken(config)
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
) */

type ErrorMessagesType = {
    [key in 400 | 401 | 403 | 404 | 422 | 500 | 502 | 503]: string
}

const errorMessages: ErrorMessagesType = {
    400: 'Bad Request: Please check your input and try again.',
    401: 'Unauthorized: Your session has expired, please log in.',
    403: 'Forbidden: Access denied. Contact support if you believe this is an error.',
    404: 'Not Found: The resource you are looking for might have been removed or is temporarily unavailable.',
    422: 'Validation Error: Please correct the highlighted errors and try again.',
    500: 'Internal Server Error: Our servers are experiencing issues. Please try again later.',
    502: 'Bad Gateway: A temporary issue occurred. Please try again shortly.',
    503: 'Service Unavailable: The server is down for maintenance. Please try again later.',
}

// Fonction d'utilité pour afficher les toasts
function showToastError(detail: string) {
    toast.error('Error', detail, 3000)
}

// Response interceptor
apiClient.interceptors.response.use(
    response => response,
    (error) => {
        consola.error('Response error:', error)

        // Si l'erreur contient une réponse HTTP
        if (error.response) {
            const {status} = error.response

            // Si le statut est 422, rejeter l'erreur pour une gestion au niveau du composant
            if (status === 422)
                return Promise.reject(error)

            // Afficher un toast d'erreur avec les informations pertinentes
            const errorMessage = errorMessages[status as keyof typeof errorMessages] || 'An unexpected error occurred. Please try again.'
            showToastError(errorMessage)
        } else {
            // Si l'erreur ne contient pas de réponse HTTP (par ex. : problème de réseau)
            showToastError('Network Error')
        }
    },
)

export default apiClient
