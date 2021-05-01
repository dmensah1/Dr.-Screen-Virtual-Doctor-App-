import { Redirect, RouteProps } from 'react-router-dom';
import { auth } from '../config/firebase';

export type IAuthRouteProps = { } & RouteProps;

const AuthRoute = (props: IAuthRouteProps) => {
    const { children } = props;

    if (!auth.currentUser)
    {
        console.log('No user detected, redirecting');
        return <Redirect to="/login" />;
    }

    return (
        <div>{children}</div>
    );
}

export default AuthRoute;