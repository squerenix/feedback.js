import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import moment from 'moment';
import {NextComponentType} from 'next';
import { useEffect, useState } from 'react';
import { db } from '../firebase/initFirebase';
import Swal from 'sweetalert2';


const Comment: NextComponentType = () => {

    interface Icomment {
        id: string,
        text: string,
        timestamp: any
    }

    const [comments, setComment] = useState<Array<Icomment>>([]);

    // read data
    useEffect(() => {
        const q = query(collection(db, "feedback"));
        onSnapshot(q, (QuerySnapshot) => {
            setComment(QuerySnapshot.docs.map(doc => ({
                id:doc.id, 
                text: doc.data().text, 
                timestamp: doc.data().timestamp?.toDate().getTime()
            })));
        })
    }, []);

    const onDeleteAll = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.isConfirmed) {
                const q = query(collection(db, "feedback"));
                onSnapshot(q, (QuerySnapshot) => {
                    QuerySnapshot.docs.forEach((document) => {
                        deleteDoc(doc(db, "feedback", document.id));
                    });
                });
            }
        })
    }

    return (
        <>
            <div className="text-center xl:text-right">
                <button className="mt-10 py-2 px-5 bg-red-400 rounded text-sm xl:text-md font-rubik font-bold text-white tracking-wider shadow-lg" onClick={onDeleteAll}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2 inline mb-1 text-white" width={15} />
                    Delete All
                </button>
            </div>
            <div className="xl:masonry before:box-inherit after:box-inherit gap-5 py-10">
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
