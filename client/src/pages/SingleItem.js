import React from 'react';

import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import ResponseList from '../components/ResponseList';
import ResponseForm from '../components/ResponseForm';

import Auth from '../utils/auth';

import { QUERY_SINGLE_ITEM } from '../utils/queries';
import { REMOVE_ITEM } from '../utils/mutations';

export default function SingleItem () {
    const { itemId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
        variables: { itemId: itemId },
    });

    const item = data?.item || {};

    const [removeItem] = useMutation(REMOVE_ITEM);

    const handleRemoveItem = () => {
        try {
            const { data } = removeItem({
                variables: {
                    itemId: item.itemId
                }
            })
        } catch (err) {
            console.error(err);
        }
    }
  
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='p-5 singleItemStyles'>
            <div className='card'>
                <h3 className='card-header'>
                    "Title"
                </h3>
                <div className='card-body'>
                    <p>{item.itemText}</p>
                    <p>Posted by {item.itemAuthor} on {item.createdAt}.</p>
                    {Auth.getProfile().data.username === item.itemAuthor ? (
                        <>
                        <button onClick={handleRemoveItem} className='btn m-2'>
                            Remove Post
                        </button>
                        </>
                    ) : (
                        <>
                        </>
                    )}  
                    
                </div>
            </div>
            <div className='m-3'>
                <ResponseList responses={item.responses} />
            </div>
            <div className='m-3'>
                <ResponseForm itemId={item._id} />
            </div>
        </div>
    );
};