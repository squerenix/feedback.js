import type {NextComponentType} from 'next';

const Form: NextComponentType = () => {
    return (
        <>
            <div className="text-center mt-10 mx-auto rounded">
                <textarea name="inputArea" id="inputArea" cols={100} rows={5} className="focus:outline-2 outline outline-2 outline-gray-200 bg-white rounded p-2 mt-2 font-rubik" placeholder="Write feedback here..."></textarea>
            </div>
            <div className="text-center mt-8">
                <button className="w-2/12 py-3  px-2 bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 rounded-lg hover:from-orange-300 hover:to-red-400 font-semibold tracking-widest text-xl font-rubik text-white shadow-gray-500 shadow-md">Submit</button>
            </div>
        </>
    );
};

export default Form;
