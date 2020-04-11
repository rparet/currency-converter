import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
    Input,
    InputGroup,
    InputRightAddon
  } from "@chakra-ui/core";

if (!process.env.REACT_APP_CURRENCY_API_KEY)
{ 
    console.log("Warning: Currency API key not set!");
}

const GetCurrencyRates = gql`
query get_currency_rates {
  currency @rest(type: "Currency", path: "latest?access_key=${process.env.REACT_APP_CURRENCY_API_KEY}") {
    rates
  }
}
`;

// The API uses EUR as a base rate - meaning all the rates are based on EUR
// TODO improve readability by refactoring into utility functions that convert to/from EUR

function CurrencyConversion(rates, amount, from, to) {
  let toEUR,fromEUR = 1;
  if (rates[from] > 1) {
     toEUR = amount / rates[from];
  }
  else { 
    toEUR = amount * rates[from];
  }
  console.log("From:" + amount  + from + "@" + rates[from] + " = " + toEUR + " EUR");
  if (rates[to] < 1) {
    fromEUR = toEUR * rates[to];
  }
  else if (rates[to] < 1 && toEUR < 1)
  {
      fromEUR = toEUR * rates[to];
  }
  else {
      fromEUR = toEUR / rates[to];
  }
  console.log("To:"+ to + "@" + rates[to] + "=" + fromEUR);

  console.log(from + ":" + to + "= " + fromEUR);
  return fromEUR;
}

class Currency extends React.Component {

    render() {
        if (this.props.data.loading) {
          return <div>Loading</div>;
        }
        
        const fromCurrency = this.props.fromCountry.currency.split(',', 1)[0];
        const toCurrency = this.props.toCountry.currency.split(',', 1)[0];
        const amount = this.props.amount;

        let foo = CurrencyConversion(this.props.data.currency.rates, amount, fromCurrency, toCurrency );
        return (
        <InputGroup>
          <InputRightAddon children={toCurrency} />
          <Input readOnly type="number" id="number2" value={foo}/>
        </InputGroup>
        );    
    }
}

export default graphql(GetCurrencyRates)(Currency);
