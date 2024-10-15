import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const Toast = ({ message, type }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const key = enqueueSnackbar(message, {
            variant: type, // Customize the appearance of the snackbar
            persist: true, // Allow the snackbar to persist until dismissed
        });

        const timer = setTimeout(() => {
            closeSnackbar(key);
        }, 2500);

        return () => {
            clearTimeout(timer);
        };
    }, [enqueueSnackbar, closeSnackbar, message, type]);

    return null; // Toast component doesn't render any DOM elements directly
};

export default Toast;
