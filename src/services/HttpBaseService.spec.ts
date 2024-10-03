import {describe, expect, it, toastEmitSpy } from '@/tests/utils'
import apiClient from '@/services/HttpBaseService'

describe('HTTPBaseService', () => {
    it('should handle a successful response', async () => {
        const response = await apiClient.get('/test-success')
        expect(response.status).toBe(200)
    })

    it('should handle a 401 Unauthorized response and show an error toast', async () => {
        await apiClient.get('/test-error-401')

        // Vérifier que `toast.add` a été appelé une seule fois
        expect(toastEmitSpy).toHaveBeenCalledTimes(1)

        // Vérifier que `toast.add` a été appelé avec les bons paramètres
        expect(toastEmitSpy).toHaveBeenCalledWith(
            'add',
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Unauthorized: Your session has expired, please log in.',
                life: 3000,
            },
        )
    })

    it('should handle a 403 Forbidden response and show an error toast', async () => {
        await apiClient.get('/test-error-403')

        // Vérifier que `toast.add` a été appelé une seule fois
        expect(toastEmitSpy).toHaveBeenCalledTimes(1)

        // Vérifier que `toast.add` a été appelé avec les bons paramètres
        expect(toastEmitSpy).toHaveBeenCalledWith(
            'add',
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Forbidden: Access denied. Contact support if you believe this is an error.',
                life: 3000,
            },
        )
    })

    it('should handle a 404 Not Found response and show an error toast', async () => {
        await apiClient.get('/test-error-404')

        // Vérifier que `toast.add` a été appelé une seule fois
        expect(toastEmitSpy).toHaveBeenCalledTimes(1)

        // Vérifier que `toast.add` a été appelé avec les bons paramètres
        expect(toastEmitSpy).toHaveBeenCalledWith(
            'add',
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Not Found: The resource you are looking for might have been removed or is temporarily unavailable.',
                life: 3000,
            },
        )
    })

    it('should handle a 500 Server Error response and show an error toast', async () => {
        await apiClient.get('/test-error-500')

        // Vérifier que `toast.add` a été appelé une seule fois
        expect(toastEmitSpy).toHaveBeenCalledTimes(1)

        // Vérifier que `toast.add` a été appelé avec les bons paramètres
        expect(toastEmitSpy).toHaveBeenCalledWith(
            'add',
            {
                severity: 'error',
                summary: 'Error',
                detail: 'Internal Server Error: Our servers are experiencing issues. Please try again later.',
                life: 3000,
            },
        )
    })

    it('should handle a 301 Network Error response and show an error toast', async () => {
        await apiClient.get('/test-error-301')

        // Vérifier que `toast.add` a été appelé une seule fois
        // expect(toastAddSpy).toHaveBeenCalledTimes(1)
        expect(toastEmitSpy).toHaveBeenCalledTimes(1)

        // Vérifier que `toast.add` a été appelé avec les bons paramètres
        expect(toastEmitSpy).toHaveBeenCalledWith(
            'add',
            {severity: 'error', summary: 'Error', detail: 'An unexpected error occurred. Please try again.', life: 3000},
        )
    })

    it('should handle a 422 Error response and throw exception', async () => {
        try {
            await apiClient.post('/test-error-422')
        } catch (error: any) {
            // Vérifier que le statut de l'erreur est 422
            expect(error.response.status).toBe(422)

            // Vérifier que la réponse contient les erreurs attendues
            expect(error.response.data).toEqual({
                errors: [
                    {
                        msg: 'jobTemplateName must be provided',
                        param: 'jobTemplateName',
                        location: 'body',
                    },
                    {
                        value: 'Test_Automation',
                        msg: 'Automation Test_Automation already exists',
                        param: 'automaton',
                        location: 'body',
                    },
                ],
            })
        }
    })
})
