import { collection, onSnapshot, query } from 'firebase/firestore';
import moment from 'moment';
import {NextComponentType} from 'next';
import { useEffect, useState } from 'react';
import { db } from '../firebase/initFirebase';


const Comment: NextComponentType = () => {

    interface Icomment {
        id: string,
        text: string,
        timestamp: any
    }

    const [comments, setComment] = useState<Array<Icomment>>([]);

    // read data
    useEffect(() => {
        const ref = collection(db, "feedback");
        const q   = query(ref);
        
        onSnapshot(q, (QuerySnapshot) => {
            setComment(QuerySnapshot.docs.map(doc => ({
                id:doc.id, 
                text: doc.data().text, 
                timestamp: doc.data().timestamp?.toDate().getTime()
            })));
        })
    }, []);

    return (
        <>
            <div className="xl:masonry before:box-inherit after:box-inherit gap-5 py-10 px-5">
                {comments.map(comment => (
                    <div key={comment.id} className="break-inside py-4 px-3 mb-5 bg-gray-100 rounded text-md font-medium font-rubik text-slate-600 shadow-lg hover:shadow-gray-400 xl:hover:scale-105 duration-500 cursor-pointer tracking-wide">
                        { comment.text }
                        <span className="text-sm block mt-5 text-gray-400">{moment(comment.timestamp).fromNow()}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comment;
