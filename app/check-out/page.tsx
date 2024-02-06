"use client";
import axios from "axios";
import { ArrowLeft, Calendar, CreditCard, LockKeyhole } from "lucide-react";
import Link from "next/link";
import braintree from 'braintree-web';
import { useEffect, useState } from "react";
import "@/components/hostedFields.module.css"
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

/// Important 
//// debo verificar las pinches tarjetas

const Test = () => {

  const [loading, setLoading] = useState(false);
  const [res, setState] = useState(false);
  
  const sendNonce = async (nonce_payment:string) => {
    try {
      await axios.post('/api/subscription', { nonce: nonce_payment }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        console.log(response.data); 
        
      });

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function initializeBraintree() {
      try {
        await axios.post('http://localhost:3000/api/braintree').then((response) => {
          braintree.client.create({
            authorization: response.data
          }, async function (createErr, clientInstance) {
            if (createErr) {
              console.error(createErr);
            }

            braintree.hostedFields.create({
              client: clientInstance,
              styles: {
                'input': {
                  'font-size': '16px',
                  'font-family': 'Helvetica, Arial, sans-serif',
                  'color': '#3a3a3a',
                },

                // Customize styles as needed
              },
              fields: {
                number: {
                  container: '#card-number',
                  placeholder: '4111 1111 1111 1111',

                },
                cvv: {
                  container: '#cvv',
                  placeholder: '954'
                },
                expirationDate: {
                  container: '#expiration-date',
                  placeholder: 'MM/YYYY'
                }
                // Add other fields like postalCode if needed
              }
            }, async (hostedFieldsErr, hostedFieldsInstance) => {
              if (hostedFieldsErr) {
                console.error(hostedFieldsErr)
              } 
              
              const form = document.getElementById('payment-form');

              form?.addEventListener('submit', async (event) => {
                event.preventDefault();
                setLoading(true);

                try {
                    await hostedFieldsInstance?.tokenize().then(response => {
                       
                        sendNonce(response.nonce);
                    })
                  
                } catch (err) {
                  console.error(err)
                }
                setLoading(false);
              });
            });
          });
        });

      } catch (err: any) {
        console.error(err);
      }
    }
   
    initializeBraintree().then(()=>{
      setState(true);
      // 
      //   for (let i = 0; i < iframes.length; i++) {
      //     iframes[i].style.height = '2rem';
      //     iframes[i].style.padding = '.5rem'
      //   }
    });

  });

  if(res === false) {
    return(
<div className="flex items-center ">
      loading...</div>)
  }
else{
  return (
   
    <div className="flex flex-col items-center space-y-3 mt-10 md:justify-evenly md:items-start md:mt-12 md:p-2 md:flex-row" >
      <div className="flex flex-col space-y-2 items-center">
        <div className="flex flex-row mb-3 space-x-2 items-center">
          <Link href="/conversation"><ArrowLeft className="text-slate-600 w-5" /></Link> <span className="text-xs">Back to home</span>
        </div>

        <span className="text-base text-slate-600 font-semibold">Subscribe to [name of the software]</span>
        <div className="flex flex-row space-x-1">
          <span className="text-2xl font-bold">
            US$14.99
          </span>
          <span className="text-xs  font-semibold w-6 text-muted-foreground">
            Per month
          </span>
        </div>
        <span className="text-sm text-muted-foreground font-semibold">Unlimited [feature]</span>
      </div>
      <div className="md:shadow-[-3px_0px_4px_0px_rgba(0,0,0.3,0.1)] md:px-8 pt-2 h-screen md:w-1/2 w-full px-5">
        <span className="text-lg font-semibold p-2 mb-2">
          Pay with card
        </span>
        <form id="payment-form" className="pt-1 px-2 text-base text-black font-medium" >

          <label className="flex flex-row">
            <CreditCard className="mr-2" />
            Card Number
          </label>

          <div id="card-number" className="hostedd-field border border-1 border-slate-400 rounded mb-3"></div>
          <label className="flex flex-row">
            <LockKeyhole className="mr-2" />
            CVV
          </label>
          <div id="cvv" className="hostedd-field border border-1 border-slate-400 rounded mb-3"></div>
          <label className="flex flex-row">
            <Calendar className="mr-2" />
            Expiration Date
          </label>
          <div id="expiration-date" className="hostedd-field border border-1 border-slate-400 rounded mb-3"></div>
          <button type="submit" disabled={loading} className="bg-emerald-500 p-1 rounded text-white w-full mt-3">
            {loading ? 'Processing...' : 'Subscribe'}
          </button>
        </form>
        {/* <p> {res}</p> */}
        {/* <PayPalScriptProvider options={{
            clientId: "AWoLnO3FocY5QZws0LdBWXbmGKOD15y1RYvQibAoya-86NX-dUXasHLsHEvkm8ocQwgLpUIbvdewbK02",
            intent: 'subscription',
            vault: 'true'
          }}>
            <PayPalButtons
              createSubscription={ async(data, actions) => {
              return actions.subscription.create({
                plan_id: 'P-7EM788055B557593SMWI4NVQ',
              });
              }
            }
              style={{
                label: "subscribe",
                color: "blue",
                layout: "horizontal",
              }}
            />  
          </PayPalScriptProvider> */}


      </div>

    </div>
  )}
}
export default Test;