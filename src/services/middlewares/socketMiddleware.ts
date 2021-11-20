import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';
import { wsActions} from "../store";
import {getAccessTokenFromCookie} from "../cookieFunctions";

export const socketMiddleware = (): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: (a: AnyAction) => void) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsStart, wsSendMessage, onOpen, onClose, onError, wsGetOrders } =
                wsActions;

            if (type === wsStart) {
                socket = new WebSocket(action.wsUrl);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parseData = JSON.parse(data);
                    dispatch({ type: wsGetOrders, payload: parseData });
                };

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: getAccessTokenFromCookie() };
                    socket.send(JSON.stringify(message));
                }


            }

            next(action);
        };
    };
};