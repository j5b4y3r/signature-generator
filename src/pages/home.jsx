import {useEffect} from 'react';

const Home = () => {

    useEffect(() => {
        // Redirect to "/online-signature" route when the component mounts because we haven't home page.
        window.location.href="/online-signature";
    }, []);

    return null; // This component doesn't render anything visible
};

export default Home;