import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class StripeDemo extends Component {
    state = {
        cost: 0
    }

    onToken = token => {
        token.card = void 0;
        axios.post( '/api/payment', { token, amount: this.state.cost /* This is the amount actually charged */ } )
            .then( response => {
                alert('Thanks for your purchase!')
            } )
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <input placeholder='Enter Price' onChange={e => this.setState({ cost: e.target.value * 100 })} />
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={'pk_test_k1ZmSbaquoQabEKXdT1RBe3x'} // This is the PUBLISHABLE KEY given to you by Stripe. DO NOT put your secret key here, it goes in your .env
                    amount={this.state.cost} // This is the amount displayed on the module. Please make sure it matches the amount you are charging the user
                />
            </div>
        )
    }
}

export default StripeDemo;