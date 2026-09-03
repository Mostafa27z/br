import { Ziggy } from './ziggy';

export function route(name?: string, params?: any, queryParams?: Record<string, any>): string {
    if (!name) {
        return (window as any).location?.pathname || '/';
    }

    // Special helper method if checking current route name
    if (name === 'current') {
        return (window as any).location?.pathname || '/';
    }

    const routeObj = (Ziggy.routes as any)[name];
    if (!routeObj) {
        return `/${name}`;
    }

    let uri = routeObj.uri;

    if (params !== undefined && params !== null) {
        if (typeof params === 'object' && !Array.isArray(params)) {
            Object.keys(params).forEach(key => {
                uri = uri.replace(`{${key}}`, params[key]);
                uri = uri.replace(`{${key}?}`, params[key]);
            });
        } else {
            const paramKeys = routeObj.parameters || [];
            if (paramKeys.length > 0) {
                uri = uri.replace(`{${paramKeys[0]}}`, params);
                uri = uri.replace(`{${paramKeys[0]}?}`, params);
            }
        }
    }

    // Remove remaining optional parameters
    uri = uri.replace(/\{[^}]+\?\}/g, '');

    let url = `/${uri}`;

    // Add query params if provided
    if (queryParams && typeof queryParams === 'object') {
        const query = new URLSearchParams();
        Object.keys(queryParams).forEach(k => {
            if (queryParams[k] !== undefined && queryParams[k] !== null && queryParams[k] !== '') {
                query.append(k, queryParams[k]);
            }
        });
        const queryString = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    return url;
}

// Add current route checker helper: route().current('dashboard')
(route as any).current = (routeName?: string) => {
    const currentPath = (window as any).location?.pathname || '';
    if (!routeName) return currentPath;
    
    const targetRoute = (Ziggy.routes as any)[routeName];
    if (!targetRoute) return false;

    const targetUri = targetRoute.uri.split('{')[0].replace(/\/$/, '');
    if (!targetUri) return currentPath === '/';

    return currentPath.includes(targetUri);
};

(window as any).route = route;
