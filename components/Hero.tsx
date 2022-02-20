import type {NextComponentType} from 'next';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

const Hero: NextComponentType = () => {
    return (
        <>
            <div className="text-center flex flex-col pt-20">
                <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600 font-rubikBold tracking-normal">
                    FEEDBACK
                </h1>
                <span className="text-3xl font-semibold font-rubik leading-loose text-gray-800 tracking-wide block">Give and share feedback!</span>
                <a href="#" className="w-2/12 mx-auto bg-gray-700 inline-block text-white text-lg font-semibold py-2 px-4 mt-3 rounded-md font-rubik tracking-widest hover:-skew-y-6 shadow-md shadow-gray-400 duration-300">
                    <FontAwesomeIcon icon={faGithub} className="mr-2 inline mb-1" width={20} />
                    See on Github
                </a>
            </div>
        </>
    );
};

export default Hero;
