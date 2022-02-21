import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type {NextComponentType} from 'next';
import { useState } from 'react';
import { db } from '../firebase/initFirebase';

const Form: NextComponentType = () => {
    interface Icomment {
        text: string
        timestamp?: string
    }

    const [form, setForm] = useState<Icomment>({
        text: ''
    });

    const setInput = (data:string, type:string):void => {
        setForm({ ...form, [type]: data });
    }

    const submit = async ():Promise<void> => {
        if(form.text){
            const collectionRef = collection(db, "feedback");
            await addDoc(collectionRef, {...form, timestamp: new Date()});
            setForm({text: '', timestamp: ''});
        }else {
            alert('text must insert.');
        }
    }

    return (
        <>
            <div className="text-center mt-10 mx-auto rounded">
                <textarea onChange={e => setInput(e.target.value, 'text')} value={form.text} name="inputArea" id="inputArea" rows={5} className="focus:outline-2 outline outline-2 outline-gray-200 bg-white rounded p-2 mt-2 font-rubik w-10/12 xl:w-8/12" placeholder="Write feedback here..."></textarea>
            </div>
            <div className="text-center mt-8">
                <button onClick={submit} className="xl:w-2/12 py-2 px-3 xl:py-3 xl:px-2 bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 rounded-lg hover:from-orange-300 hover:to-red-400 font-semibold tracking-widest text-xl font-rubik text-white shadow-gray-500 shadow-md">Submit</button>
            </div>
        </>
    );
};

export default Form;
