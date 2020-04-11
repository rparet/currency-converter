import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/core";
import Currency from "../components/Currency";
import CountrySelect from "../components/CountrySelect";



class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.handleFirstCountryChange = this.handleFirstCountryChange.bind(this);
    this.handleSecondCountryChange = this.handleSecondCountryChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.state = { fromCountry: "US", toCountry: "BR", amount: 1 };
  }

  handleFirstCountryChange(country) {
    this.setState({ fromCountry: country });
  }

  handleSecondCountryChange(country) {
    this.setState({ toCountry: country });
  }

  handleCurrencyChange(evt) {
    this.setState({ amount: evt.target.value });
  }

  render() {
    const fromCountry = this.state.fromCountry;
    const toCountry = this.state.toCountry;
    const amount = this.state.amount;

    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <SimpleGrid columns="2" minChildWidth="10px" spacing="10px" width="700px">
          <Box><Stack spacing={6}>
            <FormControl>
              <FormLabel htmlFor="number">Money</FormLabel>
              <Input
                type="number"
                id="number"
                aria-describedby="number-helper-text"
                onChange={(evt) => this.handleCurrencyChange(evt)}
              />
            </FormControl>
            <FormControl>
              <Currency
                amount={amount}
                fromCountry={this.props.data.countries.find((country) => {
                  return country.code === fromCountry;
                })}
                toCountry={this.props.data.countries.find((country) => {
                  return country.code === toCountry;
                })}
              />
            </FormControl>
          </Stack>
          </Box>
          <Box>
            <FormControl>
              <FormLabel htmlFor="country1">First Country</FormLabel>
              <CountrySelect
                data={this.props.data}
                country={fromCountry}
                onCountryChange={this.handleFirstCountryChange}
              ></CountrySelect>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="country2">Second Country</FormLabel>
              <CountrySelect
                data={this.props.data}
                country={toCountry}
                onCountryChange={this.handleSecondCountryChange}
              ></CountrySelect>
            </FormControl>
          </Box>
        </SimpleGrid>
      </div>
    );
  }
}

// GraphQL query that returns required country fields.
const ListAllCountries = gql`
  {
    countries {
      name
      code
      emoji
      currency
    }
  }
`;

export default graphql(ListAllCountries)(Converter);
