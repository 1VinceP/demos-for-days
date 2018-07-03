import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div>
            <Link to='/stripe'><button>Stripe Demo</button></Link>
        </div>
    )
}